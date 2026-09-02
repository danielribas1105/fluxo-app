import { generateId } from "@/lib/id"
import { db } from "."
import { creditCard } from "./schema"

type NewCreditCard = Omit<typeof creditCard.$inferInsert, "id">

export async function addCreditCard(data: NewCreditCard) {
   const [row] = await db
      .insert(creditCard)
      .values({ id: generateId(), ...data })
      .returning()
   return row
}

export async function upsertCreditCard(data: typeof creditCard.$inferInsert) {
   const [row] = await db
      .insert(creditCard)
      .values(data)
      .onConflictDoUpdate({
         target: creditCard.id,
         set: { bank: data.bank, closingDay: data.closingDay, dueDate: data.dueDate },
      })
      .returning()
   return row
}

export async function getCreditCards() {
   return db.query.creditCard.findMany({ orderBy: (c, { asc }) => asc(c.bank) })
}
