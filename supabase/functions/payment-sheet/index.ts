import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { stripe } from '../_utils/stripe.ts'
import { createOrRetrieveProfile } from '../_utils/supabase.ts'

console.log('Hello from Functions!')

serve(async (req: Request) => {
  try {
    const { amount } = await req.json()
    const customer = await createOrRetrieveProfile(req)

    // Create an ephermeralKey so that the Stripe SDK can fetch the customer's stored payment methods.
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer },
      { apiVersion: '2020-08-27' }
    )

    // Create a PaymentIntent so that the SDK can charge the logged in customer.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer,
    })

    // console.log('Payment intent created', paymentIntent)

    const res = {
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer,
    }
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
