import { generateId } from "@/lib/id"
import { eq } from "drizzle-orm"
import { db } from "."
import { recurringAccount } from "./schema"

type NewAccount = Omit<typeof recurringAccount.$inferInsert, "id">

export async function addRecurringAccount(data: NewAccount) {
   const [row] = await db
      .insert(recurringAccount)
      .values({ id: generateId(), ...data })
      .returning()
   return row
}

export async function upsertRecurringAccount(data: typeof recurringAccount.$inferInsert) {
   const [row] = await db
      .insert(recurringAccount)
      .values(data)
      .onConflictDoUpdate({
         target: recurringAccount.id,
         set: {
            categoryId: data.categoryId,
            name: data.name,
            frequency: data.frequency,
            dueDate: data.dueDate,
            estimatedValue: data.estimatedValue,
            active: data.active,
         },
      })
      .returning()
   return row
}

export async function getRecurringAccounts() {
   return db.query.recurringAccount.findMany({
      with: { category: true },
      orderBy: (a, { asc }) => asc(a.name),
   })
}

export async function deleteRecurringAccount(id: string) {
   await db.delete(recurringAccount).where(eq(recurringAccount.id, id))
}
