"use client";

import Image from 'next/image';
import {useState, useRef} from "react";
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

    return (
        <div className="flex justify-items-start align-center gap-20 ml-40 mt-20">
             <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" 
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <div>
                   <Image src= {session?.user.image ? session?.user.image: "/assets/images/user-image.png"} 
                   width={110} height={55}  loading="eager" className='rounded-full' alt='profile'/>
                   <h3 className='font-merrySans text-lg text-gray-600 font-bold -ml-2 mt-2 '>Change Photo</h3>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='font-merrySans text-2xl text-gray-600 font-bold'>
                     My Email:<span className='text-3xl text-orange-500 ml-4'>{session?.user.email} </span>
                </div>
                <div className = 'flex font-merrySans text-2xl text-gray-600 font-bold'>
                    <h2> My Source Language:</h2>
                     <div onClick = {sourceFinnishHandler} className={`${sourceLanguage === 'Finnish'? 'bg-orange-400': ''} ml-4 w-9 rounded cursor-pointer `}> 
                        <Image width={30} height={25} src="/assets/images/Fi.png" alt="FI flag" loading="eager" className="icon"/>
                    </div>
                    <div onClick = {sourceEnglishHandler} className={`${sourceLanguage === 'English'? 'bg-orange-400': ''} ml-4 w-9 rounded cursor-pointer `}> 
                        <Image width={30} height={25} src="/assets/images/En.png" alt="FI flag" loading="eager" className="icon"/>
                    </div>
                </div>
                 <div className = 'flex font-merrySans text-2xl text-gray-600 font-bold'>
                    <h2>My Target Language:</h2>
                    <div onClick = {targetFinnishHandler} className={`${targetLanguage === 'Finnish'? 'bg-orange-400': ''} ml-4 w-9 rounded cursor-pointer `}> 
                        <Image width={30} height={25} src="/assets/images/Fi.png" alt="FI flag" loading="eager" className="icon"/>
                    </div>
                    <div  onClick = {targetEnglishHandler} className={`${targetLanguage === 'English'? 'bg-orange-400': ''} ml-4 w-9 rounded cursor-pointer `}> 
                        <Image width={30} height={25} src="/assets/images/En.png" alt="FI flag" loading="eager" className="icon"/>
                    </div>
                </div>
                <div className='font-merrySans text-2xl text-gray-600 font-bold cursor-pointer' onClick={deleteProfileHandler}>
                   <i className="pi pi-trash mr-2"  style={{marginLeft:5}}></i>
                    Delete Profile
                </div>      
            </div>
        </div>
    )
}

export default MyProfile;