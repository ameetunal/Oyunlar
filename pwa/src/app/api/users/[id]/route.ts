import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentTenantId } from "@/lib/tenant";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const tenantId = await getCurrentTenantId();
  if (!tenantId) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { count } = await prisma.user.deleteMany({ where: { id: params.id, tenantId } });
  if (count === 0) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
