"use client";

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';


const Test1 = ({words})=>{
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
    const [arrayNumbers, setArrayNumbers] = useState([]);
    const [ok1, setOk1] = useState(true);
    const [ok2, setOk2] = useState(true);
    const [ok3, setOk3] = useState(true);
    const [ok0, setOk0] = useState(true);

    const isAwake = useSelector((state)=>state.isAwake)
    const dispatch = useDispatch();

    const questionHandler =()=>{
        let num1 = 0;
        setRightAnswer0(0);
        setRightAnswer1(0);
        setRightAnswer2(0);
        setRightAnswer3(0);
        setOk0(true);
        setOk1(true);
        setOk2(true);
        setOk3(true);

        do {
            num1 = Math.floor(Math.random() * words.length);
        } while(arrayNumbers.includes(num1));
          setArrayNumbers(prevArray=> [...prevArray, num1]);
          if((arrayNumbers.length + 1) === words.length){
            setArrayNumbers([]);
          }

       let num2 = 0;
       let num3 = 0;
       let num4 = 0;
       let num5 = 0;
       do{
        num2 = Math.floor(Math.random() * words.length);
       } while(num1 === num2);

       do{
        num3 = Math.floor(Math.random() * words.length);
       } while(num3 === num1 || num3 === num2 );

       do{
        num4 = Math.floor(Math.random() * words.length);
       } while(num4 === num1 || num4 === num2 || num4 === num3 );

       do{
        num5 = Math.floor(Math.random() * words.length);
       } while(num5 === num1 || num5 === num2 || num5 === num3 || num5 === num4 );

       const num6 = Math.floor(Math.random() * 4);
       setAnswerPosition(num6);
        
       setQuestionWord(words[num1].word);
       setAnswer (words[num1].translation);
       setOption1 (words[num2].translation);
       setOption2 (words[num3].translation);
       setOption3 (words[num4].translation);
       setOption4 (words[num5].translation); 

       dispatch(vocabularyCatActions.incrementCountQuestions());
    }

    useEffect(()=>{
       questionHandler();
    },[])

    const checkAnswer0 =()=>{
        if (answerPosition === 0){
            setRightAnswer0(1);
            dispatch(vocabularyCatActions.incrementQuantityRightAnswers());
            if(isAwake){
                dispatch(vocabularyCatActions.increment());
            }
            setOk0(false);
            setOk1(false);
            setOk2(false);
            setOk3(false);
        }else{
            setRightAnswer0(2);
            setOk0(false);
            setOk1(false);
            setOk2(false);
            setOk3(false);
            if (answerPosition === 1){
                setRightAnswer1(1);
            } else if (answerPosition === 2){
                setRightAnswer2(1);
            } else{
                setRightAnswer3(1)
            }
        }
    }

    const checkAnswer1 =()=>{
        if (answerPosition === 1){
            setRightAnswer1(1);
            dispatch(vocabularyCatActions.incrementQuantityRightAnswers());
            if(isAwake){
                dispatch(vocabularyCatActions.increment());
            }
            setOk0(false);
            setOk1(false);
            setOk2(false);
            setOk3(false);
        }else{
            setRightAnswer1(2);
            setOk0(false);
            setOk1(false);
            setOk2(false);
            setOk3(false);
            if (answerPosition === 0){
                setRightAnswer0(1);
            } else if (answerPosition === 2){
                setRightAnswer2(1);
            } else{
                setRightAnswer3(1)
            }
        }
    }

    const checkAnswer2 =()=>{
        if (answerPosition === 2){
            setRightAnswer2(1);
            dispatch(vocabularyCatActions.incrementQuantityRightAnswers());
            if(isAwake){
                dispatch(vocabularyCatActions.increment());
            }
            setOk0(false);
            setOk1(false);
            setOk2(false);
            setOk3(false);
        }else{
            setRightAnswer2(2);
            setOk0(false);
            setOk1(false);
            setOk2(false);
            setOk3(false);
            if (answerPosition === 1){
                setRightAnswer1(1);
            } else if (answerPosition === 0){
                setRightAnswer0(1);
            } else{
                setRightAnswer3(1)
            }
        }
    }

    const checkAnswer3 =()=>{
        if (answerPosition === 3){
            setRightAnswer3(1);
            dispatch(vocabularyCatActions.incrementQuantityRightAnswers());
            if(isAwake){
                dispatch(vocabularyCatActions.increment());
            }
            setOk0(false);
            setOk1(false);
            setOk2(false);
            setOk3(false);

        }else{
            setRightAnswer3(2);
            setOk0(false);
            setOk1(false);
            setOk2(false);
            setOk3(false);
            if (answerPosition === 0){
                setRightAnswer0(1);
            } else if (answerPosition === 2){
                setRightAnswer2(1);
            } else{
                setRightAnswer1(1)
            }
        }
    }  

    const wrong = <Image src="/assets/images/wrong.png" 
    alt="wrong" width={40} height={40} loading="eager" className="ml-2"/>
    
    const right = <Image src="/assets/images/right.png" 
    alt="wrong" width={40} height={40} loading="eager" className="ml-2"/>

 
    return (
        <div className=' test1-container appearing mt-6 w-full max-w-2xl flex flex-col gap-7 glassmorphism lg:ml-64 md:ml-16 sm:ml-4 '>
            <div className='test-word'>
                <p>{questionWord}</p>
            </div>
            <div className='grid xl:grid-cols-2 sm:grid-cols-1 gap-4'>
                <div className={ok0 ? 'test-option':'option-disabled'} onClick={checkAnswer0}>
                    {answerPosition===0? answer: option2}
                    {rightAnswer0 === 2 && wrong}
                    {rightAnswer0 === 1 && right}
                </div>
                <div className={ok1 ? 'test-option':'option-disabled'} onClick={checkAnswer1}>
                    {answerPosition===1? answer: option1}
                    {rightAnswer1 === 1 && right}
                    {rightAnswer1 === 2 && wrong}
                </div> 
                <div className={ok2 ? 'test-option':'option-disabled'} onClick={checkAnswer2}>
                    {answerPosition===2? answer: option3}
                    {rightAnswer2 === 1 && right}
                    {rightAnswer2 === 2 && wrong}
                </div>
                <div className={ok3 ? 'test-option':'option-disabled'} onClick={checkAnswer3}>
                    {answerPosition===3? answer: option4}
                    {rightAnswer3 === 1 && right}
                    {rightAnswer3 === 2 && wrong}
                </div>
            </div>
            <div className=' button-next w-16 relative left-1/2 transform -translate-x-1/2'>
                <Button label='Next' icon ='pi pi-arrow-right' 
                severity="secondary" rounded  raised size="small" 
                className='bg-slate-100'
                onClick={questionHandler}/>
            </div>  
        </div>

    )
}

export default Test1;