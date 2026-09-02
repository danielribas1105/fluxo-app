import { z } from "zod"

export const EntryTipoEnum = z.enum(["expense", "income"])
export const OriginTypeEnum = z.enum([
   "recurring_account", // conta recorrente
   "purchase", // compra
   "installment", // parcela
   "revenue_source", // fonte de receita
   "manual", //manual
])
export const StatusEntryEnum = z.enum(["pending", "paid", "overdue", "cancelled"])
export const PaymentMethodEnum = z.enum([
   "credit_card",
   "debit_card",
   "pix",
   "money",
   "transfer",
   "boleto",
   "other",
])

export const EntrySchema = z.object({
   id: z.ulid(),
   type: EntryTipoEnum,
   origin_type: OriginTypeEnum,
   origin_id: z.string().nullable().optional(), // FK polimórfica: aponta pra conta_recorrente_id / compra_id / parcela_id / fonte_receita_id
   category_id: z.number().int().positive(),
   payment_method: PaymentMethodEnum.nullable().optional(), // null quando ainda não definido ou quando é receita
   value: z.number().positive(),
   due_date: z.coerce.date(),
   payment_date: z.coerce.date().nullable().optional(),
   status: StatusEntryEnum,
   competence: z.string().min(3), // ex: "2026-08"
})

export type Entry = z.infer<typeof EntrySchema>
