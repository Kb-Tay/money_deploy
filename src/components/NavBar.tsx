import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai'

export default function NavBar() {
  const session = useSession()
  const user = session.data?.user
  
  const [active, setActive] = useState(0)
  const [drop, setDrop] = useState(false)
  
  const buttonStyle = { unfocused: "bg-gray-900",   focused: "bg-gray-500"}

  return(
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="sm:hidden pl-2">
            <AiOutlineMenu className="h-8 w-8 text-white" onClick={() => setDrop(!drop)}/>
            { 
              drop ? user == null 
                ? <></>
                :
                <div className="absolute left-0 top-14 z-10 mt-2 w-40 divide-y divide-slate-400 rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xl">
                  <div className="flex flex-col pl-2 space-y-1">
                    <Link href="/">
                      <button className={`${active == 0 ? "font-bold text-slate-400" : "text-white"}`} onClick={() => {setDrop(false); setActive(0)}}>New Spending</button>
                    </Link>
                    <Link href="/profile">
                      <button className={`${active == 1 ? "font-bold text-slate-400" : "text-white"}`} onClick={() => {setDrop(false); setActive(1)}}>Profile</button>
                    </Link>
                    <Link href="/search">
                      <button className={`${active == 2 ? "font-bold text-slate-400" : "text-white"}`} onClick={() => {setDrop(false); setActive(2)}}>Search Friends</button>
                    </Link>
                  </div>
                  <div className="pl-2">
                    <Link href='/'>
                      <button className='p1-2 text-white' onClick={() => void signOut({callbackUrl : "/"})}>Sign Out</button> 
                    </Link> 
                  </div>
                </div> 
                : <></>
            }
          </div>

          <div className="hidden sm:ml-6 sm:block">
            <div className="flex flex-row space-x-3 ">
              { user == null ? (
              <Link href="/">
                <button className={`hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium ${buttonStyle.unfocused}`}>
                  Home
                </button>
              </Link>) : 
              (<Link href="/">
                <button className={`hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium 
                  ${active == 0 ? buttonStyle.focused : buttonStyle.unfocused}`}
                  onClick={() => setActive(0)}>
                    New Spending
                </button>
              </Link>)}
              { user == null ? <></> : (
              <Link href="/profile">
              <button className={`hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium 
                  ${active == 1 ? buttonStyle.focused : buttonStyle.unfocused}`}
                  onClick={() => setActive(1)}>
                  Profile
              </button>
              </Link>
              )}
              { user == null ? <></> : (
                <Link href="/search">
                <button className={`hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium 
                    ${active == 2 ? buttonStyle.focused : buttonStyle.unfocused}`}
                    onClick={() => setActive(2)}>
                    Search Friends
                </button>
                </Link>
              )}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:block justify-end">
            <div className="flex flex-row space-x-3 ">
              {user == null ? (
                <Link href='/'>
                  <button className='bg-gray-900 hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium' onClick={() => void signIn("google",{callbackUrl: "/"})}>Sign In</button> 
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