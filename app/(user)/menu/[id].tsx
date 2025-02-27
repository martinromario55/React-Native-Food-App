import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types/types'
import { useProduct } from '@/api/products'
import RemoteImage from '@/components/RemoteImage'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const router = useRouter()
  const { id: idString } = useLocalSearchParams()

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error, isLoading } = useProduct(id)

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  const { addItem } = useCart()

  const addToCart = () => {
    // console.warn('Add to cart')
    if (!product) {
      return
    }
    addItem(product, selectedSize)
    router.push('/cart')
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error || !product) {
    return <Text>Failed to fetch product.</Text>
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

      {/* <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      /> */}
      <RemoteImage
        path={product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.sizes}>Select Size</Text>
      <View style={styles.sizeView}>
        {sizes.map(size => (
          <Pressable
            onPress={() => {
              setSelectedSize(size)
            }}
            key={size}
            style={[
              styles.sizeCon,
              {
                backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? 'black' : 'gray',
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button text="Add to cart" onPress={addToCart} />
    </View>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sizeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sizeCon: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
})
