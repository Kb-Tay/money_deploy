import { api } from "~/utils/api"

export default function Payee(props: {userId: string}) {
  const { data } = api.user.getUserName.useQuery(props.userId)

  return (
    <>
      <div>{data}</div>
    </>
  )

}