import { generateId } from "@/lib/id"
import { and, eq, sql } from "drizzle-orm"
import { db } from "."
import { entry } from "./schema"

type NewEntry = Omit<typeof entry.$inferInsert, "id">

export async function addEntry(data: NewEntry) {
   const [row] = await db
      .insert(entry)
      .values({ id: generateId(), ...data })
      .returning()
   return row
}

export async function upsertEntry(data: typeof entry.$inferInsert) {
   const [row] = await db
      .insert(entry)
      .values(data)
      .onConflictDoUpdate({
         target: entry.id,
         set: {
            type: data.type,
            originType: data.originType,
            originId: data.originId,
            categoryId: data.categoryId,
            paymentMethod: data.paymentMethod,
            value: data.value,
            dueDate: data.dueDate,
            paymentDate: data.paymentDate,
            status: data.status,
            competence: data.competence,
         },
      })
      .returning()
   return row
}

// Acha o lançamento gerado por uma origem específica (evita duplicar ao regenerar)
export async function getEntryByOrigin(originType: string, originId: string) {
   return db.query.entry.findFirst({
      where: and(eq(entry.originType, originType), eq(entry.originId, originId)),
   })
}

export async function getSummaryByCompetence(competence: string) {
   const rows = await db
      .select({ type: entry.type, total: sql<number>`sum(${entry.value})` })
      .from(entry)
      .where(eq(entry.competence, competence))
      .groupBy(entry.type)

   const income = rows.find((r) => r.type === "receita")?.total ?? 0
   const expense = rows.find((r) => r.type === "despesa")?.total ?? 0
   return { income, expense, balance: income - expense }
}

export async function getEntriesByCompetence(competence: string) {
   return db.query.entry.findMany({
      where: (e, { eq }) => eq(e.competence, competence),
      with: { category: true },
      orderBy: (e, { desc }) => desc(e.dueDate),
   })
}
