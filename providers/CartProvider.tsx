import { CartItem, Product } from '@/types/types'
import { randomUUID } from 'expo-crypto'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (itemId: string, amount: -1 | 1) => void
  total: number
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
})

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, size: CartItem['size']) => {
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

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCart = () => useContext(CartContext)
