export type EventType = "kalite_karari" | "durus" | "geciken_is";

export interface NotifyEvent {
  eventType: EventType;
  tezgah: string;
  title: string;
  body: string;
  meta?: Record<string, unknown>;
}

/**
 * PWA'nın /api/notify uç noktasına TEK YÖNLÜ, dışarı giden bir istek atar.
 * Bu servis hiçbir gelen bağlantı kabul etmez; yalnızca bu fonksiyon üzerinden
 * dışarıya konuşur.
 */
export async function sendNotification(event: NotifyEvent): Promise<void> {
  const url = process.env.PWA_NOTIFY_URL!;
  const apiKey = process.env.PWA_API_KEY!;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      console.error(
        `[notify] Bildirim gönderilemedi (${res.status}): ${event.eventType} / ${event.tezgah}`
      );
    }
  } catch (err) {
    console.error(`[notify] Bildirim isteği başarısız:`, err);
  }
}
