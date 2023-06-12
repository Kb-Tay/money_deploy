import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function NavBar() {
  const session = useSession()
  const user = session.data?.user
  
  //ref for different buttons 
  const [active, setActive] = useState(0)
  
  // styling for being focused
  const buttonStyle = { unfocused: "bg-gray-900",   focused: "bg-gray-500"}

  return(
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="hidden sm:ml-6 sm:block">
            <div className="flex flex-row space-x-3 ">
              <Link href="/">
                <button className={`hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium 
                  ${active == 0 ? buttonStyle.focused : buttonStyle.unfocused}`}
                  onClick={() => setActive(0)}>
                  Home
                </button>
              </Link>
              { user == null ? (
              <Link href="/about">
                <button className={`hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium 
                    ${active == 1 ? buttonStyle.focused : buttonStyle.unfocused}`}
                    onClick={() => setActive(1)}>
                    About
                </button>
              </Link>) : (
              <Link href="/profile">
              <button className={`hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium 
                  ${active == 1 ? buttonStyle.focused : buttonStyle.unfocused}`}
                  onClick={() => setActive(1)}>
                  Profile
              </button>
              </Link>
              )}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:block justify-end">
            <div className="flex flex-row space-x-3 ">
              {user == null ? (
                <Link href='/'>
                  <button className='bg-gray-900 hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium' onClick={() => void signIn()}>Sign In</button> 
                </Link>
              ) : (
                <Link href='/'>
                  <button className='bg-gray-900 hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium' onClick={() => void signOut({callbackUrl : "/"})}>Sign Out</button> 
                </Link>  
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}