import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect, useState } from "react"

export default function RootLayout() {
   const isAuthenticated = true
   const router = useRouter()
   const segments = useSegments()
   const [isReady, setIsReady] = useState(false)

   useEffect(() => {
      const timer = setTimeout(() => setIsReady(true), 0)
      return () => clearTimeout(timer)
   }, [])

   useEffect(() => {
      if (!isReady) return

      const inTabsGroup = segments[0] === "(tabs)"
      const inLogin = segments[0] === "login"

      if (!isAuthenticated && !inLogin) {
         router.replace("/login")
      } else if (isAuthenticated && !inTabsGroup) {
         router.replace("/(tabs)/home")
      }
   }, [isReady, isAuthenticated, segments])

   return <Slot />
}
