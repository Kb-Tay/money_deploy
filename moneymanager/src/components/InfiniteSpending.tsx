import { AiOutlineShopping } from 'react-icons/ai' 
import { IoFastFoodOutline } from 'react-icons/io5'
import { MdEmojiTransportation } from 'react-icons/md'
import { CiMoneyCheck1 } from 'react-icons/ci' 

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
  spending?: Spending[]
}

const currMonth = new Date().getMonth
const currYear = new Date().getFullYear

export function InfiniteSpending({ spending, isLoading, isError, hasMore, 
  fetchNewSpending }: InfiniteSpendingProps) {
  return (

    <div className="py-4 px-20">
      <div className="grid sm:grid-cols-2 gap-4 pb-3">
        <div className="bg-slate-500 px-4 py-2 rounded-lg">
          <p className="">Target this month:</p>
          <span className="font-bold text-white text-3xl">$100</span>
        </div>
        <div className="bg-slate-500 px-4 py-2 rounded-lg">
          <p className="border-solid border-slate-600 border-b-2">Expenses:</p>
          <div className="flex justify-between">
            <div> 
              <span>Total: </span>
              <span className="font-bold text-2xl">${spending?.filter(post => post.createdAt.getMonth == currMonth && post.createdAt.getFullYear == currYear).reduce((sum: number, post: Spending) => sum + post.money, 0)}</span>
            </div>
            <div className='items-cent'>
              <span>Date</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-slate-500 w-full px-4 py-2 rounded-md border">  
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
          ) : (<></>)}
        </div>
        
      </div>
      
    </div>

    

    // <div> 
    //   {spending?.map(post => <p>{post.money}</p>)}
    //   <button onClick={() => fetchNewSpending()}>More spending</button>
    // </div>
  )
}