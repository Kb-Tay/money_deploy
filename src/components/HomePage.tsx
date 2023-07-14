import { BsClipboard2Check } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import { VscGraphLine } from 'react-icons/vsc'
import { signIn } from 'next-auth/react'

export default function HomePage ()  { 
  return ( 
    <section className=""> 
    <div className="h-screen w-screen sm:grid sm:grid-cols-2">
      <div className="flex flex-col items-center bg-gray-300 pt-10">      
          <img className="h-1/2 width-10 object-cover object-center" alt="hero" src='../../hero.png'/>
        <h1 className="text-5xl font-extrabold text-slate-700 pb-5">Money Manager App</h1>
        <h2 className="text-xl font-medium text-slate-600">Manage your finances with </h2>
        <h2 className="text-xl font-medium text-slate-600">and track spending among friends</h2>
      </div>
      <div className=""> 
        <h2 className="flex justify-center text-3xl font-medium sm:pt-20">Our Features</h2>
        
        <div className="flex flex-col items-center h-2/3 sm:px-10 pt-10 space-y-4">
          <div className="card-primary">
            <div className="flex items-center justify-center border-r-2 border-slate-300">
              <BsClipboard2Check className="h-10 w-10"/>
            </div>
            <div className="sm:col-span-3 flex px-2 items-center">
              <p className="sm:text-xl">Easy forms to track daily expenses</p>
            </div>
          </div>

          <div className="card-primary">
            <div className="flex items-center justify-center border-r-2 border-slate-300">
              <FaUserFriends className="h-10 w-10"/>
            </div>
            <div className="sm:col-span-3 px-2 items-center">
              <p className="sm:text-xl">Split bills among friends and track payments</p>
            </div>
          </div>

          <div className="card-primary">
            <div className="flex items-center justify-center border-r-2 border-slate-300">
              <VscGraphLine className="h-10 w-10"/>
            </div>
            <div className="sm:col-span-3 px-2 items-center">
              <p className="sm:text-xl">Simple data analysis for monthly expenditures</p>
            </div> 
          </div>

          <div className="flex flex-col">
            <p className="font-light text-blue-700">Create an Account now:</p>
            <button className='bg-gray-900 hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium' onClick={() => void signIn("google",{callbackUrl: "/"})}>Sign Up</button> 
          </div>
        </div>

      </div>
      </div>
    </section>
  )
}