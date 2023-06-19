import React, { useEffect, useState } from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Email from "next-auth/providers/email";

type props = {
  spendingID: string,
}

function NewForm({spendingID}: props) {
  const session = useSession()
  const user = session.data?.user.id as string
  const createPayment = api.payment.create.useMutation({
    onSuccess: (newSpending) => {
      console.log(newSpending)
    }
  })

  interface MyFormValues {
    email: string,
    amount: number,
    resolved: boolean,
    userId: string,
    spendingId: string,
  }

  const initialValues: MyFormValues = {
    email: '',
    amount: 0,
    resolved: false,
    userId: user,
    spendingId: spendingID, 
  };

  return (
    <div>
       <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {

          try {
            createPayment.mutate({
              email: values.email,
              amount: values.amount,
              resolved: values.resolved,
              spendingID: values.spendingId,
            })
            
          } catch(e) {
            alert("Invalid email given")
            console.log(e)
          }      
         }}
       >
         <Form>
            <label htmlFor="email">Add Payee:</label>
            <Field id="email" name="email" placeholder="Enter Payee's Email" className="focus:outline-none focus:border-2 focus:border-pink-500"/>
            <label htmlFor="amount">Add Amount:</label>
            <Field type="number" id="amount" name="amount" placeholder="Enter Amount" className="focus:outline-none focus:border-2 focus:border-pink-500"/>
            <button type="submit" className="btn-primary">Submit</button>
         </Form>
       </Formik>
       
     </div>

  )
}

export default function PayeeForm({spendingID}: props) {
  const [close, setClose] = useState(false)

  return (
    <div className="sm:px-10 py-4">
      <div className="bg-slate-500 rounded-lg pb-2">
        <h2 className="flex font-bold text-2xl items-center justify-center">Payee Information</h2>
          {close ? <NewForm spendingID={spendingID}/> : <></>}
          <div className="flex justify-center space-x-2">
            <button className="btn-primary" onClick={() => setClose(!close)}>Add</button> 
          </div>
      </div>
    </div>
  )

}