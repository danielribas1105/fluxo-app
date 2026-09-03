import { Colors } from "@/constants/theme"
import { components } from "@/css/components"
import { useCategories, useRecurringAccounts } from "@/hooks/use-manage-entities"
import { useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"

const FREQUENCIES = ["monthly", "yearly", "eventual", "unique", "uncommon"] as const

export function RecurringAccountForm({ onDone }: { onDone: () => void }) {
   const { add, isAdding } = useRecurringAccounts()
   const { data: categories } = useCategories()
   const [name, setName] = useState("")
   const [estimatedValue, setEstimatedValue] = useState("")
   const [dueDate, setDueDate] = useState("")
   const [frequency, setFrequency] = useState<(typeof FREQUENCIES)[number]>("monthly")
   const [categoryId, setCategoryId] = useState<number | null>(null)

   async function handleSubmit() {
      const value = Number(estimatedValue.replace(",", "."))
      if (!categoryId || name.trim().length < 1 || !value) return

      await add({
         categoryId,
         name: name.trim(),
         frequency,
         dueDate: dueDate ? Number(dueDate) : null,
         estimatedValue: value,
         active: true,
      })
      setName("")
      setEstimatedValue("")
      setDueDate("")
      onDone()
   }

   return (
      <ScrollView className="gap-3" contentContainerStyle={{ gap: 12 }}>
         <TextInput
            placeholder="Nome (ex: Netflix)"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-lg px-3 py-2 text-base"
         />

         <View className="flex-row flex-wrap gap-2">
            {categories?.map((c) => (
               <Pressable
                  key={c.id}
                  onPress={() => setCategoryId(c.id)}
                  style={[components.chip, categoryId === c.id && components.chipSelected]}
               >
                  <Text
                     style={categoryId === c.id ? components.chipTextSelected : components.chipText}
                  >
                     {c.name}
                  </Text>
               </Pressable>
            ))}
         </View>

         <View className="flex-row flex-wrap gap-2">
            {FREQUENCIES.map((f) => (
               <Pressable
                  key={f}
                  onPress={() => setFrequency(f)}
                  style={[components.chip, frequency === f && components.chipSelected]}
               >
                  <Text style={frequency === f ? components.chipTextSelected : components.chipText}>
                     {f}
                  </Text>
               </Pressable>
            ))}
         </View>

         <View className="flex-row gap-3">
            <TextInput
               placeholder="Valor estimado"
               placeholderTextColor={Colors.theme.textMuted}
               value={estimatedValue}
               onChangeText={setEstimatedValue}
               keyboardType="decimal-pad"
               style={[components.input, { flex: 1 }]}
            />
            <TextInput
               placeholder="Dia vencimento"
               value={dueDate}
               onChangeText={setDueDate}
               keyboardType="number-pad"
               style={[components.input, { flex: 1 }]}
            />
         </View>

         <Pressable
            onPress={handleSubmit}
            disabled={isAdding}
            style={[components.buttonPrimary, isAdding && components.buttonPrimaryDisabled]}
         >
            <Text style={components.buttonPrimaryText}>{isAdding ? "Salvando..." : "Salvar"}</Text>
         </Pressable>
      </ScrollView>
   )
}
