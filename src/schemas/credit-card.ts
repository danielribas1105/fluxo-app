import { z } from "zod"

export const CreditCardSchema = z.object({
   id: z.ulid(),
   bank: z.string().min(3),
   closing_day: z.number().int().min(1).max(31),
   due_date: z.number().int().min(1).max(31),
})

export type CreditCard = z.infer<typeof CreditCardSchema>
