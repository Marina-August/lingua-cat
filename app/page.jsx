"use client"

import CatMainPage from '@/components/CatMainPage';
import Nav from "@/components/Nav";
import PawMain from '@/components/PawMain';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import MyFooter from '@/components/MyFooter';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Home=()=>{
 const {data: session} = useSession();
 const[isVisible, setIsVisible] = useState(true);
 const router = useRouter();
 const isSignOut = useSelector((state)=>state.isSignOut);

 useEffect (()=>{
  const interval = setInterval(() => {
    setIsVisible(prev => !prev);
  }, isVisible? 7400 : 20000);

  return () => clearInterval(interval);

 },[isVisible])

 useEffect(()=>{
  if(!isSignOut){
    if (session?.user){
      router.push('/personal-page');
    }{

    }
  }
 }, [session?.user])


  return(
    <>
    {!session?.user &&
    <>
     <div className="allButFooter">
        <div>
        <Nav/>
        <div className='flex  gap-10 flex-col justify-center items-center h-3/4'>
          <h1 className='gray_gradient xl:text-9xl lg:text-7xl md:text-5xl sm:text-3xl  font-merrySans'>LINGUA CAT</h1>
          <h2 className='orangegray_gradient  xl:text-xl md:text-base sm:text-xs font-semibold font-baby break-all'>Create your own Dictionary. And don't forget to feed the Cat.</h2> 
          </div>
     </div>
     <CatMainPage/>
     {isVisible && <PawMain visible={isVisible}/>}
     </div>
    <MyFooter/>
    </>}
    </>
   
  )
}
export const revalidate = 0;
export default Home;