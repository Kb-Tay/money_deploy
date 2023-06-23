import { Follows, followsProps } from "~/pages/search"

export default function PendingList(props: followsProps) {

  return (
    <>      
      <h1 className="font-medium text-xl py-2">Pending Request:</h1>
        <div className="flex flex-cols">
          {props.follows?.filter(post => !post.isFriend).map(post => <div>{post.followingName}</div>)}
        </div>
    </>
  )
}