import { api } from "~/utils/api"
import { InfiniteSpending } from "~/components/InfiniteSpending"
import Target from "~/components/Target"
import { useSession } from "next-auth/react"
import { SpendingData } from "~/components/SpendingData"
import ProfileImg from "~/components/ProfileImg"

export type Spending = { 
  id: string, 
  money: number, 
  category: String, 
  content: String, 
  createdAt: Date, 
  userId: String 
}

export type SpendingProps = {
  spendings?: Spending[]
}


function Expense({spendings}: SpendingProps) {
  // const { data } = api.spending.getAll.useQuery() 
  const currMonth = new Date().getMonth() //not sure if this refreshes when 
  const currYear = new Date().getFullYear()

  return(
    <div className="bg-slate-500 px-4 py-2 rounded-lg">
          <p className="border-solid border-slate-600 border-b-2">Expenses Monthly:</p>
          <div className="flex justify-between">
            <div> 
              <span>Total: </span>
              <span className="font-bold text-2xl">${spendings?.filter(post => (post.createdAt.getMonth() == currMonth 
              && post.createdAt.getFullYear() == currYear)).reduce((sum: number, post) => sum + post.money, 0)}</span>
            </div>
            <div className='items-cent'>
              <span>{currMonth + 1}/{currYear}</span>
            </div>
          </div>
    </div>
  )
}

export default function Page() {
  const session = useSession()
  const user = session.data?.user.id as string
  const { isLoading, isError, error, data } = api.spending.getAll.useQuery(user)

  if (session.status !== 'authenticated') return (<div>Not authenticated</div>); 

  // const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = api.spending.get.useInfiniteQuery({userId: user}, 
  //   { getNextPageParam: lastpage => lastpage.nextCursor })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="px-20 py-4">
      <div className="grid sm:grid-cols-2 gap-4 pb-3">
        <Target src={session.data.user.image} name={session.data.user.name}/>
        <Expense spendings={data.spending}/> 
      </div>
        <SpendingData spendings={data.spending}/> 
      {/* <InfiniteSpending spending={data?.pages.flatMap(page => page.spending)}
        isLoading={isLoading}
        isError={isError}
        hasMore={hasNextPage}
        fetchNewSpending={fetchNextPage}
        />  */}
        
    </div>
  )

}