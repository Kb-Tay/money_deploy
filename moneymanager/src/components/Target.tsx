import ProfileImg from "./ProfileImg";
import { ProfileProps } from "./ProfileImg";
import Link from "next/link";

export default function Target({src, name}: ProfileProps) {
  return ( 
    <div className="bg-slate-500 px-4 py-2 rounded-lg">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between border-b-2 pb-1 border-slate-600"> 
          <ProfileImg src={src} name={name}/>
          <Link href="/search" className="text-white px-2 bg-gray-900 rounded hover:bg-slate-600 pt-2"> 
            Contacts
          </Link> 
        </div>
        <p className="">Target this month:</p>
        <div className="flex flex-row justify-between"> 
          <span className="font-bold text-3xl">$100</span>  
          <button className="text-white px-2 bg-gray-900 rounded hover:bg-slate-600">Set Target</button>
        </div>
        
      </div>
      
    </div>
  )
}