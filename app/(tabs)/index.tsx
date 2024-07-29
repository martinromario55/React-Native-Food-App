import products from '@/assets/data/products'
import Colors from '@/constants/Colors'
import { Image, StyleSheet, Text, View } from 'react-native'

const product = products[0]

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.img} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
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
