import { stripe } from './stripe.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const createOrRetrieveProfile = async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  )
  // Now we can get the session or user object
  const {
    data: { user },
  } = await supabaseClient.auth.getUser()

  //   console.log(user)
  if (!user) throw new Error('No user found')

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    throw new Error('Profile not found')
  }

  console.log(profile)

  if (profile.stripe_customer_id) {
    return profile.stripe_customer_id
  }

  //   Create a stripe customer
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { uid: user.id },
  })

  console.log(customer)

  await supabaseClient
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', profile.id)

  return customer.id
}
