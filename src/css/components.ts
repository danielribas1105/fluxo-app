import { StyleSheet } from "react-native"
import { Colors } from "../constants/theme"

const theme = Colors.theme

export const components = StyleSheet.create({
   card: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: theme.border,
   },
   input: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.title,
   },
   chip: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 8,
   },
   chipSelected: {
      backgroundColor: theme.tintGreen,
      borderColor: theme.tintGreen,
   },
   chipText: {
      color: theme.text,
      fontSize: 14,
   },
   chipTextSelected: {
      color: theme.background,
      fontWeight: "600",
   },
   buttonPrimary: {
      backgroundColor: theme.tintGreen,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
   },
   buttonPrimaryDisabled: {
      opacity: 0.4,
   },
   buttonPrimaryText: {
      color: theme.background,
      fontWeight: "700",
      fontSize: 16,
   },
   addButton: {
      backgroundColor: theme.tintGreen,
      borderRadius: 999,
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
   },
   addButtonText: {
      color: theme.background,
      fontSize: 18,
      lineHeight: 18,
      fontWeight: "700",
   },
})
