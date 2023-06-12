import { AiOutlineShopping } from 'react-icons/ai' 
import { IoFastFoodOutline } from 'react-icons/io5'
import { MdEmojiTransportation } from 'react-icons/md'
import { CiMoneyCheck1 } from 'react-icons/ci' 
import { FaRegTrashAlt } from 'react-icons/fa'
import { RxPencil2 } from 'react-icons/rx'
import Link from 'next/link'

export type Spending = { 
  id: string, 
  money: number, 
  category: String, 
  content: String, 
  createdAt: Date, 
  userId: String 
}

type InfiniteSpendingProps = {
  isLoading: boolean, 
  isError: boolean, 
  hasMore: boolean | undefined, 
  fetchNewSpending: () => Promise<unknown> 
  spending?: Spending[],
}



export function InfiniteSpending({ spending, isLoading, isError, hasMore, 
  fetchNewSpending }: InfiniteSpendingProps) {
  return (
      <div className="relative bg-slate-500 w-full px-4 py-2 rounded-lg border">  
        <p className="font-light border-slate-600 border-b-2">Recent Transactions:</p>
        <div className='py-2'>
          {spending !== null ? spending?.map(post => 

          <div key={post.id} className='grid grid-cols-4 pb-2'>
            <div className="px-4">
              { post.category == "Food & Drinks" 
                ? <IoFastFoodOutline className='w-10 h-10'/>
                : post.category == "Shopping"
                ? <AiOutlineShopping className='w-10 h-10'/>
                : post.category == "Transporation"
                ? <MdEmojiTransportation className='w-10 h-10'/>
                : <CiMoneyCheck1 className='w-10 h-10'/>
              }
            </div>

            <div>
              <p>Amount:</p>
                <p className='text-slate-800 font-bold'>${post.money}</p>
            </div>

            <div> 
              <p>Date:</p>
              <p>{post.createdAt.toLocaleDateString()}</p>
            </div>

            <div className="flex flex-row item-center justify-start space-x-8">
              <Link href={`/profile/${post.id}`}> 
                <RxPencil2 className="hover:text-white hover:cursor-pointer w-8 h-8"/> 
              </Link>
              
                <FaRegTrashAlt className="hover:text-red-700 hover:cursor-pointer w-8 h-8"/>
            </div>

          </div>

          ) : 
          <p>No current spending</p>}
        </div>
        
        <div className="sm:absolute sm:bottom-2 sm:right-5">   
          {hasMore ? ( 
            <button className='underline underline-offset-1 hover:font-bold'
              onClick={() => fetchNewSpending()}>
                More spending
            </button>        
          ) : (<button >Close</button>)}
        </div>
      </div>
  )
}