import { Spending, SpendingProps } from "~/pages/profile"
import { AiOutlineShopping } from 'react-icons/ai' 
import { IoFastFoodOutline } from 'react-icons/io5'
import { MdEmojiTransportation } from 'react-icons/md'
import { CiMoneyCheck1 } from 'react-icons/ci' 
import { FaRegTrashAlt } from 'react-icons/fa'
import { RxPencil2 } from 'react-icons/rx'
import Link from 'next/link'
import { Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'


export function SpendingData({spendings}: SpendingProps) {
  const [filter, setFilter] = useState('Month') 
  const [data, setData] = useState<Spending[]>([]) 

  const currDate = new Date()
  const currMonth = currDate.getMonth()
  const currYear = currDate.getFullYear() 
  
  useEffect(() => {
    if(spendings != undefined) {
      if (filter == 'Month') { 
        setData(spendings.filter(post => post.createdAt.getMonth() == currMonth 
        && post.createdAt.getFullYear() == currYear))
      } else if (filter == 'Year') {
        setData(spendings.filter(post => post.createdAt.getFullYear() == currYear))
      } else {
        setData(spendings)
      }
    }

    console.log(filter)
  }, [filter])
  
  return (
    <div className="relative bg-slate-500 w-full px-4 py-2 rounded-lg border">  
      <div className="flex justify-between font-light border-slate-600 border-b-2">
        <p className="text-xl">Recent Transactions:</p>
        <Select onChange={e => setFilter(e.target.value)} borderColor={"gray.700"} width={40} height={8} paddingBottom={2}>
          <option value='Month'>Recent Month</option>
          <option value='Year'>Recent Year</option>
          <option value='All'>All Transactions</option>
        </Select>
        
      </div>
      <div className='py-2'>
        {data !== null ? data?.map(post => 

        <div key={post.id} className='grid grid-cols-5 pb-2'>
          <div className="px-4">
            { post.category == "Food & Drinks" 
              ? <IoFastFoodOutline className='w-10 h-10'/>
              : post.category == "Shopping"
              ? <AiOutlineShopping className='w-10 h-10'/>
              : post.category == "Transporation"
              ? <MdEmojiTransportation className='w-10 h-10'/>
              : <CiMoneyCheck1 className='w-10 h-10'/>
            }
          </div>

          <div>
              <p className='text-slate-800 font-bold'>Amount:</p>
              <p >${post.money}</p>
          </div>

          <div> 
            <p className='text-slate-800 font-bold'>Date:</p>
            <p>{post.createdAt.toLocaleDateString()}</p>
          </div>

          <div>
            <p className='text-slate-800 font-bold'>Note:</p>
            <p>{post.content == "" ? "No record" : post.content}</p>
          </div>

          <div className="flex flex-row items-center justify-start space-x-8">
            <Link href={`/profile/${post.id}`}> 
              <RxPencil2 className="hover:text-white hover:cursor-pointer w-8 h-8"/> 
            </Link>
            
              <FaRegTrashAlt className="hover:text-red-700 hover:cursor-pointer w-8 h-8"/>
          </div>

        </div>
        ) : 
        <p>No current spending</p>}
      </div>
      
    </div>
)
}
