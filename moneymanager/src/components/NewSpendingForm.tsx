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
import { useTabList, useToast } from "@chakra-ui/react";


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
  const utils = api.useContext(); 

  const createSpending = api.spending.create.useMutation({
    onSuccess: () => {
      utils.spending.invalidate()
    }
  })

  const toast = useToast()

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
          toast({
            title: 'Success',
            description: 'New spending created',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          actions.resetForm()
          actions.setSubmitting(false);
         }}
       >
         <Form className="md:px-20 pt-4">
          <div className="flex flex-col justify-center md:mx-10 py-3 space-y-2 bg-slate-500 rounded-lg">

              <h2 className="flex justify-center text-4xl font-extrabold">Add a Expense</h2>

                <div className="flex justify-center space-x-4 py-3">
                  <label className="font-medium text-2xl" htmlFor="Amount">Amount Spent:</label>
                  <div className="flex flex-row bg-slate-700 bg-opacity-50 py-2 px-1 ">
                    <div className="justify-start block items-center rounded-lg bg-slate-700 text-white text-medium px-2">SGD</div>
                    <Field id="Amount" name="Amount" type="number" 
                    className="appearance-none focus:outline-none bg-transparent font-medium text-xl text-center"/>
                  </div>
                </div>
                <ErrorMessage name="Amount" component="div" className="error"/>


                <div className="justify-center">
                  <div className="grid grid-cols-4">  
                    <div></div>
                    <label className="flex justify-center font-medium"htmlFor="Category">Category:</label>
                    <Field as="select" id="Category" name="Category" type="string"
                    className="form-primary w-2/3">
                    <option value="" disabled>Select a Category</option>
                    <option value="Food & Drinks">Food & Drinks</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Transporation">Transportation</option>
                    <option value="Financial Expenses">Financial Expenses</option>
                  </Field> 

                  </div>
                  
                </div>                
                <ErrorMessage name="Category" component="div" className="error"/> 

                <div className="justify-center">
                  <div className="grid grid-cols-4">
                    <div>
                    </div>
                    <label className="flex justify-center font-medium pr-8" htmlFor="Date">Date:</label>
                    <Field id="Date" name="Date" type="Date" className="form-primary w-2/3"/>
                  </div>
                </div>
                
                <ErrorMessage name="Date" component="div" className="error"/> 

                <div className="justify-center">
                  <div className="grid grid-cols-4">
                  <div></div>
                  <label className="flex justify-center font-medium pr-6" htmlFor="Content">Notes:</label>
                  <div>
                    <Field id="Content" name="Content" className="form-primary w-2/3"/>
                  </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="w-1/2 btn-primary" type="submit">Submit</button>
                </div>
              </div>
                
         </Form>
       </Formik>
    </>
  )
}
