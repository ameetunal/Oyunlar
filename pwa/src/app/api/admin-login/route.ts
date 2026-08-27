import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!password) {
    return NextResponse.json({ error: "Şifre zorunlu" }, { status: 400 });
  }

  // Geriye dönük uyumluluk: tek-kiracılı dönemden kalan ADMIN_PASSWORD ile
  // giriş (ERMAK kurulumu için). Yeni tenant'lar e-posta + şifre kullanır.
  if (!email && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
    const legacyTenant = await prisma.tenant.findUnique({ where: { id: "legacy-tenant" } });
    if (legacyTenant) {
      const token = await createSessionToken(legacyTenant.id);
      const res = NextResponse.json({ ok: true });
      res.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
      return res;
    }
  }

  if (!email) {
    return NextResponse.json({ error: "E-posta zorunlu" }, { status: 400 });
  }

  const tenant = await prisma.tenant.findUnique({
    where: { email: String(email).trim().toLowerCase() },
  });

  if (!tenant || !(await verifyPassword(password, tenant.passwordHash))) {
    return NextResponse.json({ error: "E-posta veya şifre hatalı" }, { status: 401 });
  }

  const token = await createSessionToken(tenant.id);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE_NAME);
  return res;
}
