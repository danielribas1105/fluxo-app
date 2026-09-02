import { z } from "zod"

export const BuySchema = z.object({
   id: z.ulid(),
   credit_card_id: z.ulid(),
   number_installments: z.number().int().min(1).positive().optional(),
   category_id: z.number().int().positive(),
   description: z.string().min(5),
   total_value: z.number().positive("O valor total deve ser um número positivo"),
   purchase_date: z.coerce.date().nullable().optional(),
})

export type Buy = z.infer<typeof BuySchema>
