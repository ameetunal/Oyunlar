import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Bu uç nokta middleware.ts tarafından zaten admin oturumuna karşı korunuyor.

export async function POST(req: NextRequest) {
  const { userId, eventType, tezgah } = await req.json();

  if (!userId || !eventType) {
    return NextResponse.json({ error: "Kullanıcı ve olay türü zorunlu" }, { status: 400 });
  }

  const rule = await prisma.routingRule.create({
    data: { userId, eventType, tezgah: tezgah || null },
  });

  return NextResponse.json(rule);
}
