import { layout } from "@/src/css/layout"
import { text } from "@/src/css/text"
import { ScrollView, Text, View } from "react-native"
import Header from "./components/header"

export default function HomeScreen() {
   return (
      <ScrollView style={layout.container} contentContainerStyle={layout.box}>
         <Header />
         <View style={layout.content}>
            <Text style={text.title}>Página Home</Text>
         </View>
      </ScrollView>
   )
}
