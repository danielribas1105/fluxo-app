import { Tabs } from "expo-router"
import React from "react"

import { HapticTab } from "@/components/ui/haptic-tab"
import { Colors } from "@/constants/theme"
import { styles } from "@/features/home/css/add-button"
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs"
import { ArrowLeftRight, Ellipsis, Goal, Home, Plus } from "lucide-react-native"
import { Pressable, View } from "react-native"

function AddTabButton({ ref, children, style, ...props }: BottomTabBarButtonProps) {
   return (
      <Pressable {...props} style={styles.addButtonWrapper}>
         <View style={styles.addButton}>
            <Plus size={30} color="#fff" />
         </View>
      </Pressable>
   )
}

export default function TabLayout() {
   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: Colors.theme.tabIconSelected,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
               backgroundColor: Colors.theme.background,
            },
         }}
      >
         <Tabs.Screen
            name="home" // route indentify
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
            name="add"
            options={{
               title: "",
               tabBarButton: AddTabButton, // sobrescreve o HapticTab só aqui
               tabBarIcon: () => null, // ícone já está dentro do AddTabButton
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
