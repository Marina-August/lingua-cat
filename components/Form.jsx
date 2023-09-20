"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';
import { useSession } from "next-auth/react";

const Form = ({type, onWordHandler, editWord, onUpdateWord, sourceL, targetL})=>{
    const [word, setWord] = useState('');
    // const [sourceLanguage, setSourceLanguage] = useState('Finnish');
    const [translation, setTranslation] = useState('');
    // const [targetLanguage, setTargetLanguage] = useState('English');
    const [example, setExample] = useState('');
    const [ok, setOk] = useState(false);

    const {data: session} = useSession();

    const sourceLanguage = useSelector((state)=>state.sourceLanguage);
    const targetLanguage = useSelector((state)=>state.targetLanguage);

    useEffect(()=>{
      if (editWord){
        setWord(editWord.word);
        setSourceLanguage(sourceL.name);
        setTranslation(editWord.translation);
        setTargetLanguage(targetL.name);
        setExample(editWord.example);
      }
       
    },[editWord]);


    const sourceLanguageHandler =(event)=>{
        if(event.target.value!==0){
            setSourceLanguage(event.target.value);
        }    
    }

    const wordHandler = (event)=>{
          setWord(event.target.value)        
    }

    const targetLanguageHandler = (event)=>{
        if(event.target.value!==0){
            setTargetLanguage(event.target.value);
        }
    }

    const translationHandler =(event)=>{
            setTranslation(event.target.value);
           
    }

    const exampleHandler =(event)=>{
            setExample(event.target.value);
      
    }

    useEffect(
        ()=>{
                if (word.trim() !== '' && sourceLanguage!== 0 && 
                translation.trim()!=='' && targetLanguage!== 0){
                    setOk(true);
                } else {
                    setOk(false)
                }  
            }, [word, sourceLanguage, translation, targetLanguage]
    )


    const submitHandler =(event)=>{
        event.preventDefault();
          const enteredWord = word;
          const source= sourceLanguage;
          const targetWord = translation;
          const target = targetLanguage;
          const usage =  example;

          setWord('');
          setTranslation('');
          setExample('');

          const newWord ={
              user:session?.user.id,
              enteredWord,
              source,
              targetWord,
              target,
              usage
          }
          if (type === "Add"){
             onWordHandler(newWord);
          } else{
            onUpdateWord(newWord)
          }

        }

    return (
        <section className='form-container w-full max-w-full flex-col sm:-mt-20'>
        <h1 className='head_text text-center'>
          <span className='orange_gradient xl:-ml-20 md:-ml-36 font-merry'>{type} a word</span>
        </h1>
        <form onSubmit ={submitHandler}
        className=' appearing mt-10 flex flex-col gap-7
         glassmorphism xl:w-full max-w-2xl xl:ml-64 lg:ml-32 lg:w-3/4 md:ml-8 md:w-3/4 sm:ml-4 sm:w-3/4'
      >
        <label>
          <span className='font-semibold text-base text-lg text-gray-700 mr-6 font-merrySans'>
            Your Word 
          </span>
          <select className='rounded-md' onChange={sourceLanguageHandler} value={sourceLanguage}>
                <option value='0'>Language</option>
                <option value='Finnish'>Finnish</option>
                <option value='English'>English</option>
            </select>
          <input className='form_input font-merrySans ' onChange={wordHandler} value={word}></input>
         </label>
         <label>
          <span className='font-semibold text-base text-gray-700 mr-4 font-merrySans text-lg'>
            Translation 
          </span>
          <select className='rounded-md' onChange={targetLanguageHandler} value={targetLanguage}>
                <option value='0'>Language</option>
                <option value='English'>English</option>
                <option value='Finnish'>Finnish</option>
            </select>
          <input className='form_input font-merrySans'  onChange={translationHandler} value={translation}></input>
         </label>
         <label>
          <span className='font-semibold text-base text-gray-700 font-merrySans text-lg'>
            Usage Examples
          </span>
          <textarea className='form_textarea font-merrySans ' onChange={exampleHandler} value={example} maxLength="150" 
          placeholder=" Enter your Example (max 150 symbols)"></textarea>
         </label>
         <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/personal-page' className='text-gray-500 text-lg hover:text-gray-800 font-merry'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={!ok}
            className={`${!ok? 'cursor-not-allowed': ''} px-5 py-1.5 text-lg bg-primary-orange rounded-full text-white hover:bg-white hover:text-primary-orange font-merry`}
          > Add
          </button>
        </div>

        </form>
        </section>
    )
}

export default Form;