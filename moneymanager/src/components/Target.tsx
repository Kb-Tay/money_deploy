import ProfileImg from "./ProfileImg";
import Link from "next/link";
import { TargetProps } from "~/pages/profile";
import { api } from "~/utils/api";
import Payee from "./Payee";
import TargetForm from "./TargetForm";
import { create } from "domain";
import { useContext } from "react";

export type TargetForm = {
  id: string,
  bank: number,
  income: number,
  monthly: number
}

export type TargetComponentProps = {
  expenses: number,
  id: string,
  bank: number,
  income: number,
  monthly: number
}

export default function Target({src, name, userId, expenses}: TargetProps) {
  const utils = api.useContext()
  const { isLoading, data } = api.payment.getPayments.useQuery(userId)
  const createTarget = api.target.createTarget.useMutation({
    onSuccess: () => {
      utils.target.invalidate()
    }
  })
  const target = api.target.getTarget.useQuery()

  console.log(target.data)

  const handleTarget = () => {
    if (target.data?.length == 0 ) {
      createTarget.mutate()
    }
  }

  const resolvePayment = api.payment.resolve.useMutation({
    onSuccess: (editSpending) => { 
      utils.payment.invalidate() // find out how to invalidate 
    }
  })

  const validatePayment = api.payment.validate.useMutation({
    onSuccess: (editSpending) => { 
      utils.payment.invalidate() // find out how to invalidate 
    }
  })

  const handleResolve = (id: string) => {
    resolvePayment.mutate(id)
  }

  const handleValidate = (id: string) => {
    validatePayment.mutate(id)
  }

  return ( 
    <div className="bg-slate-500 px-4 py-2 rounded-lg">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between border-b-2 pb-1 border-slate-600"> 
          <ProfileImg src={src} name={name}/>
          <Link href="/search" className="text-white px-2 bg-gray-900 rounded hover:bg-slate-600 pt-2"> 
            Contacts
          </Link> 
        </div>

        <div className="flex flex-row justify-between border-b-2 border-slate-600 py-2"> 
          {
            target.data == undefined || target.data.length == 0 ? <button className="text-white px-2 bg-gray-900 rounded hover:bg-slate-600" onClick={handleTarget}>Create new Target Profile</button>
            : target.data.map((post, ind) => 
              <TargetForm key={ind} expenses={expenses} id={post.id} bank={post.bank} income={post.income} monthly={post.monthly}/>)
          }
        </div>
        
        <div>
          <h2 className="font-bold">Unresolved Payments</h2>
              {
                data?.owe.filter(post => !post.resolved)
                .map((post, ind) => 
                    <ul key={ind} className="lg:grid lg:grid-cols-5">
                    <div className="flex flex-cols space-x-2 pr-2">
                      <p>{ind + 1}.</p>
                      <Payee userId={post.userId}/>                      
                    </div>
                    <div>${post.amount}</div>
                    <div>{post.date.getDate()}/{post.date.getMonth()+1}</div>
                    <div className="pr-2">{post.note}</div>
                    <div className="lg:flex lg:justify-center">
                      <button className="hover:text-red-400" onClick={() => handleResolve(post.id)}>Resolve</button>
                    </div>
                  </ul>
                )
              }
        </div>
          <div> 
            <h2 className="font-bold">Payment to collect</h2>
            <div className="rounded-md bg-slate-500 space-y-1">
              {
                data?.collect.filter(post => !post.validated)
                .map((post, ind) => 
                    <ul key={ind} className="lg:grid lg:grid-cols-5">
                    <div className="flex flex-cols space-x-2 pr-2">
                      <p>{ind + 1}.</p>
                      <Payee userId={post.payeeId}/>                      
                    </div>
                    <div>${post.amount}</div>
                    <div>{post.date.getDate()}/{post.date.getMonth()+1}</div>
                    <div className="pr-2">{post.note}</div>
                    <div className="lg:flex lg:justify-center">
                      { post.resolved 
                        ? <button className="hover:text-red-400" onClick={() => handleValidate(post.id)}>Validate</button> 
                        : <div>Pending...</div>}
                    </div>
                  </ul>
                )
              }
            </div>
              
          </div>
      </div>
    </div>
  )
}