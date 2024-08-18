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
    <div>Hello {data.user.email}</div>
  )
}

export default page