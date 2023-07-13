import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
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
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import { TargetComponentProps, TargetForm } from './Target';
import { useToast } from '@chakra-ui/react';


export default function TargetForm({expenses, id, bank, income, monthly}: TargetComponentProps ) {
  const session = useSession()
  const user = session.data?.user.id as string
  const utils = api.useContext()
  const updateTarget = api.target.editTarget.useMutation({
    onSuccess: () => {
      utils.target.invalidate()
      toast({
        title: "Successfully updated",
                status: 'success',
                isClosable: true,
      })
    }
  })
  
  const balance = monthly - expenses
  const bankBalance = bank - expenses 
  const toast = useToast()

  const initialValues: TargetForm = { 
    id: id,
    bank: bank,
    income: income,
    monthly: monthly
  }

  console.log(initialValues)

  const validateForm = (values: TargetForm) => {
    const errors: FormikErrors<TargetForm> = {}; //indicate that the form fields are optional 

    if (values.income < 0 ) {
      errors.income = 'Income cannot be negative'; 
    }

    if (values.monthly < 0) {
      errors.monthly = 'Monthly target cannot be negative'; 
    }
    
    return errors;
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row space-x-2">
            <p className="text-2xl font-bold">Monthly Balance:</p>
            {
              balance < 0 ? <p className="text-2xl text-red-900">- ${balance*-1}</p> 
                          : <p className="text-2xl">${balance}</p>
            }
        </div>
        <div className="flex flex-row space-x-1">
          <p className="font-medium">Bank Balance:</p>
          {
              bankBalance < 0 ? <p className="text-2xl text-red-900">- ${bankBalance*-1}</p> 
                          : <p className="text-2xl">${bankBalance}</p>
          }
        </div>
        <div className="flex flex-row space-x-1">
          <p className="font-medium">Monthly Income:</p>
          <p>${income}</p>
        </div>
      </div>
      
      <button className="text-white px-2 bg-gray-900 rounded hover:bg-slate-600 h-10" onClick={onOpen}>Set Target</button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={(values, actions) => {
              updateTarget.mutate({
                id: values.id,
                bank: values.bank,
                income: values.income,
                monthly: values.monthly
              })

              actions.setSubmitting(false);
            }}
          >
          <Form>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 border-b-2">
                  <label className="font-medium pr-8">Bank Balance:</label>
                  <div className="flex flex-row">
                    <p className="text-2xl font-bold">$</p>
                    <Field id="bank" name="bank" type="number" className="form-target"/>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 border-b-2">
                  <label className="font-medium pr-8">Monthly Income:</label> 
                  <div className="flex flex-row">
                    <p className="text-2xl font-bold">$</p>
                    <Field id="income" name="income" type="number" className="form-target"/>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 border-b-2">
                  <label className="font-medium pr-8">Monthly Target:</label>
                  <div className="flex flex-row">
                    <p className="text-2xl font-bold">$</p>
                    <Field id="monthly" name="monthly" type="number" className="form-target"/>
                  </div>
                </div>
                
              </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' type="submit">Edit</Button>
          </ModalFooter>
          </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}

