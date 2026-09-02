import { useCategories } from "@/hooks/use-manage-entities"
import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"

export function CategoryForm({ onDone }: { onDone: () => void }) {
   const { add, isAdding } = useCategories()
   const [name, setName] = useState("")

   async function handleSubmit() {
      if (name.trim().length < 3) return
      await add(name.trim())
      setName("")
      onDone()
   }

   return (
      <View className="gap-3">
         <TextInput
            placeholder="Nome da categoria"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-lg px-3 py-2 text-base"
         />
         <Pressable
            onPress={handleSubmit}
            disabled={isAdding || name.trim().length < 3}
            className="bg-black rounded-lg py-3 items-center disabled:opacity-40"
         >
            <Text className="text-white font-semibold">{isAdding ? "Salvando..." : "Salvar"}</Text>
         </Pressable>
      </View>
   )
}
