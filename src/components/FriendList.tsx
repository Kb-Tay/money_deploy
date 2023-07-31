import type { Follows } from "@prisma/client"
import ProfileImg from "./ProfileImg"

type FriendProps = { 
  followers: Follows[] | undefined, 
  following: Follows[] | undefined,
}

export default function FriendList({followers, following}: FriendProps) {

  return (
        <div className="flex flex-col space-y-2">
          
          <div className="profile">
            {
              followers?.filter(post => post.isFriend).map((post, index) =>
                <div key={index} className="flex flex-rows items-center space-x-2">
                  <ProfileImg src={post.followingImg}/> 
                  <p key={post.followingId}>{post.followingName}</p>
                </div>
              )
            }
          </div>   

          <div className="profile">
          {
            following?.filter(post => post.isFriend).map((post, index) => 
              <div key={index} className="flex flex-rows items-center space-x-2 ">
                <ProfileImg src={post.followerImg}/> 
                <p key={post.followerName}>{post.followerName}</p>
            </div>
            )
          }
          </div>
          
        </div>
  )
}