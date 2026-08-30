/**
 * İmzalı (HMAC-SHA256) oturum çerezi. NextAuth gibi bir bağımlılık
 * eklemeden, hem middleware'in Edge ortamında hem de route handler'ların
 * Node ortamında çalışan, sadece Web Crypto API'sine dayanan basit bir
 * oturum mekanizması.
 */

export const SESSION_COOKIE_NAME = "tenant_session";

const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 gün

const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET ortam değişkeni tanımlı değil");
  }
  return secret;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createSessionToken(tenantId: string): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `${tenantId}.${expires}`;
  const key = await getKey(getSecret());
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toHex(signature)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<string | null> {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [tenantId, expiresStr, signatureHex] = parts;

  const expires = Number(expiresStr);
  if (!tenantId || !Number.isFinite(expires) || Date.now() > expires) return null;

  let key: CryptoKey;
  try {
    key = await getKey(getSecret());
  } catch {
    return null;
  }

  const payload = `${tenantId}.${expiresStr}`;
  const expectedSignature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const expectedHex = toHex(expectedSignature);

  if (!timingSafeEqual(expectedHex, signatureHex)) return null;

  return tenantId;
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_MS / 1000,
};
