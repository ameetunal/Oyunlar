import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { readJsonBody } from "@/lib/http";

/**
 * Bir çalışan kendi kişisel /join/[userId] bağlantısını açıp bildirimlere
 * izin verdiğinde, tarayıcının ürettiği push aboneliğini o kullanıcıya bağlar.
 */
export async function POST(req: NextRequest) {
  const { data, error } = await readJsonBody<{
    userId?: string;
    subscription?: { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
  }>(req);
  if (error) return error;
  const { userId, subscription } = data;

  const endpoint = subscription?.endpoint;
  const p256dh = subscription?.keys?.p256dh;
  const auth = subscription?.keys?.auth;

  if (!userId || !endpoint || !p256dh || !auth) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
  }

  await prisma.pushSubscription.upsert({
    where: { endpoint },
    update: { userId, p256dh, auth },
    create: { userId, endpoint, p256dh, auth },
  });

  return NextResponse.json({ ok: true });
}
