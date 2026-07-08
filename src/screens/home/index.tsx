import { layout } from "@/src/css/layout"
import { ScrollView, Text, View } from "react-native"

export default function HomeScreen() {
   return (
      <ScrollView style={layout.container}>
         <View>
            <Text>Página Home</Text>
         </View>
      </ScrollView>
   )
}
