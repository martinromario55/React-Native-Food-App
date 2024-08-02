import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Button from '@/components/Button'

const index = () => {
  return (
    <View style={styles.container}>
      <Link href={'/(user)'} asChild>
        <Button text="user" />
      </Link>

      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
})
