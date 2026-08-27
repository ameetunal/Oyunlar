import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateApiKey, hashPassword } from "@/lib/auth";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/lib/session";
import { trialEndsAt } from "@/lib/tenant";

export async function POST(req: NextRequest) {
  const { companyName, email, password } = await req.json();

  if (!companyName || !email || !password) {
    return NextResponse.json({ error: "Firma adı, e-posta ve şifre zorunlu" }, { status: 400 });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return NextResponse.json({ error: "Geçersiz e-posta adresi" }, { status: 400 });
  }

  if (String(password).length < 8) {
    return NextResponse.json({ error: "Şifre en az 8 karakter olmalı" }, { status: 400 });
  }

  const existing = await prisma.tenant.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return NextResponse.json({ error: "Bu e-posta ile zaten bir hesap var" }, { status: 409 });
  }

  const tenant = await prisma.tenant.create({
    data: {
      companyName: String(companyName).trim(),
      email: normalizedEmail,
      passwordHash: await hashPassword(password),
      apiKey: generateApiKey(),
      subscriptionStatus: "trialing",
      trialEndsAt: trialEndsAt(),
    },
  });

  const token = await createSessionToken(tenant.id);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return res;
}
