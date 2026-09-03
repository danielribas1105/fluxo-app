import { Colors } from "@/constants/theme"
import { cards } from "@/css/cards"
import { layout } from "@/css/layout"
import { typography } from "@/css/typography"
import { ArrowBigDown, ArrowBigUp } from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { BalanceChart } from "./components/balance-chart"
import { CategoryPieChart } from "./components/category-pie-chart"
import Header from "./components/header"
import SummaryCard from "./components/summary-card"

export default function HomeScreen() {
   const [summary, setSummary] = useState({ entradas: 0, saidas: 0, saldo: 0 })

   /* useEffect(() => {
      getSummaryMonth("2026-07").then(setSummary)
   }, []) */

   return (
      <ScrollView style={layout.container} contentContainerStyle={layout.box}>
         <Header />
         <View style={{ gap: 4, marginBottom: 4 }}>
            <Text style={typography.text}>Saldo atual</Text>
            <Text style={{ fontSize: 36, color: Colors.theme.title }}>R$ 2650.40</Text>
            <Text style={typography.text}>em Maio</Text>
         </View>
         <View style={{ ...layout.flex_row, gap: 10 }}>
            <SummaryCard
               text={"Entradas"}
               value={6350.0}
               color={Colors.theme.income}
               icon={ArrowBigDown}
            />
            <SummaryCard
               text={"Saídas"}
               value={3699.6}
               color={Colors.theme.expense}
               icon={ArrowBigUp}
            />
         </View>
         <View style={{ ...cards.summary, gap: 4, backgroundColor: "#1D2A44" }}>
            <Text style={typography.title}>Saldo do mês</Text>
            <Text style={{ fontSize: 28, color: Colors.theme.income }}>R$ 2.650,40</Text>
         </View>
         <View>
            <BalanceChart />
         </View>
         <View>
            <CategoryPieChart />
         </View>
      </ScrollView>
   )
}
