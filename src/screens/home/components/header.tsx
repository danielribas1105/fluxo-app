import { Colors } from "@/src/constants/theme"
import { layout } from "@/src/css/layout"
import { text } from "@/src/css/text"
import { Bell } from "lucide-react-native"
import { Text, View } from "react-native"

export default function Header() {
   return (
      <View style={{ ...layout.flex_row, justifyContent: "space-between" }}>
         <View style={layout.flex_row}>
            <Text style={text.title}>Olá, Daniel</Text>
            <Text style={{ fontSize: 24 }}>👋🏻</Text>
         </View>
         <View>
            <Bell size={22} color={Colors.theme.text} />
         </View>
      </View>
   )
}
