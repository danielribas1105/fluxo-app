import { layout } from "@/src/css/layout"
import { text } from "@/src/css/text"
import { ScrollView, Text, View } from "react-native"

export default function TransationsScreen() {
   return (
      <ScrollView style={layout.container} contentContainerStyle={layout.box}>
         <View style={layout.content}>
            <Text style={text.title}>Transations</Text>
         </View>
      </ScrollView>
   )
}
