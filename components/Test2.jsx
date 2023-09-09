"use client";

import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';

const Test2 = ({words})=>{
    const [front, setFront] = useState('');
    const [back, setBack] = useState ('');
    let i = 0;

    console.log("words", words)
    
    const wordsHandler =()=>{
       setFront(words[0].word);
       setBack(words[0].translation);
       console.log(i)
    }

    useEffect(()=>{
       wordsHandler();
    },[])

    return(
        
        <div>
            <div className="flip-container">
                <div className="flipper">
		            <div className="front">
                         {front}
		            </div>
		            <div className="back">
                          {back}
                    </div>
	            </div>
            </div> 
            <div className='w-16 relative left-1/2 transform -translate-x-1/2 mt-20'>
                <Button label='Next' icon ='pi pi-arrow-right' 
                severity="secondary" rounded  raised size="small" 
                className='bg-slate-100'
                onClick={wordsHandler}
                />
            </div>
        </div> 
    )
}

export default Test2;