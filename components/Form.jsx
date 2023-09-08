"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Form = ({type, onWordHandler, editWord, onUpdateWord, sourceL, targetL})=>{
    const [word, setWord] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('Finnish');
    const [translation, setTranslation] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('English');
    const [example, setExample] = useState('');
    const [ok, setOk] = useState(false);

    const {data: session} = useSession();



    
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

          setSourceLanguage('Finnish');
          setWord('');
          setTargetLanguage('English');
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
        <section className='w-full max-w-full flex-col -mt-16'>
        <h1 className='head_text text-center'>
          <span className='orange_gradient -ml-20'>{type} a word</span>
        </h1>
        <form onSubmit ={submitHandler}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism ml-64 '
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700 mr-6'>
            Your Word 
          </span>
          <select className='rounded-md' onChange={sourceLanguageHandler} value={sourceLanguage}>
                <option value='0'>Language</option>
                <option value='Finnish'>Finnish</option>
                <option value='English'>English</option>
            </select>
          <input className='form_input' onChange={wordHandler} value={word}></input>
         </label>
         <label>
          <span className='font-satoshi font-semibold text-base text-gray-700 mr-4'>
            Translation 
          </span>
          <select className='rounded-md' onChange={targetLanguageHandler} value={targetLanguage}>
                <option value='0'>Language</option>
                <option value='English'>English</option>
                <option value='Finnish'>Finnish</option>
            </select>
          <input className='form_input'  onChange={translationHandler} value={translation}></input>
         </label>
         <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Usage Examples
          </span>
          <textarea className='form_textarea' onChange={exampleHandler} value={example} maxLength="150" 
          placeholder=" Enter your Example (max 150 symbols)"></textarea>
         </label>
         <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/personal-page' className='text-gray-500 text-lg hover:text-gray-800'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={!ok}
            className={`${!ok? 'cursor-not-allowed': ''} px-5 py-1.5 text-lg bg-primary-orange rounded-full text-white hover:bg-white hover:text-primary-orange`}
          > Add
          </button>
        </div>

        </form>
        </section>
    )
}

export default Form;