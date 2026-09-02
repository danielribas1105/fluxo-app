import { z } from "zod"

export const InvoiceSchema = z.object({
   id: z.ulid(),
   credit_card_id: z.ulid(),
   competence: z.string().min(3),
   total_value: z.number().positive("O valor total deve ser um número positivo"),
   status: z.string(),
})

export type Invoice = z.infer<typeof InvoiceSchema>
