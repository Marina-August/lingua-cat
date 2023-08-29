// "use client"

import Link from 'next/link';
import Image from 'next/image';
import Cat from '@/components/Cat';
import ReduxProvider from '@/redux/provider';
import CatAction from '@/components/CatAction';


const PersonalLayout =({ children })=>{
   
    return (
      <div className="grid grid-cols-5 w-full h-screen ">
        <div className="col-span-1 flex flex-col bg-gray-800 p-4  bg-opacity-20 justify-items-end">
            <Image src="/assets/icons/logo-no-background.png" alt="logo" width={150} height={150} loading="eager" className="mb-16 ml-14 "/>
            <Link href="/personal-page" className="text-white py-2 hover:bg-primary-orange transition duration-300">My Dictionary</Link>
            <Link href="/personal-page/add-word" className="text-white py-2 hover:bg-gray-700 transition duration-300">Add New Word</Link>
            <Link href="/personal-page/tests" className="text-white py-2 hover:bg-gray-700 transition duration-300">Tests</Link>
            <Link href="/personal-page/profile" className="text-white py-2 hover:bg-gray-700 transition duration-300">My Profile</Link>
            <Link href="/" className="text-white py-2 hover:bg-gray-700 transition duration-300">Sign Out</Link>
        </div>
      <div className="col-span-4 p-4 flex flex-col gap-20">
        <div className="flex justify-end gap-4" >
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
    </div>
    )
  }
  
  export default PersonalLayout;