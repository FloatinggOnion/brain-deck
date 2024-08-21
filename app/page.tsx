import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js';

type Props = {}

const page = async (props: Props) => {

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  async function getUserCollections(userId: string) {
    try {
      const { data, error } = await supabase
      .from('flashcards')
      .select('collection_name')
      .eq('user_id', userId);
  
      if (error) {
        console.error('Error fetching user collections:', error);
        return null;
      }
  
      // Extract the unique collection names
      const collections = Array.from(new Set(data?.map((item) => item.collection_name) || []));
      return collections;
    } catch (error) {
      console.error('Error fetching user collections:', error);
      return null;
    }
  }

  const collections = await getUserCollections(data?.user.id);

  return (
    <div>
      Hello {data.user.email}
      <h1>Purchase our product</h1>
      <a href="https://buy.stripe.com/test_6oEbKm091aL19occMM" target="_blank" rel="noopener noreferrer">
        Pay Now
      </a>
      {collections && (
        <div>
          <h2>Your collections</h2>
          <ul>
            {collections.map((collection) => (
              <li key={collection}>{collection}</li>
            ))}
          </ul>
          </div>
      )}
    </div>
  )
}

export default page