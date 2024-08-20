import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

type Props = {}

const page = async (props: Props) => {

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      Hello {data.user.email}
      <h1>Purchase our product</h1>
      <a href="https://buy.stripe.com/test_6oEbKm091aL19occMM" target="_blank" rel="noopener noreferrer">
        Pay Now
      </a>
    </div>
  )
}

export default page