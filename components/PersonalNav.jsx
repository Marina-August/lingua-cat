"use client";

import Link from 'next/link';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { useSelector, useDispatch} from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';


const PersonalNav = ()=>{
    const imageId = useSelector((state)=>state.imageId);
    const imageUrl = useSelector((state=> state.imageURL))
    const {data: session} = useSession();
    const dispatch = useDispatch();

    const fetchImage =async()=>{
        const response = await fetch(`/api/user/${session?.user.id}`);
        const data = await response.json();
        console.log(data.image);
        if(data.image){
          dispatch(vocabularyCatActions.setImageURL(data.image))
        }{
          
        }
        
   }

    useEffect (()=>{
        fetchImage();
    },[])



    return(
        <>
        <div className="personal-nav flex justify-end items-center gap-4 mt-4 mr-32" >
            <p className="font-bold  text-end font-merrySans text-lg text-gray-600">Welcome,  <span className='font-bold font-merrySans text-xl text-gray-600'>{session?.user.name ? session?.user.name :session?.user.email}!</span></p>
            {!imageId && !imageUrl && <Link href='/personal-page/my-profile'>
             <Image
             src={session?.user.image ? session?.user.image: "/assets/icons/paw.png"}
             width={42}
             height={42}
             loading="eager" 
             className='rounded-full mr-24'
             alt='profile'
            />
            </Link>}
            {imageUrl && !imageId && <img src= {imageUrl} 
            width='42' height='42'  className='rounded-full' alt='profile'/>}
            {imageId && <Link href='/personal-page/my-profile'>
             <CldImage
             src={imageId}
             width="42"
             height="42"
             className='rounded-full mr-24'
             alt='profile'
            />
            </Link>}
       </div>
       <div className='personal-nav-mobile flex justify-around  fixed top-6 left-0 w-screen h-8 z-20'>
            <Link href="/personal-page" className=" flex-center flex-col  text-gray-700 py-2 rounded hover:bg-slate-400 transition duration-300 ">
              <i className="pi pi-database"></i>
              <span className="text-base tracking-wide font-merry">Words</span>
            </Link>
            <Link href="/personal-page/add-word"  className=" flex-center flex-col text-gray-700 py-2 rounded hover:bg-slate-400 transition duration-300 ">
              <i className="pi pi-plus-circle"></i>
              <span className="text-base tracking-wide font-merry">Add</span>
            </Link>
            <Link href="/personal-page/tests"  className=" flex-center flex-col text-gray-700 py-2 rounded hover:bg-slate-400 transition duration-300 ">
              <i className="pi pi-question-circle"></i>
              <span className="text-base tracking-wide font-merry">Tests</span>
            </Link>
            <Link href="/personal-page/my-profile"  className=" flex-center flex-col text-gray-700 py-2 rounded hover:bg-slate-400 transition duration-300 ">
              <i className="pi pi-user"></i>
              <span className="text-base tracking-wide font-merry">Profile</span>
            </Link>
            <Link href="/"  className=" flex-center flex-col text-gray-700 py-2 rounded hover:bg-slate-400 transition duration-300 "
                 onClick={() => {
              const baseURL = window.location.origin;
              signOut({ callbackUrl: baseURL });
                }}> 
              <i className="pi pi-sign-out"></i>
              <span className="text-base tracking-wide font-merry">Sign out</span>
            </Link>
            

       </div>
       </>
    )

}

export default PersonalNav;
