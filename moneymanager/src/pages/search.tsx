import { api } from "~/utils/api"
import { Input } from "@chakra-ui/react"
import Image from "next/image"
import ProfileImg from "~/components/ProfileImg"
import React, { useState, useEffect } from 'react'

export default function Page() { 
  const { data } = api.user.getAll.useQuery()
  const [search, setSearch] = useState('')

  return (
    <div className="py-3">
      <div className="flex flex-row justify-center space-x-4 items-center pb-3"> 
        <h1 className="font-medium text-xl">Search Friends:</h1>
        <Input placeholder="Enter username" w={300} onChange={e => setSearch(e.target.value)}/>
      </div>

      <div className="flex flex-col justify-center space-y-2"> 
        {data?.filter(post => {
          const result = post.name
          if (search == '' || result == null) {
            return 
          } else if (result.toLowerCase().includes(search.toLowerCase())) {
            return post
          }
        }).map(post => 
          <div className="flex flex-row justify-center">
            <div className="flex flex-row justify-between basis-1/4 border-2 rounded-lg px-2 py-2 items-center">
              <div className="flex flex-row items-center">
                <ProfileImg src={post.image}/>
                <p className="font-mono text-xl">{post.name}</p>
              </div>
              <button className="btn-primary h-8">Add</button> 
            </div>
          </div> 
        )}
      </div>

    </div>
  )
}