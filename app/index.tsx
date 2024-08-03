import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import Button from '@/components/Button'
import { useAuth } from '@/providers/AuthProvider'
import { supabase } from '@/lib/supabase'

const index = () => {
  const { session, loading, isAdmin } = useAuth()

  if (loading) {
    return <ActivityIndicator />
  }

  // console.log(session)
  if (!session) {
    return <Redirect href={'/sign-in'} />
  }

  if (!isAdmin) {
    return <Redirect href={'/(user)'} />
  }

  return (
    <View style={styles.container}>
      <Link href={'/(user)'} asChild>
        <Button text="user" />
      </Link>

      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>

      <Link href={'/sign-in'} asChild>
        <Button text="Sign In" />
      </Link>

      <Button text="Sign out" onPress={() => supabase.auth.signOut()} />
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
