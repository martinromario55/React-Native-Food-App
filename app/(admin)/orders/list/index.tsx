import { useAdminOrderList } from '@/api/orders'
import { useInsertOrderSubscription } from '@/api/orders/subscription'
import OrderListItem from '@/components/OrderListItem'
import { supabase } from '@/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, FlatList, Text } from 'react-native'

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false })

  const queryClient = useQueryClient()

  useInsertOrderSubscription()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Error fetching orders.</Text>
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Active' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  )
}
