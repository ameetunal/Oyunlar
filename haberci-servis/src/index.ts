import "dotenv/config";
import { getPool } from "./db";
import { loadMapping } from "./config";
import { loadState, saveState } from "./state";
import { detectKaliteKararlari } from "./detectors/kaliteKararlari";
import { detectDuruslar } from "./detectors/duruslar";
import { detectGecikenIsler } from "./detectors/gecikenIsler";
import { sendNotification } from "./notifyClient";

const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS ?? 20000);

async function tick(): Promise<void> {
  const pool = await getPool();
  const mapping = loadMapping();
  const state = loadState();

  const events = [
    ...(await detectKaliteKararlari(pool, mapping.kaliteKararlari, state)),
    ...(await detectDuruslar(pool, mapping.duruslar, state)),
    ...(await detectGecikenIsler(pool, mapping.isler, state)),
  ];

  for (const event of events) {
    await sendNotification(event);
  }

  saveState(state);

  if (events.length > 0) {
    console.log(`[tick] ${events.length} bildirim gönderildi.`);
  }
}

async function main(): Promise<void> {
  console.log(`Haberci servis başladı. Poll aralığı: ${POLL_INTERVAL_MS}ms`);

  for (;;) {
    try {
      await tick();
    } catch (err) {
      console.error("[tick] Hata:", err);
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

main();
