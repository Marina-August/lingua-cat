"use client";

import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';

const Test2 = ({words})=>{
    const [front, setFront] = useState('');
    const [back, setBack] = useState ('');
    const [arrayNumbers, setArrayNumbers] = useState([]);
    const [fontFrontSize, setFontFrontSize] = useState(3);
    const [fontBackSize, setFontBackSize] = useState(3);

   
    const wordsHandler =()=>{
        let num1 = 0;
        if (words.length ===1){
            setFront(words[0].word);
            setBack(words[0].translation);
        } else if(words.length <=3){
            const num = Math.floor(Math.random() * words.length);
            setFront(words[num].word);
            setBack(words[num].translation);
        } else {
                 do {
                num1 = Math.floor(Math.random() * words.length);
            } while(arrayNumbers.includes(num1));
              setArrayNumbers(prevArray=> [...prevArray, num1]);
              if((arrayNumbers.length + 1) === words.length){
                setArrayNumbers([]);
              }
               setFront(words[num1].word);
               if (words[num1].word.length > 34){
                   setFontFrontSize(1.5);
               } else{
                 setFontFrontSize(3)
               }
               setBack(words[num1].translation);
               if (words[num1].word.length > 34){
                setFontBackSize(1.5);
            } else{
              setFontBackSize(3)
            }
            }       
        }
      
    useEffect(()=>{
       wordsHandler();
    },[])

    return(
        
        <div className='appearing'>
            <div className="flip-container">
                <div className="flipper">
		            <div className="front" style={{fontSize:fontFrontSize+"em"}} >
                        <div className=' mt-20 px-2' >
                            {front} 
                        </div>
		            </div>
		            <div className="back" style={{fontSize:fontBackSize+"em"}}>
                        <div className='mt-20 px-2'>
                          {back}
                        </div>
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