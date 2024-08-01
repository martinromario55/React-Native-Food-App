import { Stack } from 'expo-router'

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Menu' }} />
    </Stack>
  )
}

export default MenuLayout
