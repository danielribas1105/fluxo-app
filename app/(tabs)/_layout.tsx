import { Tabs } from "expo-router"
import React from "react"

import { HapticTab } from "@/src/components/ui/haptic-tab"
import { Colors } from "@/src/constants/theme"
import { useColorScheme } from "@/src/hooks/use-color-scheme"
import { ArrowLeftRight, Ellipsis, Goal, Home } from "lucide-react-native"

export default function TabLayout() {
   const colorScheme = useColorScheme()

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
         }}
      >
         <Tabs.Screen
            name="home"
            options={{
               title: "Resumo",
               tabBarIcon: ({ color }) => <Home size={28} color={color} />,
            }}
         />
         <Tabs.Screen
            name="transations"
            options={{
               title: "Transações",
               tabBarIcon: ({ color }) => <ArrowLeftRight size={28} color={color} />,
            }}
         />
         <Tabs.Screen
            name="goals"
            options={{
               title: "Metas",
               tabBarIcon: ({ color }) => <Goal size={28} color={color} />,
            }}
         />
         <Tabs.Screen
            name="more"
            options={{
               title: "Mais",
               tabBarIcon: ({ color }) => <Ellipsis size={28} color={color} />,
            }}
         />
      </Tabs>
   )
}
