import { Colors } from "@/constants/theme"
import { layout } from "@/css/layout"
import { typography } from "@/css/typography"
import { Bell } from "lucide-react-native"
import { Text, View } from "react-native"

export default function Header() {
   return (
      <View style={{ ...layout.flex_row, justifyContent: "space-between" }}>
         <View style={layout.flex_row}>
            <Text style={typography.title}>Olá, Daniel</Text>
            <Text style={{ fontSize: 24 }}>👋🏻</Text>
         </View>
         <View>
            <Bell size={22} color={Colors.theme.text} />
         </View>
      </View>
   )
}
