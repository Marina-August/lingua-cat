"use client";

import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
 
import {useState, useRef, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';
import { useSession, signOut } from 'next-auth/react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const MyProfile =()=>{
    const [visible, setVisible] = useState(false);
    const {data: session} = useSession();
    const toast = useRef(null);
    
    const dispatch = useDispatch();
    const sourceLanguage = useSelector((state)=>state.sourceLanguage);
    const targetLanguage = useSelector((state)=>state.targetLanguage);
    const imageId = useSelector((state)=>state.imageId);
    const imageUrl = useSelector((state=> state.imageURL))

    const sourceEnglishHandler = ()=>{
        dispatch(vocabularyCatActions.setSourceLanguage('English'));
    }
    
    const sourceFinnishHandler = ()=>{
        dispatch(vocabularyCatActions.setSourceLanguage('Finnish'));
    }

    const targetEnglishHandler = ()=>{
        dispatch(vocabularyCatActions.setTargetLanguage('English'));
    }
    
    const targetFinnishHandler = ()=>{
        dispatch(vocabularyCatActions.setTargetLanguage('Finnish'));
    }

    const accept = async() => {
        try {
            await fetch(`/api/user/${session?.user.id.toString()}`, {
              method: "DELETE",
            });
            deleteUserWords();
            const baseURL = window.location.origin;
            signOut({ callbackUrl: baseURL });
          } catch (error) {
            console.log(error);
          }
        
      }
    
      const reject =()=>{
        setVisible(false);
      }

    const deleteProfileHandler = ()=>{
        setVisible(true);   
    }

    const deleteUserWords= async()=>{
        try {
            await fetch(`/api/users/${session?.user.id}/words`, {
              method: "DELETE",
            });
          } catch (error) {
            console.log(error);
          }
         
    }

    const updateImage = async(url)=>{
        console.log(url)
        try {
            const response = await fetch(`/api/user/${session?.user.id.toString()}`, {
              method: "PATCH",
              body: JSON.stringify({
                  image: url,
              }),
            });
          } catch (error) {
            console.log(error);
          }
    }

   const fetchImage =async()=>{
        const response = await fetch(`/api/user/${session?.user.id}`);
        const data = await response.json();
        console.log(data.image)
        dispatch(vocabularyCatActions.setImageURL(data.image))
   }

   useEffect(()=>{
     document.getElementsByTagName('button')[0].innerHTML = "Change Photo"
     fetchImage();
   },[])


    return (
        <div className="flex justify-items-start align-center gap-20 ml-40 mt-20">
             <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" 
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <div className='flex flex-col content-center gap-2'>
                   {!imageId && !imageUrl && <Image src= {session?.user.image ? session?.user.image: "/assets/images/user-image.png"} 
                   width={110} height={55}  loading="eager" className='rounded-full mt-6' alt='profile'/>}
                   {imageUrl && !imageId && <img src= {imageUrl} 
                   width='110' height='55'  className='rounded-full mt-6' alt='profile'/>}
                   {imageId && <CldImage
                    className='rounded-full mt-6'
                    width="110" 
                    height="55"
                    src={imageId}
                    sizes="100vw"
                    alt="profile image"/>}
                   <CldUploadButton uploadPreset="naj864dv"  
                    onUpload={(result) => {
                        dispatch(vocabularyCatActions.setImageId(result.info.public_id));
                        updateImage(result.info.url);  
                   }}/>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='profile'>
                     My Email:<span className='text-3xl text-orange-500 ml-4'>{session?.user.email} </span>
                </div>
                <div className = 'flex profile'>
                    <h2> My Source Language:</h2>
                     <div onClick = {sourceFinnishHandler} className={`${sourceLanguage === 'Finnish'? 'bg-orange-400': ''} ml-4 w-9 rounded cursor-pointer `}> 
                        <Image width={30} height={25} src="/assets/images/Fi.png" alt="FI flag" loading="eager" className="icon"/>
                    </div>
                    <div onClick = {sourceEnglishHandler} className={`${sourceLanguage === 'English'? 'bg-orange-400': ''} ml-4 w-9 rounded cursor-pointer `}> 
                        <Image width={30} height={25} src="/assets/images/En.png" alt="FI flag" loading="eager" className="icon"/>
                    </div>
                </div>
                 <div className = 'flex profile'>
                    <h2>My Target Language:</h2>
                    <div onClick = {targetFinnishHandler} className={`${targetLanguage === 'Finnish'? 'bg-orange-400': ''} ml-7 w-9 rounded cursor-pointer `}> 
                        <Image width={30} height={25} src="/assets/images/Fi.png" alt="FI flag" loading="eager" className="icon"/>
                    </div>
                    <div  onClick = {targetEnglishHandler} className={`${targetLanguage === 'English'? 'bg-orange-400': ''} ml-4 w-9 rounded cursor-pointer `}> 
                        <Image width={30} height={25} src="/assets/images/En.png" alt="FI flag" loading="eager" className="icon"/>
                    </div>
                </div>
                <div className='font-merrySans text-2xl text-gray-600 font-bold hover:text-slate-800 cursor-pointer' onClick={deleteProfileHandler}>
                   <i className="pi pi-trash mr-2"  style={{marginLeft:5}}></i>
                    Delete Profile
                </div>      
            </div>
        </div>
    )
}

export default MyProfile;