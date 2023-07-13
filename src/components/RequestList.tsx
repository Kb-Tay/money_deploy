import { api } from "~/utils/api"
import { Follows, followsProps } from "~/pages/search"
import { useSession } from "next-auth/react"
import ProfileImg from "./ProfileImg"

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
      <div>
        { props.follows?.filter(post => !post.isFriend).map((post, ind) => 
          <ul key={post.followingId} className="profile">
            <div className="flex flex-row items-center space-x-2">
              <ProfileImg src={post.followerImg}/>
              <div key={post.followerName}>{post.followerName}</div>
            </div>
            <button key={post.followerId} className="btn-primary" onClick={() => addFriend(post.followerId)}>Add</button>    
          </ul>
        )}
      </div>
    </>
  )
}