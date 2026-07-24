import { Colors } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
   addButtonWrapper: {
      top: -10, // "levanta" o botão acima da tab bar
      justifyContent: "center",
      alignItems: "center",
   },
   addButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.theme.tintGreen,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 6, // sombra no Android
   },
})
