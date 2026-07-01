/**
 * Accès base de données (MariaDB/MySQL sur o2switch) via mysql2 — pur JS.
 *
 * Optionnel : si DB_NAME/DB_USER ne sont pas configurés, `getPool()` renvoie null
 * et l'app continue de fonctionner sur les données statiques (repli). Cela permet
 * de tourner en local sans base, puis de brancher la base sur o2switch via le .env.
 */
import mysql from 'mysql2/promise';

let pool = null;

export function dbConfigured() {
  return Boolean(process.env.DB_NAME && process.env.DB_USER);
}

export function getPool() {
  if (!dbConfigured()) return null;
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_POOL || 5),
      charset: 'utf8mb4',
      // Réutilise les connexions (Passenger garde l'app vivante).
      enableKeepAlive: true,
    });
  }
  return pool;
}

/** Exécute une requête préparée. Lève si la base n'est pas configurée. */
export async function query(sql, params = []) {
  const p = getPool();
  if (!p) throw new Error('Base de données non configurée (DB_* manquants).');
  const [rows] = await p.execute(sql, params);
  return rows;
}

/** Vrai si la base répond (utilisé par /api/health). */
export async function dbHealthy() {
  if (!dbConfigured()) return false;
  try {
    await query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
