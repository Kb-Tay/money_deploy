import { api } from "~/utils/api"
import { Input } from "@chakra-ui/react"
import ProfileImg from "~/components/ProfileImg"
import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import PendingList from "~/components/PendingList"
import RequestList from "~/components/RequestList"
import FriendList from "~/components/FriendList"

type userInfo = { 
  id: string;
  name: string | null;
  image: string | null;
}

export type Follows = {
  followerId: string,
  followingId: string,
  followerName: string | null
  followerImg: string | null
  followingName: string | null
  followingImg: string | null
  isFriend: boolean
}

export type followsProps = {
  follows: Follows[] | undefined
}

export default function Page() { 
  const { data } = api.user.getAll.useQuery()
  const utils = api.useContext()

  const [search, setSearch] = useState('')
  const [friends, setFriends] = useState(false)
  const [pending, setPending] = useState(false)
  const [request, setRequest] = useState(false)


  const session = useSession()
  const userId = session.data?.user.id as string
  const user = session.data?.user

  const following = api.user.getFollowing.useQuery(userId) 
  const followers = api.user.getFollowers.useQuery(userId)

  const followingSet = new Set<string>()
  const followerSet = new Set<string>() 

  if (following.data != undefined) {
    for (let i = 0; i < following.data.length; i++) {
      const check = following.data[i]
      if (check != undefined) {
        followingSet.add(check.followerId)
      }
    }
  }
  
  if (followers.data != undefined) {
    for (let i = 0; i < followers.data.length; i++) {
      const check = followers.data[i]
      if (check != undefined) {
        followerSet.add(check.followingId)
      }
    }
  }

  const createFollower = api.user.createFriend.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate()
    }
  })

  const handleSubmit = (info: userInfo) => { 
      const userName = user?.name == null ? undefined : user.name
      const userImg = user?.image == null ? undefined : user.image
      const friendName = info.name == null ? undefined : info.name
      const friendImg = info.image == null ? undefined : info.image

      createFollower.mutate({
        followerId: userId, 
        followingId: info.id,
        followerName: userName,
        followingName: friendName,
        followerImg: userImg,
        followingImg: friendImg,
      })
  }
  
  return (
    <div className="py-3">
      <div className="md:grid md:grid-cols-4"> 
        <div className="px-5">
          <div className="px-2 py-1 ">
            <div className="flex justify-between items-center space-x-4">   
              <h1 className="font-medium text-xl py-2">Current Friends:</h1> 
              { friends ? <button className='btn-primary' onClick={() => setFriends(!friends)}>Close</button> 
              : <button className='btn-primary' onClick={() => setFriends(!friends)}>Show</button>}
            </div>  
            { friends ? <FriendList followers={followers.data} following={following.data}/> : <></>}
          </div> 

        </div>
              
        <div className="px-5">
          <div className="px-2 py-1">
            <div className="flex justify-between items-center space-x-4"> 
              <h1 className="font-medium text-xl py-2">Pending Request:</h1>
              { followers.data?.filter(post => !post.isFriend).length == 0 ? <p className="text-md">No pending Request</p> :
              <div>
                { pending ? <button className='btn-primary' onClick={() => setPending(!pending)}>Close</button> 
                : <button className='btn-primary' onClick={() => setPending(!pending)}>Show</button>}
              </div>
              }
            </div>
            { pending ? <PendingList follows={followers.data}/> : <></>}
          </div>

          <div className="px-2 py-1">
            <div className="flex justify-between items-center space-x-4"> 
              <h1 className="font-medium text-xl py-2">Friend Requests:</h1>
              { following.data?.filter(post => !post.isFriend).length == 0 ? <p className="text-md">No current Request</p> :
              <div>
                { request ? <button className='btn-primary' onClick={() => setRequest(!request)}>Close</button> 
                : <button className='btn-primary' onClick={() => setRequest(!request)}>Show</button>}
              </div>
              }
            </div>
            { request ? <RequestList follows={following.data}/> : <></>}
          </div>
        </div>
        
        <div className="col-span-2">
          <div className="flex flex-row justify-center space-x-4 items-center pb-3 px-2"> 
            <h1 className="font-medium text-xl">Search Friends:</h1>
            <Input placeholder="Enter username" w={300} onChange={e => setSearch(e.target.value)}/>
          </div>

          <div className="flex flex-col justify-center space-y-2"> 
            {data?.filter(post => {
              const result = post.name
              if (search == '' || result == null || post.id == userId) {
                return 
              } else if (result.toLowerCase().includes(search.toLowerCase())) {
                return post
              }
            }).map(post => 
              <div key={post.id} className="flex flex-row justify-center">
                <div className="flex flex-row justify-between border-2 rounded-lg px-2 py-2 items-center sm:w-1/2 w-3/4">
                  <div className="flex flex-row items-center" >
                    <ProfileImg key={post.image} src={post.image}/>
                    <p key={post.name} className="font-mono text-xl">{post.name}</p>
                  </div>
                  { followerSet.has(post.id) 
                    ? <p className="text-sm">Request Sent</p> 
                    : followingSet.has(post.id) 
                    ? <p className="text-sm">Pending Request</p> 
                    : <button key={post.id} className="btn-primary h-8" onClick={() => {handleSubmit(post)}}>Add</button> 
                  }
                </div>
              </div> 
            )}
          </div>
        </div>

      </div>
      

    </div>
  )
}