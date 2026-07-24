import { StyleSheet } from "react-native"
import { Colors } from "../constants/theme"

export const typography = StyleSheet.create({
   title: {
      color: Colors.theme.title,
      fontSize: 20,
   },
   text: {
      color: Colors.theme.text,
      fontSize: 16,
   },
   bigNumber: {
      color: Colors.theme.title,
      fontSize: 26,
   },
})
