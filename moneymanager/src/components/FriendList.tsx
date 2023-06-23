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
    <>
        <h1 className="font-medium text-xl py-2">Current Friends:</h1>
        <div className="flex flex-cols">
          
            {
              followers?.filter(post => post.isFriend).map(post =>
                <div className="flex flex-rows">
                  <ProfileImg src={post.followingImg}/> 
                  <p key={post.followingId}>{post.followingName}</p>
                </div>
              )
            }
          
          {
            following?.filter(post => post.isFriend).map(post => 
              <div key={post.followerId} className="flex flex-rows">
                <ProfileImg src={post.followerImg}/> 
                <p key={post.followerName}>{post.followerName}</p>
            </div>
            )
          }
        </div>
    </>
  )
}