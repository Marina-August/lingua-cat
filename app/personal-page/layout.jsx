'use client'
import Link from 'next/link';
import Image from 'next/image';
import ReduxProvider from '@/redux/provider';
import CatAction from '@/components/CatAction';
import Footer from '@/components/Footer';
import AuthenticatedContent from '@/components/AuthenticatedContent';

import { signOut,useSession } from 'next-auth/react';
import PersonalNav from '@/components/PersonalNav';

const PersonalLayout =({ children })=>{
  const {data: session} = useSession();

    return (
      <AuthenticatedContent>
      <div className=" w-full h-screen ">
        <div className=" flex flex-col bg-gray-800 p-4  bg-opacity-20 justify-items-end fixed top-0 left-0 h-screen w-60 ">
            <Image src="/assets/icons/logo-no-background.png" alt="logo" width={150} height={150} loading="eager" className="mb-16 ml-7 "/>
            <Link href="/personal-page" 
            className="text-white py-2 rounded hover:bg-slate-400 active:bg-slate-500 transition duration-300 ">
              <i className="pi pi-database" style={{marginLeft:5}}></i>
              <span className="ml-2 text-2xl tracking-wide font-merry">My Dictionary</span>
            </Link>
            <Link href="/personal-page/add-word" className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300">
            <i className="pi pi-plus-circle"  style={{marginLeft:5}}></i>
            <span className="ml-1 text-2xl tracking-wide font-merry"> Add New Word</span>
            </Link>
            <Link href="/personal-page/tests" className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300">
            <i className="pi pi-question-circle"  style={{marginLeft:5}}></i>
            <span className="ml-2 text-2xl tracking-wide font-merry">Tests</span>
              </Link>
            <Link href="/personal-page/my-profile" className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300">
            <i className="pi pi-user"  style={{marginLeft:5}}></i>
             <span className="ml-1 text-2xl tracking-wide font-merry"> My Profile</span>
              </Link>
            <Link href="/" className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300"
              onClick={() => {
              const baseURL = window.location.origin;
              signOut({ callbackUrl: baseURL });
          }}> 
            <i className="pi pi-sign-out"  style={{marginLeft:5}}></i> <span className=" ml-1 text-2xl tracking-wide font-merry">Sign Out</span>
            </Link>
        </div>
      <div className=" allButFooter  ml-60">
      <ReduxProvider>
        <div className='flex flex-col gap-20'>
        <PersonalNav/>
        <div>
               <CatAction/>
               <div className='ml-8'>
                   {children}
                </div>               
        </div>
        </div>
        </ReduxProvider>
        <Footer/>
      </div>

    </div>
    </AuthenticatedContent>
    )
  }
  
  export default PersonalLayout;