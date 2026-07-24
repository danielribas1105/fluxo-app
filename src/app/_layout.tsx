import { OnboardingProvider, useOnboarding } from "@/context/onboarding"
import { initDatabase } from "@/lib/db/database"
import { queryClient } from "@/lib/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect, useState } from "react"

function Navigation() {
   const { hasOnboarded, isReady } = useOnboarding()
   const [dbReady, setDbReady] = useState(false)
   const router = useRouter()
   const segments = useSegments()

   useEffect(() => {
      initDatabase().then(() => setDbReady(true))
   }, [])

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
