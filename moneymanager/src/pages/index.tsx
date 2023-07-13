import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Link from "next/link";
import { NewSpendingForm } from "~/components/NewSpendingForm";
import NavBar from "~/components/NavBar";
import About from "./about";
import { useRouter } from "next/router";
import HomePage from "~/components/HomePage";


const Home: NextPage = () => {
  const session = useSession()
  const user = session.data?.user
  const router = useRouter();

  return (
    <>
    <div>
      { user == null ? 
      <HomePage/> : 
      <NewSpendingForm/>}
    </div>
    
    </>
  );
};

export default Home; 


