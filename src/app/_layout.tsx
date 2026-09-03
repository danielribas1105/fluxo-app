import { OnboardingProvider, useOnboarding } from "@/context/onboarding"
import { db } from "@/db"
import { queryClient } from "@/lib/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import migrations from "../../drizzle/migrations"

function Navigation() {
   const { hasOnboarded, isReady } = useOnboarding()
   const { success: dbReady, error: dbError } = useMigrations(db, migrations)
   const router = useRouter()
   const segments = useSegments()

   useEffect(() => {
      if (!isReady || !dbReady) return

      const inTabsGroup = segments[0] === "(tabs)"
      const inOnboarding = segments[0] === "onboarding"

      if (!hasOnboarded && !inOnboarding) {
         router.replace("/onboarding")
      } else if (hasOnboarded && !inTabsGroup) {
         router.replace("/(tabs)/home")
      }
   }, [isReady, dbReady, hasOnboarded, segments])

   if (dbError) {
      return (
         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text>Erro ao preparar o banco de dados:</Text>
            <Text>{dbError.message}</Text>
         </View>
      )
   }

   if (!dbReady || !isReady) {
      return (
         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
         </View>
      )
   }

   return <Slot />
}

export default function RootLayout() {
   return (
      <QueryClientProvider client={queryClient}>
         <OnboardingProvider>
            <Navigation />
         </OnboardingProvider>
      </QueryClientProvider>
   )
}
