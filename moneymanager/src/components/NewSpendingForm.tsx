import { FormEvent, useState } from "react";
import { Button } from "./Button"
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export function NewSpendingForm() {
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return <Form/>
}

function Form() {
  const session = useSession()
  const [inputValue, setInputValue] = useState("")


  const createSpending = api.spending.create.useMutation({
    onSuccess: (newSpending) => {
      console.log(newSpending)
      setInputValue("")
    }
  })

  function handleSubmit(e : FormEvent) {
    e.preventDefault(); 

    createSpending.mutate({content: inputValue})
  }

  return(
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 borber-b px-4 py-2"
    >
      <div className="flex gap-4">
        <input className="flex-grow resize-none p-4 text-lg border-black"
        placeholder="New Spending" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      </div>
      <Button className="self-center">Make New Spending</Button>
    </form>
  )
}

