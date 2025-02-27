import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/components/ProductListItem'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useProduct } from '@/api/products'
import RemoteImage from '@/components/RemoteImage'

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error, isLoading } = useProduct(id)

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error || !product) {
    return <Text>Failed to fetch product.</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
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
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
  },
})
