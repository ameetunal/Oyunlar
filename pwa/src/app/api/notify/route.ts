import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { webpush } from "@/lib/push";
import { isValidHaberciApiKey } from "@/lib/auth";

/**
 * haberci-servis buraya, üretim ağından TEK YÖNLÜ, giden bir istekle
 * "şu olay oldu" der. Bu uç nokta olayı, RoutingRule tablosuna göre
 * doğru kişilere (ve sadece doğru kişilere) push bildirim olarak dağıtır.
 */
export async function POST(req: NextRequest) {
  if (!isValidHaberciApiKey(req.headers.get("x-api-key"))) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const event = await req.json();
  const { eventType, tezgah, title, body, meta } = event as {
    eventType: string;
    tezgah: string;
    title: string;
    body: string;
    meta?: Record<string, unknown>;
  };

  if (!eventType || !title || !body) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
  }

  const rules = await prisma.routingRule.findMany({
    where: {
      eventType: { in: [eventType, "hepsi"] },
      OR: [{ tezgah: null }, { tezgah }],
    },
    include: { user: { include: { subscriptions: true } } },
  });

  const seenEndpoints = new Set<string>();
  const sendPromises: Promise<unknown>[] = [];

  for (const rule of rules) {
    for (const sub of rule.user.subscriptions) {
      if (seenEndpoints.has(sub.endpoint)) continue;
      seenEndpoints.add(sub.endpoint);

      sendPromises.push(
        webpush
          .sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
            JSON.stringify({ title, body, meta })
          )
          .catch(async (err: { statusCode?: number }) => {
            // 404/410 = abonelik artık geçersiz (uygulama kaldırılmış vb.), temizle
            if (err.statusCode === 404 || err.statusCode === 410) {
              await prisma.pushSubscription.delete({ where: { id: sub.id } }).catch(() => {});
            } else {
              console.error("Push gönderim hatası:", err);
            }
          })
      );
    }
  }

  await Promise.all(sendPromises);

  return NextResponse.json({ ok: true, gonderilenCihazSayisi: seenEndpoints.size });
}
