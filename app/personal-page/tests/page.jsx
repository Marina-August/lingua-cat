"use client";

import Paw from "@/components/Paw";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';

const Tests =()=>{
    const dispatch = useDispatch();

    const myWordsHandler =()=>{
        dispatch(vocabularyCatActions.falseTestAllWords());
    }

    const allWordsHandler =()=>{
        dispatch(vocabularyCatActions.trueTestAllWords());
    }

    return(
        <div className="flex flex-col gap-64">
            <div className=" test-container flex flex-wrap md:gap-24 sm:gap-12 justify-center">
                <Link href="/personal-page/tests/words" onClick={myWordsHandler}>
                    <div className=' appearing mt-24 w-64 max-w-2xl text-center glassmorphism'>
                        <h2 className="text-4xl font-bold font-merry text-gray-600">My Words</h2>
                    </div>
                </Link>
                <Link href="/personal-page/tests/words" onClick={allWordsHandler}>        
                    <div className=' appearing mt-24 w-64 max-w-2xl text-center glassmorphism'>    
                        <h2 className="text-4xl font-bold font-merry text-gray-600">All Words</h2>
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