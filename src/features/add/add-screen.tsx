import { Colors } from "@/constants/theme"
import { cards } from "@/css/cards"
import { layout } from "@/css/layout"
import { typography } from "@/css/typography"
import { addTransaction } from "@/lib/db/transactions"
import { ArrowBigDown, ArrowBigUp, Calendar, Check, Tag } from "lucide-react-native"
import { useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"

type Tipo = "entrada" | "saida"
type Status = "pendente" | "pago"

type FormState = {
   tipo: Tipo
   descricao: string
   valor: string
   categoria: string
   dataVencimento: string
   status: Status
}

const today = new Date().toISOString().slice(0, 10) // AAAA-MM-DD

const INITIAL_STATE: FormState = {
   tipo: "saida",
   descricao: "",
   valor: "",
   categoria: "",
   dataVencimento: today,
   status: "pendente",
}

export default function AddScreen() {
   const [form, setForm] = useState<FormState>(INITIAL_STATE)
   const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
   const [saving, setSaving] = useState(false)

   function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
      setForm((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
   }

   function validate(): boolean {
      const nextErrors: Partial<Record<keyof FormState, string>> = {}
      const valorNumerico = Number(form.valor.replace(",", "."))

      if (!form.descricao.trim()) nextErrors.descricao = "Informe uma descrição"
      if (!form.valor || Number.isNaN(valorNumerico) || valorNumerico <= 0)
         nextErrors.valor = "Informe um valor válido"
      if (!form.categoria.trim()) nextErrors.categoria = "Informe a categoria"
      if (!form.dataVencimento.trim()) nextErrors.dataVencimento = "Informe a data"

      setErrors(nextErrors)
      return Object.keys(nextErrors).length === 0
   }

   async function handleSubmit() {
      if (!validate()) return

      setSaving(true)
      try {
         // NOTE: ajuste os nomes de campos/função conforme a assinatura real
         // de `addTransaction` em lib/db/transactions.ts
         await addTransaction({
            tipo: form.tipo,
            categoria_id: Number(form.categoria),
            descricao: form.descricao,
            valor: Number(form.valor.replace(",", ".")),
            data_vencimento: form.dataVencimento,
            data_pagamento: form.status === "pago" ? form.dataVencimento : null,
            status: form.status,
            competencia: form.dataVencimento.slice(0, 7), // AAAA-MM
         })

         setForm(INITIAL_STATE)
      } finally {
         setSaving(false)
      }
   }

   return (
      <ScrollView style={layout.container} contentContainerStyle={layout.box}>
         <Text style={typography.title}>Adicionar lançamento</Text>

         {/* Tipo: Entrada / Saída */}
         <View style={layout.flex_row}>
            <Pressable
               style={[
                  styles.typeButton,
                  { backgroundColor: form.tipo === "entrada" ? Colors.theme.income : "#1D2A44" },
               ]}
               onPress={() => updateField("tipo", "entrada")}
            >
               <ArrowBigDown color={Colors.theme.text} size={20} />
               <Text style={typography.text}>Entrada</Text>
            </Pressable>

            <Pressable
               style={[
                  styles.typeButton,
                  { backgroundColor: form.tipo === "saida" ? Colors.theme.expense : "#1D2A44" },
               ]}
               onPress={() => updateField("tipo", "saida")}
            >
               <ArrowBigUp color={Colors.theme.text} size={20} />
               <Text style={typography.text}>Saída</Text>
            </Pressable>
         </View>

         {/* Valor em destaque, no estilo do saldo da Home */}
         <View style={{ ...cards.summary, backgroundColor: "#1D2A44", gap: 4 }}>
            <Text style={typography.text}>Valor</Text>
            <TextInput
               style={typography.bigNumber}
               placeholder="R$ 0,00"
               placeholderTextColor={Colors.theme.text}
               keyboardType="decimal-pad"
               value={form.valor}
               onChangeText={(text) => updateField("valor", text)}
            />
            {errors.valor && <Text style={styles.errorText}>{errors.valor}</Text>}
         </View>

         {/* Descrição */}
         <View style={{ ...cards.summary, backgroundColor: "#1D2A44", gap: 8 }}>
            <Text style={typography.text}>Descrição</Text>
            <TextInput
               style={typography.text}
               placeholder="Ex: Mercado, Salário, Aluguel..."
               placeholderTextColor={Colors.theme.text}
               value={form.descricao}
               onChangeText={(text) => updateField("descricao", text)}
            />
            {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}
         </View>

         {/* Categoria */}
         <View style={{ ...cards.summary, backgroundColor: "#1D2A44", gap: 8 }}>
            <View style={{ ...layout.flex_row, gap: 6 }}>
               <Tag color={Colors.theme.text} size={16} />
               <Text style={typography.text}>Categoria</Text>
            </View>
            <TextInput
               style={typography.text}
               placeholder="Ex: Alimentação, Transporte..."
               placeholderTextColor={Colors.theme.text}
               value={form.categoria}
               onChangeText={(text) => updateField("categoria", text)}
            />
            {errors.categoria && <Text style={styles.errorText}>{errors.categoria}</Text>}
            {/* NOTE: trocar por um seletor puxando de lib/db/categories quando existir */}
         </View>

         {/* Data de vencimento */}
         <View style={{ ...cards.summary, backgroundColor: "#1D2A44", gap: 8 }}>
            <View style={{ ...layout.flex_row, gap: 6 }}>
               <Calendar color={Colors.theme.text} size={16} />
               <Text style={typography.text}>Data</Text>
            </View>
            <TextInput
               style={typography.text}
               placeholder="AAAA-MM-DD"
               placeholderTextColor={Colors.theme.text}
               value={form.dataVencimento}
               onChangeText={(text) => updateField("dataVencimento", text)}
            />
            {errors.dataVencimento && <Text style={styles.errorText}>{errors.dataVencimento}</Text>}
         </View>

         {/* Status */}
         <View style={layout.flex_row}>
            <Pressable
               style={[
                  styles.statusButton,
                  {
                     backgroundColor:
                        form.status === "pendente" ? Colors.theme.tintGreen : "#1D2A44",
                  },
               ]}
               onPress={() => updateField("status", "pendente")}
            >
               <Text style={typography.text}>Pendente</Text>
            </Pressable>

            <Pressable
               style={[
                  styles.statusButton,
                  { backgroundColor: form.status === "pago" ? Colors.theme.tintGreen : "#1D2A44" },
               ]}
               onPress={() => updateField("status", "pago")}
            >
               <Text style={typography.text}>Pago</Text>
            </Pressable>
         </View>

         {/* Submit */}
         <Pressable
            style={[styles.submitButton, { opacity: saving ? 0.6 : 1 }]}
            onPress={handleSubmit}
            disabled={saving}
         >
            <Check color={Colors.theme.text} size={18} />
            <Text style={typography.text}>{saving ? "Salvando..." : "Salvar lançamento"}</Text>
         </Pressable>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   typeButton: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
      paddingVertical: 14,
      borderRadius: 8,
   },
   statusButton: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 10,
      borderRadius: 8,
   },
   submitButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      backgroundColor: Colors.theme.income,
      paddingVertical: 14,
      borderRadius: 8,
      marginTop: 4,
   },
   errorText: {
      color: "#E5484D",
      fontSize: 12,
   },
})
