import { useRevenueSources } from "@/hooks/use-manage-entities"
import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"

const TYPES = ["monthly", "yearly", "eventual", "unique", "uncommon"] as const

export function RevenueSourceForm({ onDone }: { onDone: () => void }) {
   const { add, isAdding } = useRevenueSources()
   const [name, setName] = useState("")
   const [type, setType] = useState<(typeof TYPES)[number]>("monthly")

   async function handleSubmit() {
      if (name.trim().length < 3) return
      await add({ name: name.trim(), type })
      setName("")
      onDone()
   }

   return (
      <View className="gap-3">
         <TextInput
            placeholder="Nome (ex: Salário)"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-lg px-3 py-2 text-base"
         />
         <View className="flex-row flex-wrap gap-2">
            {TYPES.map((t) => (
               <Pressable
                  key={t}
                  onPress={() => setType(t)}
                  className={`px-3 py-1.5 rounded-full border ${type === t ? "bg-black border-black" : "border-gray-300"}`}
               >
                  <Text className={type === t ? "text-white" : "text-black"}>{t}</Text>
               </Pressable>
            ))}
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
