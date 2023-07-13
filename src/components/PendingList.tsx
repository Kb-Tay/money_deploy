import type { followsProps } from "~/pages/search"
import ProfileImg from "./ProfileImg"

export default function PendingList(props: followsProps) {

  return (
    <>      
        <div className="profile">
          {props.follows?.filter(post => !post.isFriend).map((post, ind) => 
          <div key={ind} className="flex flex-row items-center space-x-2">
          <ProfileImg src={post.followingImg}/>
          <div key={ind}>{post.followingName}</div>
          </div>)}
        </div>
    </>
  )
}