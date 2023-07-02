import { api } from "~/utils/api"
import { InfiniteSpending } from "~/components/InfiniteSpending"
import Target from "~/components/Target"
import { useSession } from "next-auth/react"
import { SpendingData } from "~/components/SpendingData"
import ProfileImg from "~/components/ProfileImg"
import Expense from "~/components/Expense"


export type Spending = { 
  id: string, 
  money: number, 
  category: string, 
  content: string, 
  createdAt: Date, 
  userId: string,
}

export type SpendingProps = {
  spendings?: Spending[]
  userId: string
}

export type TargetProps = {
  src?: string | null
  name?: string | null
  spendings?: Spending[]
  userId: string 
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
        <Target src={session.data.user.image} name={session.data.user.name} spendings={data.spending} userId={user}/>
        <Expense spendings={data.spending} userId={user}/> 
      </div>
        <SpendingData spendings={data.spending} userId={user}/> 
      {/* <InfiniteSpending spending={data?.pages.flatMap(page => page.spending)}
        isLoading={isLoading}
        isError={isError}
        hasMore={hasNextPage}
        fetchNewSpending={fetchNextPage}
        />  */}
        
    </div>
  )

}