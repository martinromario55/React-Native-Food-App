import { Alert } from 'react-native'
import { supabase } from './supabase'
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native'

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount },
  })

  if (data) {
    return data
  }

  if (error) {
    console.error('Error! Something went wrong:', error)
  }

  Alert.alert('Error fetching payment sheet params')
  return {}
}

export const initialisePaymentSheet = async (amount: number) => {
  console.log('Initialising payment sheet, for: ', amount)

  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(
    amount
  )
  // console.log(data)

  if (!paymentIntent || !publishableKey) return

  await initPaymentSheet({
    merchantDisplayName: 'GriotHub',
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: 'Jane Doe',
    },
  })
}

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet()

  if (error) {
    Alert.alert(error.message)
    return false
  }

  return true
}
