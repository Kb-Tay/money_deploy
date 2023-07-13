import { api } from "~/utils/api"
import Target from "~/components/Target"
import { useSession } from "next-auth/react"
import { SpendingData } from "~/components/SpendingData"
import Expense from "~/components/Expense"

export type Spending = { 
  id: string, 
  money: number, 
  category: string, 
  content: string, 
  createdAt: Date, 
  userId: string,
}

export type SpendingProps = {
  spendings?: Spending[]
  userId: string
}

export type TargetProps = {
  src?: string | null
  name?: string | null
  userId: string 
  expenses: number
}

export type ExpenseProps = {
  spendings?: Spending[]
  collect: number, 
  paid: number
}

export default function Page() {
  const session = useSession()
  const user = session.data?.user.id as string
  const { isLoading, isError, error, data } = api.spending.getAll.useQuery(user)
  const payments = api.payment.getPayments.useQuery(user) 

  const currMonth = new Date().getMonth() 
  const currYear = new Date().getFullYear()
  const monthlyTotal = data?.spending.filter(post => (post.createdAt.getMonth() == currMonth && post.createdAt.getFullYear() == currYear)).reduce((sum: number, post) => sum + post.money, 0) ?? 0
  const collect = payments.data?.collect.filter(post => post.validated && post.date.getFullYear() == currYear && post.date.getMonth() == currMonth).reduce((sum: number, post) => sum + post.amount, 0) ?? 0
  const paid = payments.data?.owe.filter(post => post.validated && post.date.getFullYear() == currYear && post.date.getMonth() == currMonth).reduce((sum: number, post) => sum + post.amount, 0) ?? 0

  const expenses = monthlyTotal - collect - paid

  if (session.status !== 'authenticated') return (<div>Not authenticated</div>); 

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="px-20 py-4">
      <div className="grid lg:grid-cols-2 gap-4 pb-3">
        <Target src={session.data.user.image} name={session.data.user.name} userId={user} expenses={expenses}/>
        <Expense spendings={data.spending} collect={collect} paid={paid}/> 
      </div>
        <SpendingData spendings={data.spending} userId={user}/>         
    </div>
  )

}