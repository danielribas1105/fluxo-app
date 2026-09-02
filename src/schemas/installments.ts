import { z } from "zod"

export const InstallmentsSchema = z.object({
   id: z.ulid(),
   buy_id: z.ulid(),
   invoice_id: z.ulid(),
   number: z.number().int(),
   value: z.number(),
})

export type Installments = z.infer<typeof InstallmentsSchema>
