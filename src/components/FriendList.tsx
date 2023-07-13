import { Follows } from "@prisma/client"
import { api } from "~/utils/api"
import ProfileImg from "./ProfileImg"

type FriendProps = { 
  followers: Follows[] | undefined, 
  following: Follows[] | undefined,
  userId: string
}

export default function FriendList({userId, followers, following}: FriendProps) {
  console.log(followers)

  return (
        <div className="profile">
          
            {
              followers?.filter(post => post.isFriend).map(post =>
                <div className="flex flex-rows items-center space-x-2">
                  <ProfileImg src={post.followingImg}/> 
                  <p key={post.followingId}>{post.followingName}</p>
                </div>
              )
            }
          
          {
            following?.filter(post => post.isFriend).map(post => 
              <div key={post.followerId} className="flex flex-rows items-cetner space-x-2 ">
                <ProfileImg src={post.followerImg}/> 
                <p key={post.followerName}>{post.followerName}</p>
            </div>
            )
          }
        </div>
  )
}