"use client"

import CatMainPage from '@/components/CatMainPage';
import Footer from '@/components/Footer';
import Nav from "@/components/Nav";
import PawMain from '@/components/PawMain';

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
        <div className='flex  gap-10 flex-col justify-center items-center h-3/4'>
          <h1 className='gray_gradient text-9xl font-merrySans'>LINGUA CAT</h1>
          <h2 className='text-gray-700 text-xl font-semibold font-merrySans'>Create your own Dictionary. And don't forget to feed the Cat.</h2> 
          </div>
     </div>
     <CatMainPage/>
     <PawMain/>
     </div>
    <Footer/>
    </>}
    </>
   
  )
}
export const revalidate = 0;
export default Home;