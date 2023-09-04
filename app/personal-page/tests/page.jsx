"use client";

import Paw from "@/components/Paw";
import Link from 'next/link';

const Tests =()=>{

    return(
        <div className="flex flex-col gap-64">
            <div className="flex gap-24 justify-center">
                <Link href="/personal-page/tests/my-words">
                    <div className='mt-24 w-64 max-w-2xl text-center glassmorphism'>
                        <h2 className="text-4xl">My Words</h2>
                    </div>
                </Link>
                <Link href="/personal-page/tests/all-words">        
                    <div className='mt-24 w-64 max-w-2xl text-center glassmorphism'>    
                        <h2 className="text-4xl">All Words</h2>
                    </div> 
                </Link>  
            </div>
            <div>
                <Paw/>
            </div>    
        </div>
    )
}

export default Tests;