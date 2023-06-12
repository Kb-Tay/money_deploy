import { api } from "~/utils/api";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FormikErrors
} from 'formik';
import React from 'react'
import { GetStaticPaths, GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { GetStaticProps } from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import Link from "next/link";


const SpendingPage: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({ id }) => { 
  const { isLoading, data } = api.spending.getOne.useQuery({ userid: id })

  const updateSpending = api.spending.edit.useMutation({
    onSuccess: (editSpending) => { console.log(editSpending)}
  })

  if (isLoading) {
    return <div> Loading... </div>
  }

  const initialValue = {
    money: data?.money,
    category: data?.category,
    createdAt: data?.createdAt.toLocaleDateString(),
    content: data?.content
  }

  interface MyFormValues  {
    money: number | undefined,
    category: string | undefined,
    createdAt: string | undefined,
    content: string | undefined
  }

  const validateForm = (values: MyFormValues) => { 
    const errors: FormikErrors<MyFormValues> = {};

    if (!values.money) {
      errors.money = 'Amount is Required'; 
    } 

    if (!values.category) {
      errors.category = 'Please Select a Category'; 
    }

    if (!values.createdAt) {
      errors.createdAt = 'Please input a Date'; 
    }
    
    return errors;
  }

  console.log(data?.createdAt)

  const category = ["Food & Drinks", "Shopping", "Transporation", "Financial Expenses"]

  return (
    <Formik initialValues={initialValue} 
      validate={validateForm}
      onSubmit={(values, actions) => {

        updateSpending.mutate({
          userid: id, 
          money: values.money,
          category: values.category,
          content: values.content,
          date: values.createdAt
        })
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}>
        {props => 
      <Form>
        <div className="sm:px-10 py-4">
          <div className="flex flex-col bg-slate-500 rounded-lg">
            <h2 className="flex font-bold text-2xl items-center justify-center">Edit Spending</h2>
            <div className="grid grid-cols-3 px-12 mb-2 space-x-2"> 
              <label htmlFor="money" className="flex font-medium text-xl items-center">Money:</label>  
              <Field type="number" name="money"
                className="bg-gray-300 border-gray-300 rounded-lg block w-full col-span-2 h-8"/>
            </div>
            <div className="grid grid-cols-3 grid-flow-col px-12 mb-2 space-x-2"> 
              <label htmlFor="category" className="flex font-medium text-xl items-center">Category:</label>  
              <Field as="select" type="string" name="category"
                className="bg-gray-300 border-gray-300 rounded-lg block w-full col-span-2 h-8">
                  <option value={props.values.category}>{props.values.category}</option>
                  {category.filter(cat => cat !== data?.category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </Field>  
            </div>
            <div className="grid grid-cols-3 px-12 mb-2 space-x-2"> 
              <div className="flex flex-row space-x-2">
                <label htmlFor="createdAt" className="flex font-medium text-xl items-center">Current Date:</label> 
                <span className="font-bold text-xl">{props.values.createdAt}</span> 
              </div>
              
              <Field type="date" name="createdAt"
                className="bg-gray-300 border-gray-300 rounded-lg h-8"/>
            </div>
            <div className="grid grid-cols-3 px-12 mb-2 space-x-2"> 
              <label htmlFor="content" className="flex font-medium text-xl items-center">Content:</label>  
              <Field type="string" name="content"
                className="bg-gray-300 border-gray-300 rounded-lg block w-full col-span-2 h-8"/>
            </div>
            <div className="flex justify-center items'center pb-2 space-x-3">
                <button className="rounded bg-gray-700 px-2 pxy-2 text-white font-medium hover:bg-gray-600" type="submit">Submit</button>
              <Link href='/profile'>
                <button className="rounded bg-gray-700 px-2 pxy-2 text-white font-medium hover:bg-gray-600">Back</button>
              </Link>
            </div>
          </div>

        </div>
      </Form>  
      }
    </Formik>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export async function getStaticProps(
  context:GetStaticPropsContext<{ id: string }>
) {
    const id = context.params?.id 

    if ( id == null ) {
      return {
        redirect: {
          destination: "/",
        }
      }
    }

    //exports the context 
    const ssg = ssgHelper(); 
    await ssg.spending.getUnique.prefetch({ userid: id })

    return {
      props: {
        trpcState: ssg.dehydrate(),
        id,
      }
    }
}



export default SpendingPage;





// interface FormValue {
//   money?: number, 
//   category?: string, 
//   content?: string, 
//   createdAt?: Date, 
// }

// export default function Page({ params }: { params: { id: string }}) {
//   const router = useRouter() 
//   const id = router.query.id //not sure how get params such that id is only type of string
//   const initSpending = api.spending.getOne.useQuery( {userid: id}) 
   
//     const initialValue: FormValue = {
//       money: initSpending.data?.money,
//       category: initSpending.data?.category,
//       content: initSpending.data?.content,
//       createdAt: initSpending.data?.createdAt,
//   }
    
//     return (
//       <div className="px-4 py-4">
//         <h2 className="flex justify-center text-2xl font-bold">Edit Spending</h2>
//         <div>
//           <Formik
//             initialValues={initialValue}
//             onSubmit={(values, actions) => {
//               console.log({ values, actions });
//               alert(JSON.stringify(values, null, 2));
//               actions.setSubmitting(false);
//             }}>
//               { props => (
//                 <form onSubmit={props.handleSubmit}>
//                   <div>
//                     <h2>Amount:</h2>
//                     <input type="number" onChange={props.handleChange} className="border-2" name="money" value={props.values.money}/>
//                   </div>
//                 </form>
//               )   
//               }
//           </Formik>
//         </div>
//       </div>
//     )  
//   }