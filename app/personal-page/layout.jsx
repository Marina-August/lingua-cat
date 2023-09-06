// "use client"

import Link from 'next/link';
import Image from 'next/image';
import ReduxProvider from '@/redux/provider';
import CatAction from '@/components/CatAction';
import Footer from '@/components/Footer';



const PersonalLayout =({ children })=>{
   
    return (
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
            <Link href="/personal-page/profile" className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300">
            <i className="pi pi-user"  style={{marginLeft:5}}></i>
             <span className="ml-1 text-xl"> My Profile</span>
              </Link>
            <Link href="/" className="text-white py-2 rounded hover:bg-slate-400 focus:bg-slate-500 transition duration-300"> 
            <i className="pi pi-sign-out"  style={{marginLeft:5}}></i> <span className="ml-1 text-xl">Sign Out</span>
            </Link>
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
               {/* <div className='container-motan'> */}
               {children}
               {/* </div>  */}
          </ReduxProvider>
        </div>
        </div>
        <Footer/>
      </div>

    </div>
    )
  }
  
  export default PersonalLayout;