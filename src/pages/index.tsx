import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { NewSpendingForm } from "~/components/NewSpendingForm";
import HomePage from "~/components/HomePage";


const Home: NextPage = () => {
  const session = useSession()
  const user = session.data?.user

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


