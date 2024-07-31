import products from '@/assets/data/products'
import ProductListItem from '@/components/ProductListItem'
import { FlatList } from 'react-native'

export default function TabOneScreen() {
  return (
    <FlatList
      data={products}
      keyExtractor={product => product.id.toString()}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  )
}
