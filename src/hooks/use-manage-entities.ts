import { addCategory, getCategories } from "@/db/category"
import { addCreditCard, getCreditCards } from "@/db/creditCard"
import { addRecurringAccount, getRecurringAccounts } from "@/db/recurringAccount"
import { addRevenueSource, getRevenueSources } from "@/db/revenueSource"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useCategories() {
   const queryClient = useQueryClient()
   const query = useQuery({ queryKey: ["categories"], queryFn: getCategories })
   const mutation = useMutation({
      mutationFn: addCategory,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
   })
   return { ...query, add: mutation.mutateAsync, isAdding: mutation.isPending }
}

export function useCreditCards() {
   const queryClient = useQueryClient()
   const query = useQuery({ queryKey: ["creditCards"], queryFn: getCreditCards })
   const mutation = useMutation({
      mutationFn: addCreditCard,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["creditCards"] }),
   })
   return { ...query, add: mutation.mutateAsync, isAdding: mutation.isPending }
}

export function useRecurringAccounts() {
   const queryClient = useQueryClient()
   const query = useQuery({ queryKey: ["recurringAccounts"], queryFn: getRecurringAccounts })
   const mutation = useMutation({
      mutationFn: addRecurringAccount,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recurringAccounts"] }),
   })
   return { ...query, add: mutation.mutateAsync, isAdding: mutation.isPending }
}

export function useRevenueSources() {
   const queryClient = useQueryClient()
   const query = useQuery({ queryKey: ["revenueSources"], queryFn: getRevenueSources })
   const mutation = useMutation({
      mutationFn: addRevenueSource,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["revenueSources"] }),
   })
   return { ...query, add: mutation.mutateAsync, isAdding: mutation.isPending }
}
