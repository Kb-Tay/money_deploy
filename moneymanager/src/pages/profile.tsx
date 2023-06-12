import { api } from "~/utils/api"
import { InfiniteSpending } from "~/components/InfiniteSpending"
import Target from "~/components/Target"

function Expense() {
  const { data } = api.spending.getAll.useQuery() 
  const currMonth = new Date().getMonth() //not sure if this refreshes when 
  const currYear = new Date().getFullYear()

  return(
    <div className="bg-slate-500 px-4 py-2 rounded-lg">
          <p className="border-solid border-slate-600 border-b-2">Expenses Monthly:</p>
          <div className="flex justify-between">
            <div> 
              <span>Total: </span>
              <span className="font-bold text-2xl">${data?.filter(post => (post.createdAt.getMonth() == currMonth 
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
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = api.spending.get.useInfiniteQuery({}, 
    { getNextPageParam: lastpage => lastpage.nextCursor })


  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="px-20 py-4">
      <div className="grid sm:grid-cols-2 gap-4 pb-3">
        <Target/>
        <Expense/> 
      </div>
      <InfiniteSpending spending={data?.pages.flatMap(page => page.spending)}
        isLoading={isLoading}
        isError={isError}
        hasMore={hasNextPage}
        fetchNewSpending={fetchNextPage}
        /> 
        
    </div>
  )

}