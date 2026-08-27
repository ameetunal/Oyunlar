import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Bu uç nokta middleware.ts tarafından zaten admin oturumuna karşı korunuyor.

export async function GET() {
  const users = await prisma.user.findMany({
    include: { subscriptions: true, routingRules: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { name, role } = await req.json();

  if (!name || !role) {
    return NextResponse.json({ error: "Ad ve rol zorunlu" }, { status: 400 });
  }

  const user = await prisma.user.create({ data: { name, role } });
  return NextResponse.json(user);
}
