import { SpendingProps } from "~/pages/profile"
import { api } from "~/utils/api"
import ProfileImg from "./ProfileImg"
import Payee from "./Payee"

export type Payment = {
  amount: number,
  resolved: boolean,
  userId: string,
  payeeId: string, 
}

export default function Expense({spendings, userId}: SpendingProps) {
  const currMonth = new Date().getMonth() //not sure if this refreshes when 
  const currYear = new Date().getFullYear()

  const { isLoading, data } = api.payment.getPayments.useQuery(userId)
  
  return(
    <div className="bg-slate-500 px-4 py-2 rounded-lg">
          <p className="border-solid border-slate-600 border-b-2">Expenses Monthly:</p>
          <div className="flex justify-between">
            <div> 
              <span>Total: </span>
              <span className="font-bold text-2xl">${spendings?.filter(post => (post.createdAt.getMonth() == currMonth 
              && post.createdAt.getFullYear() == currYear)).reduce((sum: number, post) => sum + post.money, 0)}</span>
            </div>
            <div className='items-cent'>
              <span>{currMonth + 1}/{currYear}</span>
            </div>
          </div>
    </div>
  )
}