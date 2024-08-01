import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

const CartScreen = () => {
  const { items, total } = useCart()
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      <Text style={styles.total}>Total: ${total}</Text>
      <Button text="Checkout" />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  total: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 20,
  },
})
