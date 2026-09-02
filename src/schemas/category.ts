import { z } from "zod"

export const CategorySchema = z.object({
   id: z.number().int().positive(),
   name: z.string().min(3),
})

export type Category = z.infer<typeof CategorySchema>
