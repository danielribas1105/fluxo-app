import { StyleSheet, Text, View } from "react-native"
import { PieChart } from "react-native-gifted-charts"

import { Colors } from "@/constants/theme"

// Dados genéricos — trocar depois pela agregação real de lançamentos por categoria
const categoryData = [
   { value: 850, color: "#4F8EF7", text: "34%", label: "Moradia" },
   { value: 420, color: "#F76E4F", text: "17%", label: "Alimentação" },
   { value: 380, color: "#F7C04F", text: "15%", label: "Transporte" },
   { value: 300, color: "#4FF7A1", text: "12%", label: "Lazer" },
   { value: 250, color: "#B04FF7", text: "10%", label: "Saúde" },
   { value: 300, color: "#9E9E9E", text: "12%", label: "Outros" },
]

const total = categoryData.reduce((acc, item) => acc + item.value, 0)

export function CategoryPieChart() {
   return (
      <View style={styles.container}>
         <View style={styles.chartWrapper}>
            <PieChart
               data={categoryData}
               donut
               radius={90}
               innerRadius={60}
               innerCircleColor={Colors.theme.background}
               centerLabelComponent={() => (
                  <View style={{ alignItems: "center" }}>
                     <Text style={styles.centerLabel}>Total</Text>
                     <Text style={styles.centerValue}>R$ {total.toLocaleString("pt-BR")}</Text>
                  </View>
               )}
            />
         </View>

         <View style={styles.legend}>
            {categoryData.map((item) => (
               <View key={item.label} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <Text style={styles.legendLabel}>{item.label}</Text>
                  <Text style={styles.legendValue}>R$ {item.value.toLocaleString("pt-BR")}</Text>
               </View>
            ))}
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      paddingVertical: 16,
      alignItems: "center",
   },
   chartWrapper: {
      marginBottom: 20,
   },
   centerLabel: {
      fontSize: 12,
      color: Colors.theme.tabIconDefault,
   },
   centerValue: {
      fontSize: 16,
      fontWeight: "600",
      color: Colors.theme.text,
   },
   legend: {
      width: "100%",
      gap: 10,
   },
   legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
   },
   legendDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
   },
   legendLabel: {
      flex: 1,
      fontSize: 14,
      color: Colors.theme.text,
   },
   legendValue: {
      fontSize: 14,
      fontWeight: "500",
      color: Colors.theme.text,
   },
})
