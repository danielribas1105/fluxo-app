import { useOnboarding } from "@/context/onboarding"
import { layout } from "@/css/layout"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

export default function OnboardingScreen() {
   const { completeOnboarding } = useOnboarding()

   async function handleStart() {
      await completeOnboarding()
      // não precisa mais chamar router.replace aqui —
      // o RootLayout vai perceber que hasOnboarded mudou e navegar sozinho
   }

   return (
      <ScrollView style={layout.container} contentContainerStyle={layout.box}>
         <View>
            <Text style={{ color: "#fff" }}>Bem-vindo ao app!</Text>
            <TouchableOpacity onPress={handleStart}>
               <Text style={{ color: "#fff" }}>Começar</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
   )
}
