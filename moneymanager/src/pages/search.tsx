import { api } from "~/utils/api"
import { Input } from "@chakra-ui/react"
import Image from "next/image"
import ProfileImg from "~/components/ProfileImg"
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import FriendList from "~/components/FriendList"

export default function Page() { 
  const { data } = api.user.getAll.useQuery()
  const utils = api.useContext()
  const [search, setSearch] = useState('')
  const session = useSession()
  const userId = session.data?.user.id as string
  const user = session.data?.user

  const friends = api.user.getFriends.useQuery(userId)  

  const createFollower = api.user.createFriend.useMutation({
    onSuccess: (newFollower) => {
      utils.invalidate()
    }
  })

  const handleSubmit = (following: string) => { 
      createFollower.mutate({
        followerId: userId, 
        followingId: following
      })
  }

  return (
    <div className="py-3">
      <div className="grid grid-cols-2">
        <div className="cols-span-1 pl-3">
          <h1 className="font-medium text-xl py-2">Current Friends:</h1>
          <div className="flex flex-cols">
            {data?.filter(post => post.id == userId).filter(post => friends.data?.map(x => x.followerId == post.name)) //redo this
            .map(post => <div key={post.id}>{post.name}</div>)}
          </div>
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
              <div className="flex flex-row justify-center">
                <div className="flex flex-row justify-between border-2 rounded-lg px-2 py-2 items-center w-1/2">
                  <div className="flex flex-row items-center" >
                    <ProfileImg key={post.image} src={post.image}/>
                    <p key={post.name} className="font-mono text-xl">{post.name}</p>
                  </div>
                  <button key={post.id} className="btn-primary h-8" onClick={() => {handleSubmit(post.id)}}>Add</button> 
                </div>
              </div> 
            )}
          </div>
        </div>
      </div>
      

    </div>
  )
}