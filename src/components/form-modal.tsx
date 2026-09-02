import { typography } from "@/css/typography"
import { Modal, Pressable, Text, View } from "react-native"

type Props = {
   visible: boolean
   title: string
   onClose: () => void
   children: React.ReactNode
}

export function FormModal({ visible, title, onClose, children }: Props) {
   return (
      <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
         <View className="flex-1 justify-end bg-black/40">
            <View className="bg-white rounded-t-2xl p-4 gap-3">
               <View className="flex-row justify-between items-center mb-2">
                  <Text style={typography.title}>{title}</Text>
                  <Pressable onPress={onClose}>
                     <Text className="text-base text-gray-500">Fechar</Text>
                  </Pressable>
               </View>
               {children}
            </View>
         </View>
      </Modal>
   )
}
