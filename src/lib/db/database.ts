import * as SQLite from "expo-sqlite"

let db: SQLite.SQLiteDatabase

export async function initDatabase() {
   db = await SQLite.openDatabaseAsync("finance.db")

   await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS contas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conta_id INTEGER NOT NULL,
      categoria_id INTEGER NOT NULL,
      tipo TEXT NOT NULL,
      valor REAL NOT NULL,
      data TEXT NOT NULL,
      descricao TEXT,
      FOREIGN KEY (conta_id) REFERENCES contas(id),
      FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    );
  `)
}

export function getDb() {
   if (!db) throw new Error("Database não inicializado. Chame initDatabase() primeiro.")
   return db
}
