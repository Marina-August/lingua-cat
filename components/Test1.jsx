"use client";

import { useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import CatWithLaptop from './CatWithLaptop';
import { Button } from 'primereact/button';


const Test1 = ()=>{
    const allWords = useSelector((state)=>state.allWords);
    const [questionWord, setQuestionWord] = useState('');
    let answerWord  = '';
    let option1 = '';
    let option2 = '';
    let option3 = '';

    console.log(questionWord);
    

    useEffect(()=>{
        const test =()=>{
            for (let i = 0; i < allWords.length; i++){
                setQuestionWord(allWords[i].word);
                console.log(allWords[i].word)
            //     answerWord = allWords.translation[i];
            //     if(i!==allWords.length-1){
            //     option1 = allWords.translation[i+1]
            //     }else{
            //     option1 = allWords.translation[i-1]
            //     }
            //     if(i!==allWords.length-2){
            //         option2 = allWords.translation[i+2]
            //     }else{
            //         option2 = allWords.translation[i-2]
            //     }
            //     if(i!==allWords.length-3){
            //         option3 = allWords.translation[i+3]
            //     }else{
            //         option3 = allWords.translation[i-3]
            //     }
                
             }
        }
        test();
    },[allWords])
   
    

    
    return (
        <div className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism ml-64 absolute'>
            <div className='test-word'>
                <p>WORD</p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='test-option'>ANSWER1</div>
                <div className='test-option'>ANSWER2</div> 
                <div className='test-option'>ANSWER3</div>
                <div className='test-option'>ANSWER4</div>
            </div>
            <div className='w-16 relative left-1/2 transform -translate-x-1/2 '>
                <Button label='Next' icon ='pi pi-arrow-right' severity="secondary" rounded  raised size="small" className='bg-slate-100'/>
            </div>
            
          
        </div>

    )
}

export default Test1;