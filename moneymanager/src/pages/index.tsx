import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Link from "next/link";
import { NewSpendingForm } from "~/components/NewSpendingForm";

const Home: NextPage = () => {
  const session = useSession()
  const user = session.data?.user

  return (
    <>
    <div>
      <Link href='/'>Home</Link>
    </div>
    {user == null ? (
      <li>
        <button onClick={() => void signIn()}>Log In</button> 
      </li> 
    ) : (
      <li>
        <button onClick={() => void signOut()}>Log Out</button>
      </li>
    )}
    <NewSpendingForm />
    </>
  );
};

export default Home;

