import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '@/app/api/products'

const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const router = useRouter()

  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
  const isUpdating = !!id

  const { mutate: insertProduct } = useInsertProduct()
  const { mutate: updateProduct } = useUpdateProduct()
  const { mutate: deleteProduct } = useDeleteProduct()

  const { data: updatingProduct } = useProduct(id)

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name)
      setPrice(updatingProduct.price.toString())
      setImage(updatingProduct.image_url)
    }
  }, [updatingProduct])

  const resetFields = () => {
    setName('')
    setPrice('')
  }

  const validateInput = () => {
    setErrors('')

    if (!name) {
      setErrors('Name is required')
      return false
    }

    if (!price) {
      setErrors('Price is required')
      return false
    }

    if (isNaN(parseFloat(price))) {
      setErrors('Price must be a number')
      return false
    }

    return true
  }

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const onCreate = () => {
    if (!validateInput()) {
      return
    }
    // create product, save in DB
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        },
      }
    )

    resetFields()
  }

  const onUpdate = () => {
    if (!validateInput()) {
      return
    }
    // create product, save in DB
    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        },
      }
    )
  }

  const onDelete = () => {
    // delete product, remove from DB
    deleteProduct(id, {
      onSuccess: () => {
        router.replace('/(admin)')
      },
    })
  }

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      {
        text: 'Delete',
        onPress: onDelete,
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}
      />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.imageText}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      {errors && <Text style={styles.errorText}>{errors}</Text>}
      <Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.deleteText}>
          Delete
        </Text>
      )}
    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  imageText: {
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  label: {
    fontSize: 18,
    color: 'gray',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  deleteText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    textAlign: 'center',
  },
})
