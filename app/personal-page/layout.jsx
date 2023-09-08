'use client'
import Link from 'next/link';
import Image from 'next/image';
import ReduxProvider from '@/redux/provider';
import CatAction from '@/components/CatAction';
import Footer from '@/components/Footer';
import AuthenticatedContent from '@/components/AuthenticatedContent';
import { Button } from 'primereact/button';

import { signOut } from 'next-auth/react';


const PersonalLayout =({ children })=>{

   console.log('personal lay')
    return (
      <AuthenticatedContent>
      <div className=" w-full h-screen ">

        <div className=" flex flex-col bg-gray-800 p-4  bg-opacity-20 justify-items-end fixed top-0 left-0 h-screen w-64 ">
            <Image src="/assets/icons/logo-no-background.png" alt="logo" width={150} height={150} loading="eager" className="mb-16 ml-9 "/>
            <Link href="/personal-page" 
            className="text-white py-2 rounded hover:bg-slate-400 active:bg-slate-500 transition duration-300 ">
              <i className="pi pi-database" style={{marginLeft:5}}></i>
              <span className="ml-2 text-xl">My Dictionary</span>
            </Link>
            <Link href="/personal-page/add-word" className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300">
            <i className="pi pi-plus-circle"  style={{marginLeft:5}}></i>
            <span className="ml-1 text-xl"> Add New Word</span>
            </Link>
            <Link href="/personal-page/tests" className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300">
            <i className="pi pi-question-circle"  style={{marginLeft:5}}></i>
            <span className="ml-1 text-xl">Tests</span>
              </Link>
            <Link href="/personal-page/my-profile" className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300">
            <i className="pi pi-user"  style={{marginLeft:5}}></i>
             <span className="ml-1 text-xl"> My Profile</span>
              </Link>
            <button className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300"
              onClick={() => {
              const baseURL = window.location.origin;
              signOut({ callbackUrl: baseURL });
          }}> 
            <i className="pi pi-sign-out"  style={{marginLeft:5}}></i> <span className=" text-xl">Sign Out</span>
            </button>
        </div>
      <div className=" allButFooter  ml-64">
        <div className='flex flex-col gap-20'>
        <div className="flex justify-end gap-4 mt-4" >
           <p className="text-end">Welcome</p>
           <Link href='/profile'>
                <Image
                src="/assets/icons/paw.png"
                width={37}
                height={37}
                loading="eager" 
                className='rounded-full mr-24'
                alt='profile'
               />
           </Link>
        </div>
        <div>
          <ReduxProvider>
               <CatAction/>        
               {children}
          </ReduxProvider>
        </div>
        </div>
        <Footer/>
      </div>

    </div>
    </AuthenticatedContent>
    )
  }
  
  export default PersonalLayout;