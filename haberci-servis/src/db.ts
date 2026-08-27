import sql from "mssql";

let pool: sql.ConnectionPool | null = null;

/**
 * Üretim SQL Server'ına salt-okunur kullanıcı ile bağlanır.
 * Bağlantı yalnızca SELECT sorguları için kullanılır (bkz. sql/create-readonly-user.sql).
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool) return pool;

  pool = await sql.connect({
    server: process.env.MSSQL_HOST!,
    port: Number(process.env.MSSQL_PORT ?? 1433),
    database: process.env.MSSQL_DATABASE!,
    user: process.env.MSSQL_USER!,
    password: process.env.MSSQL_PASSWORD!,
    options: {
      encrypt: process.env.MSSQL_ENCRYPT === "true",
      trustServerCertificate: process.env.MSSQL_TRUST_CERT === "true",
    },
    pool: { max: 5, min: 0, idleTimeoutMillis: 30000 },
  });

  return pool;
}
