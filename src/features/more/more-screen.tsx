import { EntitySection } from "@/components/entity-section"
import { layout } from "@/css/layout"
import { typography } from "@/css/typography"
import {
   useCategories,
   useCreditCards,
   useRecurringAccounts,
   useRevenueSources,
} from "@/hooks/use-manage-entities"
import { ScrollView, Text, View } from "react-native"
import { CategoryForm } from "./components/category-form"
import { CreditCardForm } from "./components/credit-card-form"
import { RecurringAccountForm } from "./components/recurring-account-form"
import { RevenueSourceForm } from "./components/revenue-source-form"

export default function MoreScreen() {
   const categories = useCategories()
   const creditCards = useCreditCards()
   const recurringAccounts = useRecurringAccounts()
   const revenueSources = useRevenueSources()

   return (
      <ScrollView style={layout.container} contentContainerStyle={layout.box}>
         <View style={{ flexDirection: "column", gap: 10 }}>
            <Text style={typography.title}>Cadastros</Text>

            <EntitySection
               title="Categorias"
               items={categories.data}
               isLoading={categories.isLoading}
               renderItem={(c) => c.name}
               renderForm={(close) => <CategoryForm onDone={close} />}
            />

            <EntitySection
               title="Cartões de crédito"
               items={creditCards.data}
               isLoading={creditCards.isLoading}
               renderItem={(c) => `${c.bank} — vence dia ${c.dueDate}`}
               renderForm={(close) => <CreditCardForm onDone={close} />}
            />

            <EntitySection
               title="Contas recorrentes"
               items={recurringAccounts.data}
               isLoading={recurringAccounts.isLoading}
               renderItem={(a) => `${a.name} — R$ ${a.estimatedValue.toFixed(2)}`}
               renderForm={(close) => <RecurringAccountForm onDone={close} />}
            />

            <EntitySection
               title="Fontes de receita"
               items={revenueSources.data}
               isLoading={revenueSources.isLoading}
               renderItem={(r) => `${r.name} (${r.type})`}
               renderForm={(close) => <RevenueSourceForm onDone={close} />}
            />
         </View>
      </ScrollView>
   )
}
