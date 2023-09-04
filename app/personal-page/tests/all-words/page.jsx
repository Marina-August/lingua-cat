"use client";

import { useState } from "react";
import Image from 'next/image';
import Test1 from "@/components/Test1";

const AllWords = ()=>{
   const [isFinnish, setIsFinnish] = useState (false);
   const [isEnglish, setIsEnglish] = useState(false);
   const [isAllLanguages, setIsAllLanguages] = useState(true);

   const allLanguagesHandler =()=>{

   }

   const sourceEnglishHandler =()=>{

   }

   const sourceFinnishHandler =()=>{
    
   }



    return(
        <div>
            <div className="flex gap-4 border-slate-300 mb-8">
                <h2>Language:</h2>
                <div className={`${isAllLanguages? 'bg-orange-400': ''} w-9 rounded cursor-pointer `}>
                   <Image width={30} height={25} src="/assets/images/Earth.png" alt="Earth" loading="eager" className="icon" onClick={allLanguagesHandler}/>
                </div>
                <div className={`${isFinnish? 'bg-orange-400': ''} w-9 rounded cursor-pointer `}>
                   <Image width={30} height={25} src="/assets/images/Fi.png" alt="FI flag" loading="eager" className="icon" onClick={sourceFinnishHandler}/>
                </div>
                <div className={`${isEnglish? 'bg-orange-400': ''} w-9 rounded cursor-pointer`}>
                <Image width={30} height={25} src="/assets/images/En.png" alt="EN flag" loading="eager" className="icon" onClick ={sourceEnglishHandler}/>
                </div> 
                <Test1/>  
            </div>
            <h1>ALL WORDS</h1>
            
        </div>
    )

}

export default AllWords;
