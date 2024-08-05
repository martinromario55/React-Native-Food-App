import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Tables } from '@/types/types'
import { Link, useSegments } from 'expo-router'
import RemoteImage from './RemoteImage'

type ProductListItemProps = {
  product: Tables<'products'>
}

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments()

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        {/* <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.img}
        /> */}
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.img}
          resizeMode="contain"
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
