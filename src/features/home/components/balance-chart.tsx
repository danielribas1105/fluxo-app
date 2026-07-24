import { useMemo } from "react"
import { View } from "react-native"
import { LineChart } from "react-native-gifted-charts"

import { Colors } from "@/constants/theme"

// Dados fictícios — saldo acumulado mês a mês
const mockMonthlyBalance = [
   { mes: "Fev", saldo: 1200 },
   { mes: "Mar", saldo: 1850 },
   { mes: "Abr", saldo: 1600 },
   { mes: "Mai", saldo: 2400 },
   { mes: "Jun", saldo: 3100 },
   { mes: "Jul", saldo: 2900 },
]

export function BalanceChart() {
   const chartData = useMemo(
      () =>
         mockMonthlyBalance.map((item) => ({
            value: item.saldo,
            label: item.mes,
            dataPointText: item.saldo.toLocaleString("pt-BR"),
         })),
      [],
   )

   return (
      <View style={{ paddingVertical: 16 }}>
         <LineChart
            data={chartData}
            color={Colors.theme.background}
            thickness={3}
            areaChart
            startFillColor={Colors.theme.tintGreen}
            startOpacity={0.3}
            endOpacity={0.02}
            curved
            hideRules
            yAxisTextStyle={{ color: Colors.theme.tabIconDefault }}
            xAxisLabelTextStyle={{ color: Colors.theme.tabIconDefault }}
            dataPointsColor={Colors.theme.income}
            noOfSections={4}
         />
      </View>
   )
}
