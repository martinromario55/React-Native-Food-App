import { useProductList } from '@/api/products'
import ProductListItem from '@/components/ProductListItem'
import { ActivityIndicator, FlatList, Text } from 'react-native'

export default function TabOneScreen() {
  const { data: products, error, isLoading } = useProductList()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Error fetching products</Text>
  }
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
