import { getDb } from "./database"

export type Transacao = {
   id: number
   conta_id: number
   categoria_id: number
   tipo: "entrada" | "saida"
   valor: number
   data: string // 'YYYY-MM-DD'
   descricao?: string
}

export async function addTransaction(t: Omit<Transacao, "id">) {
   const db = getDb()
   await db.runAsync(
      `INSERT INTO transacoes (conta_id, categoria_id, tipo, valor, data, descricao)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [t.conta_id, t.categoria_id, t.tipo, t.valor, t.data, t.descricao ?? null],
   )
}

export async function getSummaryMonth(yearMonth: string) {
   // anoMes no formato '2026-07'
   const db = getDb()
   const rows = await db.getAllAsync<{ tipo: string; total: number }>(
      `SELECT tipo, SUM(valor) as total
       FROM transacoes
       WHERE strftime('%Y-%m', data) = ?
       GROUP BY tipo`,
      [yearMonth],
   )

   const entradas = rows.find((r) => r.tipo === "entrada")?.total ?? 0
   const saidas = rows.find((r) => r.tipo === "saida")?.total ?? 0

   return { entradas, saidas, saldo: entradas - saidas }
}

export async function getTransacoesPorMes(anoMes: string) {
   const db = getDb()
   return db.getAllAsync<Transacao>(
      `SELECT * FROM transacoes WHERE strftime('%Y-%m', data) = ? ORDER BY data DESC`,
      [anoMes],
   )
}
