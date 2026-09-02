import { eq } from "drizzle-orm"
import { db } from "."
import { category } from "./schema"

export async function addCategory(name: string) {
   const [row] = await db.insert(category).values({ name }).returning()
   return row
}

export async function updateCategory(id: number, name: string) {
   const [row] = await db.update(category).set({ name }).where(eq(category.id, id)).returning()
   return row
}

export async function getCategories() {
   return db.query.category.findMany({ orderBy: (c, { asc }) => asc(c.name) })
}
