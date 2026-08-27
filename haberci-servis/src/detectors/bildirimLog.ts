import sql from "mssql";
import { State } from "../state";
import { NotifyEvent } from "../notifyClient";

const TABLE = "dbo.BILDIRIM_LOG";

/**
 * BILDIRIM_LOG kayıtlarının çoğunda tezgah adı doğrudan URL'de
 * (örn. "/?makine=ARION-1") geçiyor. Bazı kayıtlarda (UNUTULAN_IS,
 * ESKALASYON gibi iş bazlı olaylarda) URL yerine "/?is=<id>" kullanılıyor;
 * bu durumda tezgah adı MESAJ metninden ("... – DV-15 tezgahı ...")
 * ayıklanmaya çalışılır. İkisi de bulunamazsa null döner ve olay yalnızca
 * "tüm tezgahlar" kuralına sahip kişilere gider.
 */
export function extractTezgah(url: string | null, mesaj: string): string | null {
  if (url) {
    const match = url.match(/[?&]makine=([^&]+)/i);
    if (match) {
      try {
        return decodeURIComponent(match[1]);
      } catch {
        return match[1];
      }
    }
  }

  const match2 = mesaj.match(/–\s*([A-Za-zÇĞİÖŞÜçğıöşü0-9.\-]+)\s+tezgah/i);
  if (match2) return match2[1];

  return null;
}

export async function detectBildirimLog(
  pool: sql.ConnectionPool,
  state: State
): Promise<NotifyEvent[]> {
  const watermarkKey = "bildirim_log_last_id";
  const lastId = Number(state[watermarkKey] ?? 0);

  const result = await pool
    .request()
    .input("lastId", sql.Int, lastId)
    .query(`
      SELECT TOP 200 ID, TIP, BASLIK, MESAJ, URL
      FROM ${TABLE}
      WHERE ID > @lastId
      ORDER BY ID ASC
    `);

  const events: NotifyEvent[] = [];
  let maxId = lastId;

  for (const row of result.recordset as Array<{
    ID: number;
    TIP: string;
    BASLIK: string;
    MESAJ: string;
    URL: string | null;
  }>) {
    maxId = Math.max(maxId, row.ID);
    events.push({
      eventType: row.TIP,
      tezgah: extractTezgah(row.URL, row.MESAJ),
      title: row.BASLIK,
      body: row.MESAJ,
      meta: row.URL ? { url: row.URL } : undefined,
    });
  }

  state[watermarkKey] = maxId;
  return events;
}
