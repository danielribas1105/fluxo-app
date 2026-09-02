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
      <View className="gap-2 mb-6">
         <View className="flex-row justify-between items-center">
            <Text style={typography.title}>{title}</Text>
            <Pressable
               onPress={() => setModalVisible(true)}
               className="bg-black rounded-full w-8 h-8 items-center justify-center"
            >
               <Text className="text-white text-lg leading-none">+</Text>
            </Pressable>
         </View>

         {isLoading ? (
            <Text className="text-gray-400">Carregando...</Text>
         ) : items && items.length > 0 ? (
            items.map((item) => (
               <View key={item.id} className="bg-gray-100 rounded-lg px-3 py-2">
                  <Text className="text-base">{renderItem(item)}</Text>
               </View>
            ))
         ) : (
            <Text className="text-gray-400">Nenhum item cadastrado</Text>
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
