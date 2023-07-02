import React, { useEffect, useState } from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FormikErrors,
  FieldProps,
} from 'formik';
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Email from "next-auth/providers/email";
import Payee from "./Payee";

type props = {
  spendingID: string,
  content?: string,}

function NewForm({spendingID, content}: props) {
  const session = useSession()
  const userId = session.data?.user.id as string
  const userName = session.data?.user.name as string
  const utils = api.useContext()

  const following = api.user.getFollowing.useQuery(userId).data
  const { data } = api.user.getFollowers.useQuery(userId)
  const followers = data == undefined ? [] : data
  const friends = following?.concat(followers)
  
  const createPayment = api.payment.create.useMutation({
    onSuccess: (input) => {
      utils.payment.invalidate()
      }
  })

  const PayeeList = friends == undefined ? [] : friends.filter(post => post.isFriend)

  interface MyFormValues {
    amount: number,
    resolved: boolean,
    userId: string,
    payeeId: string, 
    spendingId: string,
    note: string
  }

  const initialValues: MyFormValues = {
    amount: 0,
    resolved: false,
    userId: userId,
    payeeId: '',
    spendingId: spendingID, 
    note: content == undefined || null ? "" : content
  };

  const validateForm = (values: MyFormValues) => {
    const errors: FormikErrors<MyFormValues> = {};

    if (values.payeeId == "") {
      errors.payeeId = 'Must include Friend'
    }

    if (!values.amount) {
      errors.amount = "Must include Amount"
    }
  }

  return (
    <div>
       <Formik
         initialValues={initialValues}
         validate={validateForm}
         onSubmit={(values, actions) => {
            createPayment.mutate({
              userId: values.userId,
              payeeId: values.payeeId,
              amount: values.amount,
              resolved: values.resolved,
              spendingID: values.spendingId,
              note: values.note
            })

            console.log(values)
            
            actions.setSubmitting(false)
            actions.resetForm()
         }}
       >
         <Form>
          <div className="md:flex md:flex-row justify-center items-center px-5">
            <div className="md:flex md:flex-row md:space-x-3 md:space-y-0 space-y-2">
              <div className="space-x-2">
                <label htmlFor="payeeId">Add Payee:</label>
                <Field as="select" id="payeeId" name="payeeId" type="string" className="form-primary">
                <option value="" disabled>Select Friend</option>
                  {PayeeList.map((post, index) => (
                      <option key={index} value={`${post.followingId}`}>{post.followingName}</option>
                    ))}
                </Field>
              </div>
              <div className="space-x-2">
                <label htmlFor="amount">Add Amount:</label>
                <Field type="number" id="amount" name="amount" placeholder="Enter Amount" className="form-primary"/>
              </div>
              <div className="space-x-2">
                <label htmlFor="note">Payment Note:</label>
                <Field type="string" id="note" name="note" placeholder="Add note" className="form-primary"/>    
              </div>
            </div>
            <div className="md:pt-0 pt-2 pl-8">
              <button type="submit" className="btn-primary px-10">Add Payee</button>
            </div>
          </div>
         </Form>
       </Formik>
       
     </div>

  )
}


export default function PayeeForm({spendingID, content}: props) {
  const [close, setClose] = useState(false)
  const session = useSession()
  const userId = session.data?.user.id as string

  const { isLoading, data } = api.payment.getPayments.useQuery(userId)
  console.log(data)

  return (
    <div className="sm:px-10 py-4">
      <div className="bg-slate-500 rounded-lg pb-2">
        <div className="border-b-slate-600 border-b-2 mx-10 mb-2">
          <h2 className="flex font-bold text-2xl items-center justify-center">Payee Records</h2>
        </div>
        <div className="pb-2">
        {
              data?.collect == undefined || data?.collect.length == 0 ? <></> :
              <div className="border-b-slate-600 border-b-2 mx-10">
                  <div className="mb-2">
                  {
                  data?.collect.map((post, ind) => 
                    <ul key={ind} className="flex flex-cols justify-center space-x-10">
                      <div className="flex flex-cols space-x-1">
                        <p className="font-bold">Payee Name:</p> 
                        <Payee userId={post.payeeId}/>
                      </div>
                      <div className="flex flex-cols space-x-1">
                        <p className="font-bold">Amount:</p>
                        <p key={ind}>${post.amount}</p>
                      </div>
                      <div className="flex flex-cols space-x-1">
                        <p className="font-bold">Note:</p>
                        <p key={ind}>{post.note}</p>
                      </div>
                      <div className="flex flex-cols space-x-1"> 
                        <p className="font-bold">Status:</p>
                        {post.resolved ? <p>Resolved</p> : <p>Pending Payment</p>}
                      </div>
                    </ul>
                  )
                  }
                  </div> 
                </div>
            }
        </div> 
          {close ? <NewForm spendingID={spendingID} content={content}/> : <></>}
          <div className="flex justify-center space-x-2 pt-1">
            {
              close ? 
              <button className="btn-primary px-10" onClick={() => setClose(!close)}>
                Close
              </button> :
              <button className="btn-primary px-10" onClick={() => setClose(!close)}>
                Add New Payee
              </button> 
            }
          </div>  
      </div>
    </div>
  )

}