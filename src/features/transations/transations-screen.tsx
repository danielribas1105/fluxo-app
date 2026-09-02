import { Colors } from "@/constants/theme"
import { cards } from "@/css/cards"
import { layout } from "@/css/layout"
import { typography } from "@/css/typography"
import { ArrowBigDown, ArrowBigUp } from "lucide-react-native"
import { useMemo, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

type Tipo = "entrada" | "saida"
type StatusDB = "pendente" | "pago"

type Transaction = {
   id: number
   tipo: Tipo
   descricao: string
   categoria_nome?: string
   valor: number
   data_vencimento: string // AAAA-MM-DD
   data_pagamento: string | null
   status: StatusDB
}

type StatusFiltro = "todas" | "pagas" | "a_vencer" | "atrasadas"

const currentCompetencia = new Date().toISOString().slice(0, 7) // AAAA-MM

function formatCurrency(valor: number) {
   return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function formatDate(dataISO: string) {
   const [ano, mes, dia] = dataISO.split("-")
   return `${dia}/${mes}`
}

function getStatusInfo(transaction: Transaction) {
   if (transaction.status === "pago") {
      return { label: "Paga", color: Colors.theme.income, key: "pagas" as const }
   }

   const hoje = new Date().toISOString().slice(0, 10)
   if (transaction.data_vencimento < hoje) {
      return { label: "Em atraso", color: Colors.theme.expense, key: "atrasadas" as const }
   }

   return { label: "A vencer", color: "#D9A441", key: "a_vencer" as const }
}

const FILTROS: { key: StatusFiltro; label: string }[] = [
   { key: "todas", label: "Todas" },
   { key: "a_vencer", label: "A vencer" },
   { key: "atrasadas", label: "Atrasadas" },
   { key: "pagas", label: "Pagas" },
]

export default function TransationsScreen() {
   const [transactions, setTransactions] = useState<Transaction[]>([])
   const [loading, setLoading] = useState(true)
   const [filtro, setFiltro] = useState<StatusFiltro>("todas")

   /* useEffect(() => {
      // NOTE: ajuste o nome/assinatura conforme a função real em lib/db/transactions.ts
      getSummaryMonth(currentCompetencia)
         .then(setTransactions)
         .finally(() => setLoading(false))
   }, []) */

   const filtered = useMemo(() => {
      const sorted = [...transactions].sort((a, b) =>
         a.data_vencimento.localeCompare(b.data_vencimento),
      )

      if (filtro === "todas") return sorted
      return sorted.filter((t) => getStatusInfo(t).key === filtro)
   }, [transactions, filtro])

   return (
      <ScrollView style={layout.container} contentContainerStyle={layout.box}>
         <Text style={typography.title}>Transações</Text>
         <Text style={typography.text}>
            {new Date(`${currentCompetencia}-01`).toLocaleDateString("pt-BR", {
               month: "long",
               year: "numeric",
            })}
         </Text>

         {/* Filtros por status */}
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ ...layout.flex_row, gap: 8 }}>
               {FILTROS.map((item) => (
                  <Pressable
                     key={item.key}
                     style={[
                        styles.filterChip,
                        {
                           backgroundColor:
                              filtro === item.key ? Colors.theme.tintGreen : "#1D2A44",
                        },
                     ]}
                     onPress={() => setFiltro(item.key)}
                  >
                     <Text style={typography.text}>{item.label}</Text>
                  </Pressable>
               ))}
            </View>
         </ScrollView>

         {/* Lista de transações */}
         {loading && <Text style={typography.text}>Carregando...</Text>}

         {!loading && filtered.length === 0 && (
            <Text style={typography.text}>Nenhuma transação encontrada.</Text>
         )}

         {!loading &&
            filtered.map((transaction) => {
               const status = getStatusInfo(transaction)
               const Icon = transaction.tipo === "entrada" ? ArrowBigDown : ArrowBigUp
               const valorColor =
                  transaction.tipo === "entrada" ? Colors.theme.income : Colors.theme.expense

               return (
                  <View
                     key={transaction.id}
                     style={[
                        cards.summary,
                        styles.transactionCard,
                        { borderLeftColor: status.color },
                     ]}
                  >
                     <View style={styles.iconWrapper}>
                        <Icon color={Colors.theme.text} size={18} />
                     </View>

                     <View style={{ flex: 1, gap: 2 }}>
                        <Text style={typography.text} numberOfLines={1}>
                           {transaction.descricao}
                        </Text>
                        <View style={{ ...layout.flex_row, gap: 6 }}>
                           {transaction.categoria_nome && (
                              <Text style={styles.metaText}>{transaction.categoria_nome}</Text>
                           )}
                           <Text style={styles.metaText}>
                              {formatDate(transaction.data_vencimento)}
                           </Text>
                        </View>
                     </View>

                     <View style={{ alignItems: "flex-end", gap: 4 }}>
                        <Text style={{ color: valorColor, fontSize: 16 }}>
                           {transaction.tipo === "entrada" ? "+" : "-"}
                           {formatCurrency(transaction.valor)}
                        </Text>
                        <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
                           <Text style={styles.statusText}>{status.label}</Text>
                        </View>
                     </View>
                  </View>
               )
            })}
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   filterChip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
   },
   transactionCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: "#1D2A44",
      borderLeftWidth: 3,
   },
   iconWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(255,255,255,0.08)",
      alignItems: "center",
      justifyContent: "center",
   },
   metaText: {
      color: Colors.theme.text,
      fontSize: 12,
      opacity: 0.7,
   },
   statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
   },
   statusText: {
      color: "#0B0F1A",
      fontSize: 11,
      fontWeight: "600",
   },
})
