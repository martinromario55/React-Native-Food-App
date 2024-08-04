import React from 'react'
import { Stack } from 'expo-router'

const OrdersLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{ title: 'Orders', headerShown: false }}
      />
    </Stack>
  )
}

export default OrdersLayout
