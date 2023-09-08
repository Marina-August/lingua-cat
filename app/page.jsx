"use client"

import Footer from '@/components/Footer';
import Nav from "@/components/Nav";
import { useSession } from 'next-auth/react';

const Home=()=>{
 const {data: session} = useSession();

  return(
    <>
    {!session?.user && 
    <>
     <div className="allButFooter">
        <div>
        <Nav/>
        <div>Create your own Dictionary. And don't forget to feed the Cat. </div>
     </div>
     </div>
    <Footer/>
    </>}
    </>
   
  )
}
export const revalidate = 0;
export default Home;