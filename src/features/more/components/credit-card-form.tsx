import { useCreditCards } from "@/hooks/use-manage-entities"
import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"

export function CreditCardForm({ onDone }: { onDone: () => void }) {
   const { add, isAdding } = useCreditCards()
   const [bank, setBank] = useState("")
   const [closingDay, setClosingDay] = useState("")
   const [dueDate, setDueDate] = useState("")

   async function handleSubmit() {
      const closing = Number(closingDay)
      const due = Number(dueDate)
      if (bank.trim().length < 3 || !due || due < 1 || due > 31) return

      await add({
         bank: bank.trim(),
         closingDay: closing >= 1 && closing <= 31 ? closing : null,
         dueDate: due,
      })
      setBank("")
      setClosingDay("")
      setDueDate("")
      onDone()
   }

   return (
      <View className="gap-3">
         <TextInput
            placeholder="Banco / nome do cartão"
            value={bank}
            onChangeText={setBank}
            className="border border-gray-300 rounded-lg px-3 py-2 text-base"
         />
         <View className="flex-row gap-3">
            <TextInput
               placeholder="Dia fechamento"
               value={closingDay}
               onChangeText={setClosingDay}
               keyboardType="number-pad"
               className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base"
            />
            <TextInput
               placeholder="Dia vencimento"
               value={dueDate}
               onChangeText={setDueDate}
               keyboardType="number-pad"
               className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base"
            />
         </View>
         <Pressable
            onPress={handleSubmit}
            disabled={isAdding}
            className="bg-black rounded-lg py-3 items-center disabled:opacity-40"
         >
            <Text className="text-white font-semibold">{isAdding ? "Salvando..." : "Salvar"}</Text>
         </Pressable>
      </View>
   )
}
