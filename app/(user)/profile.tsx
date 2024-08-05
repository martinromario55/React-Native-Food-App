import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/providers/AuthProvider'
import Button from '@/components/Button'
import { supabase } from '@/lib/supabase'

const ProfileScreen = () => {
  const { session } = useAuth()
  const userEmail = session?.user.email
  const userId = session?.user.id
  if (!session) {
    return <ActivityIndicator />
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your ID: {userId}</Text>
      <Text style={styles.text}>Your Email: {userEmail}</Text>

      <Button
        text="Sign Out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    paddingLeft: 2,
  },
})
