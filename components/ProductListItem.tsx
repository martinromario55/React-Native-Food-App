import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Product } from '@/types/types'
import { Link } from 'expo-router'

type ProductListItemProps = {
  product: Product
}

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.img}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    maxWidth: '50%',
  },
  img: {
    width: '100%',
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
  },
})
