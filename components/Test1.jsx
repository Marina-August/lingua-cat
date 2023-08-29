"use client";

import { useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import CatWithLaptop from './CatWithLaptop';


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
        console.log("Motan")
    },[allWords])
   
    

    
    return (
        <>
        <div>{questionWord}</div>
        <div>{answerWord}</div>
        <div>{option1}</div>
        <div>{option2}</div>
        <div>{option3}</div>
        {/* <CatWithLaptop/> */}
        </>

    )
}

export default Test1;