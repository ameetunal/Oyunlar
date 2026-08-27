import "dotenv/config";
import { getPool } from "./db";
import { loadState, saveState } from "./state";
import { detectBildirimLog } from "./detectors/bildirimLog";
import { sendNotification } from "./notifyClient";

const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS ?? 20000);

async function tick(): Promise<void> {
  const pool = await getPool();
  const state = loadState();

  const events = await detectBildirimLog(pool, state);

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
