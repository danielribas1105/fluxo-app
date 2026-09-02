import { relations } from "drizzle-orm"
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

// ---------- CATEGORY ----------
export const category = sqliteTable("category", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   name: text("name").notNull(),
})

// ---------- RECURRING_ACCOUNT ----------
export const recurringAccount = sqliteTable("recurring_account", {
   id: text("id").primaryKey(), // ULID
   categoryId: integer("category_id")
      .notNull()
      .references(() => category.id),
   name: text("name").notNull(),
   frequency: text("frequency").notNull(), // monthly | yearly | eventual | unique | uncommon
   dueDate: integer("due_date"), // dia do mês (1-31)
   estimatedValue: real("estimated_value").notNull(),
   active: integer("active", { mode: "boolean" }).notNull().default(true),
})

// ---------- REVENUE_SOURCE ----------
export const revenueSource = sqliteTable("revenue_source", {
   id: text("id").primaryKey(),
   name: text("name").notNull(),
   type: text("type").notNull(),
})

// ---------- CREDIT_CARD ----------
export const creditCard = sqliteTable("credit_card", {
   id: text("id").primaryKey(),
   bank: text("bank").notNull(),
   closingDay: integer("closing_day"), // dia do mês (1-31)
   dueDate: integer("due_date"), // dia do mês (1-31)
})

// ---------- BUY ----------
export const buy = sqliteTable("buy", {
   id: text("id").primaryKey(),
   cardId: text("card_id")
      .notNull()
      .references(() => creditCard.id),
   categoryId: integer("category_id")
      .notNull()
      .references(() => category.id),
   description: text("description").notNull(),
   totalValue: real("total_value").notNull(),
   numberInstallments: integer("number_installments").notNull().default(1),
   purchaseDate: integer("purchase_date", { mode: "timestamp" }),
})

// ---------- INVOICE ----------
export const invoice = sqliteTable("invoice", {
   id: text("id").primaryKey(),
   cardId: text("card_id")
      .notNull()
      .references(() => creditCard.id),
   competence: text("competence").notNull(), // ex: "2026-08"
   totalValue: real("total_value").notNull(),
   status: text("status").notNull(),
})

// ---------- INSTALLMENT ----------
export const installment = sqliteTable("installment", {
   id: text("id").primaryKey(),
   buyId: text("buy_id")
      .notNull()
      .references(() => buy.id),
   invoiceId: text("invoice_id").references(() => invoice.id),
   number: integer("number").notNull(),
   value: real("value").notNull(),
})

// ---------- ENTRY ----------
// Entidade central: cada ocorrência real de despesa/receita numa competência.
export const entry = sqliteTable("entry", {
   id: text("id").primaryKey(),
   type: text("type").notNull(), // despesa | receita
   originType: text("origin_type").notNull(), // conta_recorrente | compra | parcela | fonte_receita | manual
   originId: text("origin_id"), // FK polimórfica (nullable para lançamentos manuais)
   categoryId: integer("category_id")
      .notNull()
      .references(() => category.id),
   paymentMethod: text("payment_method"), // cartao_credito | cartao_debito | pix | dinheiro | transferencia | boleto | outro
   value: real("value").notNull(),
   dueDate: integer("due_date", { mode: "timestamp" }).notNull(),
   paymentDate: integer("payment_date", { mode: "timestamp" }),
   status: text("status").notNull(), // pendente | pago | atrasado | cancelado
   competence: text("competence").notNull(),
})

// ---------- RELATIONS (habilita db.query.*.findMany({ with: {...} })) ----------
export const recurringAccountRelations = relations(recurringAccount, ({ one }) => ({
   category: one(category, { fields: [recurringAccount.categoryId], references: [category.id] }),
}))

export const buyRelations = relations(buy, ({ one, many }) => ({
   card: one(creditCard, { fields: [buy.cardId], references: [creditCard.id] }),
   category: one(category, { fields: [buy.categoryId], references: [category.id] }),
   installments: many(installment),
}))

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
   card: one(creditCard, { fields: [invoice.cardId], references: [creditCard.id] }),
   installments: many(installment),
}))

export const installmentRelations = relations(installment, ({ one }) => ({
   buy: one(buy, { fields: [installment.buyId], references: [buy.id] }),
   invoice: one(invoice, { fields: [installment.invoiceId], references: [invoice.id] }),
}))

export const entryRelations = relations(entry, ({ one }) => ({
   category: one(category, { fields: [entry.categoryId], references: [category.id] }),
}))
