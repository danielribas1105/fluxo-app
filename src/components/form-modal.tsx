import { Colors } from "@/constants/theme"
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
         <View
            style={{
               flex: 1,
               justifyContent: "flex-end",
               backgroundColor: "rgba(0,0,0,0.6)",
            }}
         >
            <View
               style={{
                  backgroundColor: Colors.theme.surface,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: 16,
                  gap: 12,
                  borderTopWidth: 1,
                  borderColor: Colors.theme.border,
               }}
            >
               <View className="flex-row justify-between items-center mb-2">
                  <Text style={typography.title}>{title}</Text>
                  <Pressable onPress={onClose}>
                     <Text style={{ fontSize: 16, color: Colors.theme.textMuted }}>Fechar</Text>
                  </Pressable>
               </View>
               {children}
            </View>
         </View>
      </Modal>
   )
}
