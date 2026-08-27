import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * /join/[userId] sayfasının kullandığı, kimlik doğrulama GEREKTİRMEYEN
 * uç nokta. Sadece görünen adı döner — hiçbir hassas veri içermez.
 */
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: { id: true, name: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }

  return NextResponse.json(user);
}
