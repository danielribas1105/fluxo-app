import { generateId } from "@/lib/id"
import { eq } from "drizzle-orm"
import { db } from "."
import { installment } from "./schema"

type NewInstallment = Omit<typeof installment.$inferInsert, "id">

export async function addInstallment(data: NewInstallment) {
   const [row] = await db
      .insert(installment)
      .values({ id: generateId(), ...data })
      .returning()
   return row
}

export async function upsertInstallment(data: typeof installment.$inferInsert) {
   const [row] = await db
      .insert(installment)
      .values(data)
      .onConflictDoUpdate({
         target: installment.id,
         set: {
            buyId: data.buyId,
            invoiceId: data.invoiceId,
            number: data.number,
            value: data.value,
         },
      })
      .returning()
   return row
}

// Vincula parcelas soltas (invoiceId null) a uma fatura quando ela fecha
export async function attachInstallmentsToInvoice(installmentIds: string[], invoiceId: string) {
   for (const id of installmentIds) {
      await db.update(installment).set({ invoiceId }).where(eq(installment.id, id))
   }
}

export async function getInstallmentsByInvoice(invoiceId: string) {
   return db.query.installment.findMany({
      where: (i, { eq }) => eq(i.invoiceId, invoiceId),
      orderBy: (i, { asc }) => asc(i.number),
   })
}
