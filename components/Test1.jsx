"use client";

import { useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';


const Test1 = ()=>{
    const allWords = useSelector((state)=>state.allWords);
    const [questionWord, setQuestionWord] = useState('');
    const [answer, setAnswer] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answerPosition, setAnswerPosition] = useState(0);
    const [rightAnswer0, setRightAnswer0] = useState(0);
    const [rightAnswer1, setRightAnswer1] = useState(0);
    const [rightAnswer2, setRightAnswer2] = useState(0);
    const [rightAnswer3, setRightAnswer3] = useState(0);

    const questionHandler =()=>{
        setRightAnswer0(0);
        setRightAnswer1(0);
        setRightAnswer2(0);
        setRightAnswer3(0);
       const num1 = Math.floor(Math.random() * allWords.length);
       let num2 = 0;
       let num3 = 0;
       let num4 = 0;
       let num5 = 0;
       do{
        num2 = Math.floor(Math.random() * allWords.length);
       } while(num1 === num2);

       do{
        num3 = Math.floor(Math.random() * allWords.length);
       } while(num3 === num1 || num3 === num2 );

       do{
        num4 = Math.floor(Math.random() * allWords.length);
       } while(num4 === num1 || num4 === num2 || num4 === num3 );

       do{
        num5 = Math.floor(Math.random() * allWords.length);
       } while(num5 === num1 || num5 === num2 || num5 === num3 || num5 === num4 );

       const num6 = Math.floor(Math.random() * 4);
       setAnswerPosition(num6);
        
       setQuestionWord(allWords[num1].word);
       setAnswer (allWords[num1].translation);
       setOption1 (allWords[num2].translation);
       setOption2 (allWords[num3].translation);
       setOption3 (allWords[num4].translation);
       setOption4 (allWords[num5].translation); 
    }

    useEffect(()=>{
       questionHandler();
    },[])

    const checkAnswer0 =()=>{
        if (answerPosition === 0){
            setRightAnswer0(1);
        }else{
            setRightAnswer0(2);
        }
    }

    const checkAnswer1 =()=>{
        if (answerPosition === 1){
            setRightAnswer1(1);
        }else{
            setRightAnswer1(2);
        }
    }

    const checkAnswer2 =()=>{
        if (answerPosition === 2){
            setRightAnswer2(1);
        }else{
            setRightAnswer2(2);
        }
    }

    const checkAnswer3 =()=>{
        if (answerPosition === 3){
            setRightAnswer3(1);
        }else{
            setRightAnswer3(2);
        }
    }  
 
    return (
        <div className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism ml-64 absolute'>
            <div className='test-word'>
                <p>{questionWord}</p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='test-option' onClick={checkAnswer0}>
                    {answerPosition===0? answer: option2}
                    {rightAnswer0 === 1 && <div>Right</div>}
                    {rightAnswer0 === 2 && <div>Wrong</div>}
                </div>
                <div className='test-option' onClick={checkAnswer1}>
                    {answerPosition===1? answer: option1}
                    {rightAnswer1 === 1 && <div>Right</div>}
                    {rightAnswer1 === 2 && <div>Wrong</div>}
                </div> 
                <div className='test-option' onClick={checkAnswer2}>
                    {answerPosition===2? answer: option3}
                    {rightAnswer2 === 1 && <div>Right</div>}
                    {rightAnswer2 === 2 && <div>Wrong</div>}
                </div>
                <div className='test-option' onClick={checkAnswer3}>
                    {answerPosition===3? answer: option4}
                    {rightAnswer3 === 1 && <div>Right</div>}
                    {rightAnswer3 === 2 && <div>Wrong</div>}
                </div>
            </div>
            <div className='w-16 relative left-1/2 transform -translate-x-1/2 '>
                <Button label='Next' icon ='pi pi-arrow-right' 
                severity="secondary" rounded  raised size="small" 
                className='bg-slate-100'
                onClick={questionHandler}/>
            </div>
            
          
        </div>

    )
}

export default Test1;