import * as SecureStore from "expo-secure-store"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type OnboardingContextType = {
   hasOnboarded: boolean
   isReady: boolean
   completeOnboarding: () => Promise<void>
}

const OnboardingContext = createContext<OnboardingContextType | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
   const [hasOnboarded, setHasOnboarded] = useState(false)
   const [isReady, setIsReady] = useState(false)

   useEffect(() => {
      async function load() {
         const value = await SecureStore.getItemAsync("onboarded")
         setHasOnboarded(value === "true")
         setIsReady(true)
      }
      load()
   }, [])

   async function completeOnboarding() {
      await SecureStore.setItemAsync("onboarded", "true")
      setHasOnboarded(true) // <- aqui é a chave: atualiza o estado compartilhado
   }

   return (
      <OnboardingContext.Provider value={{ hasOnboarded, isReady, completeOnboarding }}>
         {children}
      </OnboardingContext.Provider>
   )
}

export function useOnboarding() {
   const ctx = useContext(OnboardingContext)
   if (!ctx) throw new Error("useOnboarding deve ser usado dentro de OnboardingProvider")
   return ctx
}
