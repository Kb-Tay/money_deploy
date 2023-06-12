import { api } from "~/utils/api"
import { InfiniteSpending } from "~/components/InfiniteSpending"

export default function Page() {
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = api.spending.get.useInfiniteQuery({}, 
    { getNextPageParam: lastpage => lastpage.nextCursor})

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <InfiniteSpending spending={data?.pages.flatMap(page => page.spending)}
        isLoading={isLoading}
        isError={isError}
        hasMore={hasNextPage}
        fetchNewSpending={fetchNextPage}
        /> 
      {/* <h1>Current Spending</h1>
      <table className="table-fixed">
        <th>Amount</th>
        <th>Category</th>
        <th>Notes</th>
        <th>Date</th>
        {data.map(post => 
        <tr> 
          <td>{post.money}</td>
          <td>{post.category}</td>
          <td>{post.content}</td>
          <td>{post.createdAt.toDateString()}</td>
        </tr>)}
      </table> */}
        
    </div>
  )

}