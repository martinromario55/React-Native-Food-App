import { useAdminOrderList } from '@/api/orders'
import OrderListItem from '@/components/OrderListItem'
import { Stack } from 'expo-router'
import { ActivityIndicator, FlatList, Text } from 'react-native'

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Error fetching orders.</Text>
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Archive' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  )
}
