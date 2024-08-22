import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js';
import Link from 'next/link';

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
    <div className='flex flex-col justify-center px-12 h-full'>
      <h1 className='font-extrabold text-3xl p-4'>Hello {data.user.email}</h1>
      {/* <h1>Purchase our product</h1>
      <a href="https://buy.stripe.com/test_6oEbKm091aL19occMM" target="_blank" rel="noopener noreferrer">
        Pay Now
      </a> */}
      {collections && (
        <div className='flex flex-col justify-center p-4 gap-4'>
          <h2 className='font-bold text-xl'>Your collections</h2>
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {collections.map((collection) => (
              <Link key={collection} href={`/collections/${collection}`}>
                <li className='p-6 border shadow-lg font-semibold flex justify-center'>{collection}</li>
              </Link>
            ))}
          </ul>
          </div>
      )}
    </div>
  )
}

export default page