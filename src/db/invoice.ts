import { generateId } from "@/lib/id"
import { and, eq } from "drizzle-orm"
import { db } from "."
import { invoice } from "./schema"

type NewInvoice = Omit<typeof invoice.$inferInsert, "id">

export async function addInvoice(data: NewInvoice) {
   const [row] = await db
      .insert(invoice)
      .values({ id: generateId(), ...data })
      .returning()
   return row
}

export async function upsertInvoice(data: typeof invoice.$inferInsert) {
   const [row] = await db
      .insert(invoice)
      .values(data)
      .onConflictDoUpdate({
         target: invoice.id,
         set: {
            cardId: data.cardId,
            competence: data.competence,
            totalValue: data.totalValue,
            status: data.status,
         },
      })
      .returning()
   return row
}

export async function getInvoiceByCompetence(cardId: string, competence: string) {
   return db.query.invoice.findFirst({
      where: and(eq(invoice.cardId, cardId), eq(invoice.competence, competence)),
      with: { installments: true },
   })
}
