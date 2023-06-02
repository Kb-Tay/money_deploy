import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useState } from 'react'; 

type NavButtonProps = {
  focus: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

// separating client side components from server side nav bar 
export function NavButton({ 
  focus = false, 
  className="",
  ...props
} : NavButtonProps) {
  const [focused, setFocused] = useState(false)
  const color = focused ? "" : ""
  
  return ( 
    <button
      className={`bg-gray-900 hover:bg-slate-500 text-white rounded-md px-3 py-2 text-sm font-medium ${focus}`}
      onClick={() => setFocused(!focused)}
      {...props}> 
    </button>
  )
}