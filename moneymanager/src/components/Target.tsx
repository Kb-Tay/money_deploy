import ProfileImg from "./ProfileImg";
import Link from "next/link";
import { TargetProps } from "~/pages/profile";
import { api } from "~/utils/api";
import Payee from "./Payee";

export default function Target({src, name, spendings, userId}: TargetProps) {
  const { isLoading, data } = api.payment.getPayments.useQuery(userId)

  return ( 
    <div className="bg-slate-500 px-4 py-2 rounded-lg">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between border-b-2 pb-1 border-slate-600"> 
          <ProfileImg src={src} name={name}/>
          <Link href="/search" className="text-white px-2 bg-gray-900 rounded hover:bg-slate-600 pt-2"> 
            Contacts
          </Link> 
        </div>
        <p className="">Target this month:</p>
        <div className="flex flex-row justify-between"> 
          <span className="font-bold text-3xl">$100</span>  
          <button className="text-white px-2 bg-gray-900 rounded hover:bg-slate-600">Set Target</button>
        </div>
        
        <div>
          <h2>Unresolved Payment</h2>
            {
              data?.owe.map(post => 
                <div className="flex flex-rows justify-between">
                  <Payee userId={post.userId}/>
                  <ul>{post.amount}</ul>  
                  
                </div>
              )
            }
        </div>
          <div> 
            <h2 className="font-bold">Payment to collect</h2>
            <div className="px-2 rounded-md bg-slate-500 space-y-2">
              {
                data?.collect.map((post, ind) => 
                  <ul key={ind} className="flex flex-cols justify-between">
                    <div className="flex flex-cols space-x-2">
                      <p>{ind + 1}.</p>
                      <Payee userId={post.userId}/>
                      <div>${post.amount}</div>
                      
                    </div>
                    <div>{post.note}</div>
                    <button>Resolve</button>
                  </ul>
                )
              }
            </div>
              
          </div>
      </div>
    </div>
  )
}