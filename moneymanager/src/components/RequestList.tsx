import { api } from "~/utils/api"
import { Follows, followsProps } from "~/pages/search"
import { useSession } from "next-auth/react"

export default function RequestList( props: followsProps) {
  const utils = api.useContext()
  const session = useSession()
  const userId = session.data?.user.id as string

  const addFriendProcedure = api.user.addFriend.useMutation({
    onSuccess: (values) => {
      utils.user.invalidate()
    }
  })
  
  function addFriend(followerId: string) {
    addFriendProcedure.mutate({
      followerId: followerId, 
      followingId: userId,
      isFriend: true
    })
  }
 

  return (
    <>
      <h1 className="font-medium text-xl py-2">Friend Requests:</h1>
        <div className="flex flex-cols">
          { props.follows?.filter(post => !post.isFriend).map( post => 
            <ul key={post.followingId}>
              <div key={post.followerName}>{post.followerName}</div>
              <button key={post.followerId} className="btn-primary" onClick={() => addFriend(post.followerId)}>Add</button>    
            </ul>
          )}
        </div>
    </>
  )
}