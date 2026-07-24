import { StyleSheet } from "react-native"
import { Colors } from "../constants/theme"

export const layout = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.theme.background,
   },
   box: {
      paddingTop: 40,
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom: 40,
      gap: 16,
   },
   content: {
      backgroundColor: Colors.theme.tintGreen,
   },
   flex_row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
   },
})
