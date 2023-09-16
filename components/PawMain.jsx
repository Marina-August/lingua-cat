"use client";

import { useState, useEffect } from "react";


const PawMain = ({visible})=>{

    const[isVisible1, setIsVisible1] = useState(true);
    const[isVisible2, setIsVisible2] = useState(true);
    const[isVisible3, setIsVisible3] = useState(true);
    const[isVisible4, setIsVisible4] = useState(true);
    const[isVisible5, setIsVisible5] = useState(true);
    const[isVisible6, setIsVisible6] = useState(true);
    const[isVisible7, setIsVisible7] = useState(true);
    const[isVisible8, setIsVisible8] = useState(true);
    const[isVisible9, setIsVisible9] = useState(true);
    const[isVisible10, setIsVisible10] = useState(true);
    const[isVisible11, setIsVisible11] = useState(true);

    useEffect (()=>{
        if(visible){
            const interval1 = setInterval(() => {
                setIsVisible1(false);
             }, 5200);
             const interval2 = setInterval(() => {
                setIsVisible2(false);
             }, 5400);
             const interval3= setInterval(() => {
                setIsVisible3(false);
             }, 5600);
             const interval4 = setInterval(() => {
                setIsVisible4(false);
             }, 5800);
             const interval5 = setInterval(() => {
                setIsVisible5(false);
             }, 6000);
             const interval6 = setInterval(() => {
                setIsVisible6(false);
             }, 6200);
             const interval7 = setInterval(() => {
                setIsVisible7(false);
             }, 6400);
             const interval8 = setInterval(() => {
                setIsVisible8(false);
             }, 6600);
             const interval9 = setInterval(() => {
                setIsVisible9(false);
             }, 6800);
             const interval10 = setInterval(() => {
                setIsVisible10(false);
             }, 7000);
             const interval11 = setInterval(() => {
                setIsVisible11(false);
             }, 7200);
   
        } else{

        }
    },[visible])

    return(
<div>    
   { isVisible1 && <div className="paw-print-1M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div>}
        
    { isVisible2 && <div className="paw-print-2M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div>}    
        
    { isVisible3 && <div className="paw-print-3M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div> }   
        
    { isVisible4 && <div className="paw-print-4M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div>}
        
    { isVisible5 && <div className="paw-print-5M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div>}
        
    { isVisible6 && <div className="paw-print-6M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div>}
        
    { isVisible7 && <div className="paw-print-7M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div> }

    { isVisible8 && <div className="paw-print-8M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div> } 

    { isVisible9 && <div className="paw-print-9M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div> }

    { isVisible10 && <div className="paw-print-10M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div> }

    { isVisible11 && <div className="paw-print-11M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div> }

    <div className="paw-print-12M">
        <div className="padM largeM"></div>
        <div className="padM small-1M"></div>
        <div className="padM small-2M"></div>
        <div className="padM small-3M"></div>
        <div className="padM small-4M"></div>
    </div> 
</div>
     
    )
}

export default PawMain;