import NavBar from "./NavBar";
import type { ReactElement } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main> 
    </>
  ) 
}