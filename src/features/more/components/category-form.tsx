import { Colors } from "@/constants/theme"
import { components } from "@/css/components"
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

   const disabled = isAdding || name.trim().length < 3

   return (
      <View className="gap-3">
         <TextInput
            placeholder="Nome da categoria"
            placeholderTextColor={Colors.theme.textMuted}
            value={name}
            onChangeText={setName}
            style={components.input}
         />
         <Pressable
            onPress={handleSubmit}
            disabled={disabled}
            style={[components.buttonPrimary, disabled && components.buttonPrimaryDisabled]}
         >
            <Text style={components.buttonPrimaryText}>{isAdding ? "Salvando..." : "Salvar"}</Text>
         </Pressable>
      </View>
   )
}
