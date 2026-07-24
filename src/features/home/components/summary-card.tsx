import { Colors } from "@/constants/theme"
import { cards } from "@/css/cards"
import { layout } from "@/css/layout"
import { typography } from "@/css/typography"
import { LucideIcon } from "lucide-react-native"
import { Text, View } from "react-native"

interface SummaryCardProps {
   text: string
   value: number
   color: string
   icon: LucideIcon
}

export default function SummaryCard({ text, value, color, icon: Icon }: SummaryCardProps) {
   return (
      <View style={{ ...cards.summary, backgroundColor: color }}>
         <View style={{ ...layout.flex_row, gap: 6 }}>
            <Icon size={30} color="#fff" style={{ opacity: 0.8 }} />
            <Text style={typography.title}>{text}</Text>
         </View>
         <View style={layout.flex_row}>
            <Text style={{ fontSize: 24, color: Colors.theme.title }}>
               {value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
               })}
            </Text>
         </View>
      </View>
   )
}
