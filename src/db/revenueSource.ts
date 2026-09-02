import { generateId } from "@/lib/id"
import { db } from "."
import { revenueSource } from "./schema"

type NewRevenueSource = Omit<typeof revenueSource.$inferInsert, "id">

export async function addRevenueSource(data: NewRevenueSource) {
   const [row] = await db
      .insert(revenueSource)
      .values({ id: generateId(), ...data })
      .returning()
   return row
}

export async function upsertRevenueSource(data: typeof revenueSource.$inferInsert) {
   const [row] = await db
      .insert(revenueSource)
      .values(data)
      .onConflictDoUpdate({
         target: revenueSource.id,
         set: { name: data.name, type: data.type },
      })
      .returning()
   return row
}

export async function getRevenueSources() {
   return db.query.revenueSource.findMany({ orderBy: (r, { asc }) => asc(r.name) })
}
