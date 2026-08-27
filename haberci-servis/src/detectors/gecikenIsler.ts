import sql from "mssql";
import { IslerMapping } from "../config";
import { State } from "../state";
import { NotifyEvent } from "../notifyClient";

/**
 * Tahmini bitiş tarihi geçtiği halde hâlâ tamamlanmamış işleri tespit eder.
 * Her iş için yalnızca bir kez bildirim gönderilir (state içinde
 * "gecikti_<isId>" anahtarıyla işaretlenir).
 */
export async function detectGecikenIsler(
  pool: sql.ConnectionPool,
  mapping: IslerMapping,
  state: State
): Promise<NotifyEvent[]> {
  const result = await pool.request().query(`
    SELECT
      ${mapping.idColumn}     AS id,
      ${mapping.tezgahColumn} AS tezgah,
      ${mapping.isKoduColumn} AS isKodu,
      ${mapping.isAdiColumn}  AS isAdi
    FROM ${mapping.table}
    WHERE ${mapping.tahminiBitisColumn} < GETDATE()
      AND ${mapping.durumColumn} NOT IN ('TAMAMLANDI', 'İPTAL')
  `);

  const events: NotifyEvent[] = [];

  for (const row of result.recordset as Array<{
    id: number;
    tezgah: string;
    isKodu: string;
    isAdi: string;
  }>) {
    const flagKey = `gecikti_${row.id}`;
    if (state[flagKey]) continue;

    state[flagKey] = 1;
    events.push({
      eventType: "geciken_is",
      tezgah: row.tezgah,
      title: `Geciken İş: ${row.tezgah}`,
      body: `${row.isKodu} — ${row.isAdi} tahmini bitiş tarihini geçti`,
      meta: { isKodu: row.isKodu, isAdi: row.isAdi },
    });
  }

  return events;
}
