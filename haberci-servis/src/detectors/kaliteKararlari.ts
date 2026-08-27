import sql from "mssql";
import { KaliteKararlariMapping } from "../config";
import { State } from "../state";
import { NotifyEvent } from "../notifyClient";

/**
 * "KaliteKararlari" tablosunda son taramadan bu yana eklenen kararları
 * (ONAY / ŞARTLI / RED) tespit eder.
 */
export async function detectKaliteKararlari(
  pool: sql.ConnectionPool,
  mapping: KaliteKararlariMapping,
  state: State
): Promise<NotifyEvent[]> {
  const watermarkKey = "kalite_last_id";
  const lastId = Number(state[watermarkKey] ?? 0);

  const result = await pool
    .request()
    .input("lastId", sql.Int, lastId)
    .query(`
      SELECT TOP 200
        ${mapping.idColumn}     AS id,
        ${mapping.tezgahColumn} AS tezgah,
        ${mapping.durumColumn}  AS durum,
        ${mapping.isKoduColumn} AS isKodu,
        ${mapping.isAdiColumn}  AS isAdi
      FROM ${mapping.table}
      WHERE ${mapping.idColumn} > @lastId
      ORDER BY ${mapping.idColumn} ASC
    `);

  const events: NotifyEvent[] = [];
  let maxId = lastId;

  for (const row of result.recordset as Array<{
    id: number;
    tezgah: string;
    durum: string;
    isKodu: string;
    isAdi: string;
  }>) {
    maxId = Math.max(maxId, row.id);
    events.push({
      eventType: "kalite_karari",
      tezgah: row.tezgah,
      title: `Kalite Kararı: ${row.durum}`,
      body: `${row.isKodu} — ${row.isAdi}`,
      meta: { isKodu: row.isKodu, durum: row.durum },
    });
  }

  state[watermarkKey] = maxId;
  return events;
}
