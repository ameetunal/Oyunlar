import sql from "mssql";
import { DuruslarMapping } from "../config";
import { State } from "../state";
import { NotifyEvent } from "../notifyClient";

/**
 * "Duruslar" tablosunda son taramadan bu yana eklenen ve eşik süreyi
 * (uzunDurusEsikDakika) aşan duruşları tespit eder. Kısa duruşlar için
 * bildirim gürültüsü oluşturmamak amacıyla eşik altındakiler atlanır.
 */
export async function detectDuruslar(
  pool: sql.ConnectionPool,
  mapping: DuruslarMapping,
  state: State
): Promise<NotifyEvent[]> {
  const watermarkKey = "durus_last_id";
  const lastId = Number(state[watermarkKey] ?? 0);
  const esik = mapping.uzunDurusEsikDakika ?? 30;

  const result = await pool
    .request()
    .input("lastId", sql.Int, lastId)
    .input("esik", sql.Int, esik)
    .query(`
      SELECT TOP 200
        ${mapping.idColumn}          AS id,
        ${mapping.tezgahColumn}      AS tezgah,
        ${mapping.nedenColumn}       AS neden,
        ${mapping.sureDakikaColumn}  AS sureDakika
      FROM ${mapping.table}
      WHERE ${mapping.idColumn} > @lastId
        AND ${mapping.sureDakikaColumn} >= @esik
      ORDER BY ${mapping.idColumn} ASC
    `);

  const events: NotifyEvent[] = [];

  // Watermark'ı eşik altı satırları da dahil olacak şekilde ilerletmek için
  // ayrı, filtresiz bir MAX(id) sorgusu atılır — yoksa kısa duruşlar hep
  // "yeni" görünüp her turda tekrar taranır.
  const maxIdResult = await pool
    .request()
    .input("lastId", sql.Int, lastId)
    .query(`
      SELECT MAX(${mapping.idColumn}) AS maxId
      FROM ${mapping.table}
      WHERE ${mapping.idColumn} > @lastId
    `);
  const maxId = maxIdResult.recordset[0]?.maxId as number | null;

  for (const row of result.recordset as Array<{
    id: number;
    tezgah: string;
    neden: string;
    sureDakika: number;
  }>) {
    events.push({
      eventType: "durus",
      tezgah: row.tezgah,
      title: `Uzun Duruş: ${row.tezgah}`,
      body: `${row.neden} — ${row.sureDakika} dakika`,
      meta: { neden: row.neden, sureDakika: row.sureDakika },
    });
  }

  if (maxId != null) {
    state[watermarkKey] = maxId;
  }

  return events;
}
