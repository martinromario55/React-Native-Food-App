import { useInsertOrderItems } from '@/api/order-items'
import { useInsertOrder } from '@/api/orders'
import { CartItem, Tables } from '@/types/types'
import { randomUUID } from 'expo-crypto'
import { useRouter } from 'expo-router'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type CartType = {
  items: CartItem[]
  addItem: (product: Tables<'products'>, size: CartItem['size']) => void
  updateQuantity: (itemId: string, amount: -1 | 1) => void
  total: number
  checkout: () => void
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
})

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([])
  const router = useRouter()

  const { mutate: insertOrder } = useInsertOrder()
  const { mutate: insertOrderItems } = useInsertOrderItems()

  const addItem = (product: Tables<'products'>, size: CartItem['size']) => {
    // console.log(product)
    // *If Already in cart, increment quantity else return
    const existingItem = items.find(
      item => item.product === product && item.size === size
    )

    if (existingItem) {
      updateQuantity(existingItem.id, 1)
      return
    }

    const newCartItem: CartItem = {
      id: randomUUID(), // !Generate random ID
      product,
      product_id: product.id,
      size,
      quantity: 1,
    }

    setItems([newCartItem, ...items])
  }

  // TODO: Update Quantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  )

  const clearCart = () => {
    setItems([])
  }

  const checkout = () => {
    // TODO: Send order to server
    // console.warn('Checkout:', items)
    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      }
    )
  }

  const saveOrderItems = (order: Tables<'orders'>) => {
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      size: item.size,
      quantity: item.quantity,
      // price: item.product.price,
      // total: item.product.price * item.quantity,
    }))

    insertOrderItems(orderItems, {
      onSuccess() {
        clearCart()
        router.push(`/(user)/orders/${order.id}`)
      },
    })
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCart = () => useContext(CartContext)
