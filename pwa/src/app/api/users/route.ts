import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentTenantId } from "@/lib/tenant";

// Bu uç nokta middleware.ts tarafından zaten oturuma karşı korunuyor.

export async function GET() {
  const tenantId = await getCurrentTenantId();
  if (!tenantId) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const users = await prisma.user.findMany({
    where: { tenantId },
    include: { subscriptions: true, routingRules: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const tenantId = await getCurrentTenantId();
  if (!tenantId) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { name, role } = await req.json();

  if (!name || !role) {
    return NextResponse.json({ error: "Ad ve rol zorunlu" }, { status: 400 });
  }

  const user = await prisma.user.create({ data: { name, role, tenantId } });
  return NextResponse.json(user);
}
