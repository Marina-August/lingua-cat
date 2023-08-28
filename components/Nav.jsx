"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav =()=>{
    const [login, setLogin] = useState(false);
    const router = useRouter();

    const signinHandler =()=>{
        setLogin(true);
        router.push('/personal-page')
    }

    const signoutHandler =()=>{
        setLogin(false);
        router.push('/')
    }

    return(
        <nav className="flex justify-around items-center w-full mb-16 pt-3 ">
            <Link href="/" className="flex gap-2 flex-center mr-80">
                <Image src="/assets/icons/logo-no-background.png" alt="logo" width={150} height={150} loading="eager" />
            </Link>
            {!login? (<div className='flex gap-3 md:gap-5'><button type= 'button' className="black_btn" onClick ={signinHandler}>Sign in</button>
            <Image
            src="/assets/icons/paw.png"
            width={37}
            height={37}
            loading="eager" 
            className='rounded-full'
            alt='paw'
            /></div>): 
            ( <div className='flex gap-3 md:gap-5'>
                <Link href='/profile'>
                 <Image
                    src="/assets/icons/paw.png"
                    width={37}
                    height={37}
                    className='rounded-full'
                    loading="eager" 
                    alt='profile'
                />
                 </Link>
                <button type='button'  className="black_btn" onClick={signoutHandler}>Sign Out</button>
                 <Image
                    src="/assets/icons/paw.png"
                    width={37}
                    height={37}
                    className='rounded-full'
                    alt='profile'
                />
                 </div>)}

            
        </nav>    

    )
}

export default Nav;