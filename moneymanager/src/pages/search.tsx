import { api } from "~/utils/api"
import { Input } from "@chakra-ui/react"
import Image from "next/image"
import ProfileImg from "~/components/ProfileImg"
import React, { useState, useEffect } from 'react'
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
  const session = useSession()
  const userId = session.data?.user.id as string
  const user = session.data?.user

  const following = api.user.getFollowing.useQuery(userId) 
  const followers = api.user.getFollowers.useQuery(userId)

  const createFollower = api.user.createFriend.useMutation({
    onSuccess: () => {
      utils.user.invalidate()
    }
  })

  const handleSubmit = (info: userInfo) => { 
      const userName = user?.name == null ? undefined : user.name
      const userImg = user?.image == null ? undefined : user.image
      const friendName = info.name == null ? undefined : info.name
      const friendImg = info.image == null ? undefined : info.image

      createFollower.mutate({
        followerId: userId, 
        followingId: info.id as string,
        followerName: userName,
        followingName: friendName,
        followerImg: userImg,
        followingImg: friendImg,
      })
  }
  
  return (
    <div className="py-3">
      <div className="grid grid-cols-2">
        <div className="cols-span-1 pl-3">
          <FriendList userId={userId} followers={followers.data} following={following.data}/> 
          <PendingList follows={followers.data}/>
          <RequestList follows={following.data}/> 
        </div>
        
        <div className="cols-span-2">
          <div className="flex flex-row justify-center space-x-4 items-center pb-3"> 
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
                <div className="flex flex-row justify-between border-2 rounded-lg px-2 py-2 items-center w-1/2">
                  <div className="flex flex-row items-center" >
                    <ProfileImg key={post.image} src={post.image}/>
                    <p key={post.name} className="font-mono text-xl">{post.name}</p>
                  </div>
                  <button key={post.id} className="btn-primary h-8" onClick={() => {handleSubmit(post)}}>Add</button> 
                </div>
              </div> 
            )}
          </div>
        </div>
      </div>
      

    </div>
  )
}