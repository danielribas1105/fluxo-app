import { layout } from "@/css/layout"
import { typography } from "@/css/typography"
import { ScrollView, Text, View } from "react-native"

export default function MoreScreen() {
   return (
      <ScrollView style={layout.container} contentContainerStyle={layout.box}>
         <View style={layout.content}>
            <Text style={typography.title}>More actions</Text>
         </View>
      </ScrollView>
   )
}
