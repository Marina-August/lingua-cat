"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, useSession, getProviders} from "next-auth/react";
import { useDispatch } from "react-redux";
import { vocabularyCatActions } from "@/redux/store";

const Nav =()=>{
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const dispatch = useDispatch();
    

    useEffect(() => {
        const fetchProviders = async () => {
         const res = await getProviders();
         setProviders(res);
       };

       fetchProviders();

     }, []);


    return(
        <>
        {!session?.user &&
        <nav className="nav-container flex sm:justify-around items-center w-full mb-16 pt-3 ">
            <Link href="/" className="flex gap-2 flex-center mr-80">
                <Image src="/assets/icons/logo-no-background.png" alt="logo" width={150} height={150} loading="eager" />
            </Link>
            <div className='flex gap-3 md:gap-5'>
                <p className=" signin-nav flex items-center font-merrySans text-xl 
                text-gray-600 hover:text-slate-800 sm:hidden lg:flex"><span className="text-orange-500 sm:hidden lg:inline">&nbsp;Sign in&nbsp;  </span>  with Google</p>
            {providers &&
                Object.values(providers).map((provider) => 
                (<button 
                    type= 'button' 
                    className="flex gap-2 justify-center items-center border-solid border-black-600 bg-white rounded-full w-32 h-10 hover:bg-slate-100" 
                    key={provider.name}
                    onClick={
                    () => {
                        dispatch(vocabularyCatActions.setIsSignOut(false));   
                        signIn(provider.id, { callbackUrl: '/personal-page' });
                    }
                    }>
                        <img src="/assets/images/google.png" height='30' width='30'/>
                        <span>Google</span>
                </button>))}
            <Image
            src="/assets/icons/paw.png"
            width={37}
            height={37}
            loading="eager" 
            className='paw-nav rounded-full'
            alt='paw'
             /></div>
            
        </nav> }
        </>   
    )
}

export default Nav;