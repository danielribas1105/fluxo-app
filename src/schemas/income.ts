import { z } from "zod"

export const IncomeTypeEnum = z.enum(["monthly", "yearly", "eventual", "unique", "uncommon"])

export const IncomeSchema = z.object({
   id: z.ulid(),
   name: z.string().min(3),
   type: IncomeTypeEnum,
})

export type Income = z.infer<typeof IncomeSchema>
