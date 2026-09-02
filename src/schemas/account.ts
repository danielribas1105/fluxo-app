import { z } from "zod"

export const FrequencyTypeEnum = z.enum(["monthly", "yearly", "eventual", "unique", "uncommon"])

export const AccountSchema = z.object({
   id: z.ulid(),
   category_id: z.number().int().positive(),
   name: z.string(),
   frequency: FrequencyTypeEnum,
   due_date: z.number().int().min(1).max(31).nullable().optional(),
   estimated_value: z.number().positive(),
   active: z.boolean(),
})

export type Account = z.infer<typeof AccountSchema>
