"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

const Nav =()=>{
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProviders = async () => {
         const res = await getProviders();
         setProviders(res);
       };

       fetchProviders();

     }, []);

    const signinHandler =()=>{
        router.push('/personal-page')
    }


    return(
        <>
        {!session?.user &&
        <nav className="flex justify-around items-center w-full mb-16 pt-3 ">
            <Link href="/" className="flex gap-2 flex-center mr-80">
                <Image src="/assets/icons/logo-no-background.png" alt="logo" width={150} height={150} loading="eager" />
            </Link>
            <div className='flex gap-3 md:gap-5'>
            {providers &&
                Object.values(providers).map((provider) => 
                (<button 
                    type= 'button' 
                    className="black_btn" 
                    key={provider.name}
                    onClick={
                    () => {
                    // const signInResult = await signIn(provider.id);    
                    // if(!signInResult?.error){   
                    //     router.push('/personal-page');
                    // }
                    signIn(provider.id, { callbackUrl: '/personal-page' });
                    }
                    }>
                        Sign in
                </button>))}
            <Image
            src="/assets/icons/paw.png"
            width={37}
            height={37}
            loading="eager" 
            className='rounded-full'
            alt='paw'
             /></div>
            
        </nav> }
        {/* {session?.user &&
        <button onClick={() => {
            const baseURL = window.location.origin;
            console.log('log out')
            signOut({ callbackUrl: baseURL });
        }}>
            motan
        </button>} */}
        </>   
    )
}

export default Nav;