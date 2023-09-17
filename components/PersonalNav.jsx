"use client";

import Link from 'next/link';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { useSelector, useDispatch} from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';
import { useSession } from 'next-auth/react';
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
        <div className="flex justify-end items-center gap-4 mt-4 mr-32" >
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
    )

}

export default PersonalNav;
