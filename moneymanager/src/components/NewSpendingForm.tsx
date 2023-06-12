import { ChangeEvent, useState } from "react";
import { Button } from "./Button"
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FormikErrors,
  ErrorMessage,
  useFormik,
} from 'formik';


export function NewSpendingForm() {
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return (
    <div>
      <SpendingForm/> 
    </div>
  )
}

interface MyFormValues {
  Amount: number; 
  Category: string;
  Date: string; 
  Content: string;
}

  const validateForm = (values: MyFormValues) => {
    const errors: FormikErrors<MyFormValues> = {}; //indicate that the form fields are optional 

    if (!values.Amount) {
      errors.Amount = 'Amount is Required'; 
    } 

    if (!values.Category) {
      errors.Category = 'Please Select a Category'; 
    }

    if (!values.Date) {
      errors.Date = 'Please input a Date'; 
    }
    
    return errors;
  }

function SpendingForm() {

  const createSpending = api.spending.create.useMutation({
    onSuccess: (newSpending) => {
      console.log(newSpending)
    }
  })

  const initialValues: MyFormValues = {
    Amount: 0,
    Category: '',
    Date: '',
    Content: ''
  }

  return( 
    <> 
      <Formik
         initialValues={initialValues}
         validate={validateForm}
         onSubmit={(values, actions) => {

          createSpending.mutate({
            money: values.Amount,
            category: values.Category, 
            content: values.Content,
            date: values.Date,
          });

           console.log({ values, actions });
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }}
       >
         <Form className="w-full mb-6">
          <div className="flex flex-col mx-10 space-y-1 bg-slate-100 rounded">

              <h2 className="text-4xl font-extrabold">Creating New Spending</h2>
                <label htmlFor="Amount">Amount Spent</label>
                <Field id="Amount" name="Amount" placeholder="Input Amount" type="number" 
                className="bg-gray-200 border-2 border-gray-200 rounded w-full px-2 focus:outline-none focus:bg-white focus:border-purple-300"/>
                <ErrorMessage name="Amount" component="div" className="text-red-600 font-bold"/> 
                
                <label htmlFor="Category">Select Category</label>
                <Field as="select" id="Category" name="Category" type="string"
                className="bg-gray-200 border-2 border-gray-200 rounded w-full px-2 focus:outline-none focus:bg-white focus:border-purple-300">
                <option value="" disabled>Select a Category</option>
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Shopping">Shopping</option>
                <option value="Transporation">Transportation</option>
                <option value="Financial Expenses">Financial Expenses</option>
                </Field> 
                <ErrorMessage name="Category" component="div" className="text-red-600 font-bold"/> 

                <label htmlFor="Date">Date</label>
                <Field id="Date" name="Date" type="Date" className="bg-gray-200 border-2 border-gray-200 rounded w-full px-2 focus:outline-none focus:bg-white focus:border-purple-300"/>
                <ErrorMessage name="Date" component="div" className="text-red-600 font-bold"/> 

                <label htmlFor="Content">Notes:</label>
                <Field id="Content" name="Content" className="bg-gray-200 border-2 border-gray-200 rounded w-full px-2 focus:outline-none focus:bg-white focus:border-purple-300"/>

                <Button type="submit">Submit</Button>
          </div>
         </Form>
       </Formik>
    </>
  )
}



// function SpendingForm() {
//   return(
//     <form className="w-full max-w-sm">
//       <div className="md:flex md:items-center mb-6">
//         <div className="md:w-1/2">
//           <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
//             Amount Spent: 
//           </label>
//         </div>
//         <div className="md:w-1/2">
//           <input className="bg-gray-200 border-2 border-gray-200 rounded w-full px-2 focus:outline-none focus:bg-white focus:border-purple-300" type="text"/>

//         </div>
//       </div>
//     </form>
//   )
// }

// function Form() {
//   const [inputValue, setInputValue] = useState("")


//   const createSpending = api.spending.create.useMutation({
//     onSuccess: (newSpending) => {
//       console.log(newSpending)
//       setInputValue("")
//     }
//   })

//   function handleSubmit(e : FormEvent) {
//     e.preventDefault(); 

//     createSpending.mutate({content: inputValue})
//   }

//   return(
//     <form 
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-2 borber-b px-4 py-2"
//     >
//       <div className="flex gap-4">
//         <input className="flex-grow resize-none p-4 text-lg border-black"
//         placeholder="New Spending" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
//       </div>
//       <Button className="self-center">Make New Spending</Button>
//     </form>
//   )
// }

