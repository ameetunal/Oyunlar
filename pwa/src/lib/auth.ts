import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import type { Tenant } from "@prisma/client";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}

export function generateApiKey(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * haberci-servis'ten gelen x-api-key başlığına göre ilgili tenant'ı bulur.
 * Tek-kiracılı dönemden kalan kurulumlar (ERMAK), o dönemde ayarlanmış
 * paylaşımlı HABERCI_API_KEY ortam değişkeniyle "legacy-tenant" tenant'ına
 * eşlenerek çalışmaya devam eder.
 */
export async function resolveTenantByApiKey(apiKey: string | null): Promise<Tenant | null> {
  if (!apiKey) return null;

  const tenant = await prisma.tenant.findUnique({ where: { apiKey } });
  if (tenant) return tenant;

  if (process.env.HABERCI_API_KEY && apiKey === process.env.HABERCI_API_KEY) {
    return prisma.tenant.findUnique({ where: { id: "legacy-tenant" } });
  }

  return null;
}
