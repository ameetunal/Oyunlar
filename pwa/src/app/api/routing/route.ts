import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentTenantId } from "@/lib/tenant";
import { readJsonBody } from "@/lib/http";

// Bu uç nokta middleware.ts tarafından zaten oturuma karşı korunuyor.

export async function POST(req: NextRequest) {
  const tenantId = await getCurrentTenantId();
  if (!tenantId) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { data, error } = await readJsonBody<{ userId?: string; eventType?: string; tezgah?: string }>(req);
  if (error) return error;
  const { userId, eventType, tezgah } = data;

  if (!userId || !eventType) {
    return NextResponse.json({ error: "Kullanıcı ve olay türü zorunlu" }, { status: 400 });
  }

  // userId'nin bu tenant'a ait olduğunu doğrula — başka bir tenant'ın
  // kullanıcısına kural eklenmesini engeller.
  const user = await prisma.user.findFirst({ where: { id: userId, tenantId } });
  if (!user) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
  }

  const rule = await prisma.routingRule.create({
    data: { userId, eventType, tezgah: tezgah || null },
  });

  return NextResponse.json(rule);
}
