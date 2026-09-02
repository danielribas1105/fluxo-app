import { generateId } from "@/lib/id"
import { db } from "."
import { buy } from "./schema"

type NewBuy = Omit<typeof buy.$inferInsert, "id">

export async function addBuy(data: NewBuy) {
   const [row] = await db
      .insert(buy)
      .values({ id: generateId(), ...data })
      .returning()
   return row
}

export async function upsertBuy(data: typeof buy.$inferInsert) {
   const [row] = await db
      .insert(buy)
      .values(data)
      .onConflictDoUpdate({
         target: buy.id,
         set: {
            cardId: data.cardId,
            categoryId: data.categoryId,
            description: data.description,
            totalValue: data.totalValue,
            numberInstallments: data.numberInstallments,
            purchaseDate: data.purchaseDate,
         },
      })
      .returning()
   return row
}

export async function getBuysByCard(cardId: string) {
   return db.query.buy.findMany({
      where: (b, { eq }) => eq(b.cardId, cardId),
      with: { installments: true, category: true },
      orderBy: (b, { desc }) => desc(b.purchaseDate),
   })
}
