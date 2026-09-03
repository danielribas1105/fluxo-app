import { Colors } from "@/constants/theme"
import { components } from "@/css/components"
import { layout } from "@/css/layout"
import { typography } from "@/css/typography"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { FormModal } from "./form-modal"

type Props<T> = {
   title: string
   items: T[] | undefined
   isLoading: boolean
   renderItem: (item: T) => string
   renderForm: (close: () => void) => React.ReactNode
}

export function EntitySection<T extends { id: string | number }>({
   title,
   items,
   isLoading,
   renderItem,
   renderForm,
}: Props<T>) {
   const [modalVisible, setModalVisible] = useState(false)

   return (
      <View style={components.card}>
         <View style={{ ...layout.flex_row, gap: 6 }}>
            <Text style={typography.title}>{title}</Text>
            <Pressable onPress={() => setModalVisible(true)} style={components.addButton}>
               <Text style={components.addButtonText}>+</Text>
            </Pressable>
         </View>

         {isLoading ? (
            <Text style={{ color: Colors.theme.textMuted }}>Carregando...</Text>
         ) : items && items.length > 0 ? (
            items.map((item) => (
               <View key={item.id} style={components.card}>
                  <Text style={{ color: Colors.theme.title, fontSize: 16 }}>
                     {renderItem(item)}
                  </Text>
               </View>
            ))
         ) : (
            <Text style={{ color: Colors.theme.textMuted }}>Nenhum item cadastrado</Text>
         )}

         <FormModal
            visible={modalVisible}
            title={`Novo — ${title}`}
            onClose={() => setModalVisible(false)}
         >
            {renderForm(() => setModalVisible(false))}
         </FormModal>
      </View>
   )
}
