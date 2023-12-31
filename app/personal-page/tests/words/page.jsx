"use client";

import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import Test1 from "@/components/Test1";
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'primereact/toast';
import { BreadCrumb } from 'primereact/breadcrumb';;

import { vocabularyCatActions } from '@/redux/store';
import { useSession } from "next-auth/react";
import Test2 from "@/components/Test2";
import { Button } from "primereact/button";

const TestWords = ()=>{
    const [isFinnish, setIsFinnish] = useState (false);
    const [isEnglish, setIsEnglish] = useState(false);
    const [isAllLanguages, setIsAllLanguages] = useState(true);
    const [words, setWords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [typeTest, setTypeTest] = useState(1);
    const {data: session} = useSession();


    const dispatch = useDispatch();
    const allWords = useSelector((state)=>state.allWords);
    const testAllWords = useSelector((state)=> state.testAllWords);
    const countQuestions = useSelector((state)=> state.countQuestions);
    const quantityRightAnswers = useSelector((state)=> state.quantityRightAnswers);
    const toast = useRef(null);


    const fetchWords = async (lang, type) => {
      console.log("lang", lang)
      console.log("type", type)
        setIsLoading(true);
        const response = await fetch(testAllWords ? "/api/word" :`/api/users/${session?.user.id}/words`);
        const data = await response.json();
        const _words = data.words.map(word => {
          return {
            ...word,
            sourceLang: data.languages.find(l => l._id === word.source),
            targetLang: data.languages.find(l => l._id === word.target)
          }
        })
        if (_words.length >= 5 && type===1){
          if(lang){
            const filteredWords = _words.filter(el=> el.sourceLang.code == lang);
            if (filteredWords.length >=5) {
              setWords(filteredWords);
            }else{
              setWords([]);
              toast.current.show({ severity:'warn', summary: 'Warning', detail: 'In the Dictionary should be at least 5 words.' });
            }   
          }else{
            setWords(_words);
          }
        }else if (_words.length < 5  && type===1) {
           toast.current.show({ severity:'warn', summary: 'Warning', detail: 'In the Dictionary should be at least 5 words.' });
          setWords([]);
        } else if (_words.length < 1  && type===2){
          toast.current.show({ severity:'warn', summary: 'Warning', detail: 'In the Dictionary should be at least 1 word.' });
          setWords([]);
        } else if (_words.length > 0  && type===2){
          if(lang){
            const filteredWords = _words.filter(el=> el.sourceLang.code == lang);
            if (filteredWords.length >0) {
              setWords(filteredWords);
            }else{
              setWords([]);
              toast.current.show({ severity:'warn', summary: 'Warning', detail: 'In the Dictionary should be at least 1 word.' });
            }   
          }else{
            setWords(_words);
          }
        }
         
        dispatch(vocabularyCatActions.setAllWords(_words));
        setIsLoading(false);
      };

    useEffect(()=>{ 
        fetchWords(undefined, 1);     
    }, [])

    
    const test1Handler = ()=>{
      setTypeTest(1);
      if (isEnglish ===true){
        fetchWords("En", 1);
      } else if (isFinnish === true){
        fetchWords("Fi", 1);
      } else{
        fetchWords(undefined, 1);
      }
    
    }

    const test2Handler =()=>{
      setTypeTest(2);
      if (isEnglish === true){
        fetchWords("En", 2);
      } else if (isFinnish === true){
        fetchWords("Fi", 2);
      } else{
        fetchWords(undefined, 2);
      }
    
    }

    const allLanguagesHandler =async()=>{
        setIsAllLanguages(true);
        setIsFinnish(false);
        setIsEnglish(false);
        if (typeTest === 1){
          await fetchWords(undefined, 1);
        } else{
          await fetchWords(undefined, 2);
        }
        
    }
 
    const sourceEnglishHandler = async ()=>{
      setIsEnglish(true);
      setIsFinnish(false);
      setIsAllLanguages(false);
      if (typeTest === 1){
        await fetchWords("En", 1);
      } else{
        await fetchWords("En", 2);
      }
    }

 
    const sourceFinnishHandler = async ()=>{
        setIsFinnish(true);
        setIsEnglish(false); 
        setIsAllLanguages(false);
        if (typeTest === 1){
          await fetchWords("Fi", 1);
        } else{
          await fetchWords("Fi", 2);
        }
    }
 
    const loader = 
    <div className="text-center">
    <div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div>
    </div>;

    const items = [
      { label: 'Choose Words', url: '/personal-page/tests' },
      { label: 'Tests' },
    ];

 
     return(
      <>
         <Toast ref={toast} position="center"/>
         <div className="tests-container flex flex-col">
            <div className="test-language-button-container flex flex-wrap justify-between border-slate-300 ">
              <div className="flex gap-4 border-slate-300 ">
                 <div className="rounded-lg bg-orange-300 w-24 text-white flex-center text-xl mb-1">
                   <p className="mb-1">Language:</p>
                 </div>
                 <div className={`${isAllLanguages? 'bg-orange-400': ''} w-9 rounded cursor-pointer flex-center mb-1`}>
                    <Image width={30} height={25} src="/assets/images/Earth.png" alt="Earth" loading="eager" onClick={allLanguagesHandler}/>
                 </div>
                 <div className={`${isFinnish? 'bg-orange-400': ''} w-9 rounded cursor-pointer flex-center mb-1`}>
                    <Image width={30} height={25} src="/assets/images/Fi.png" alt="FI flag" loading="eager" onClick={sourceFinnishHandler}/>
                 </div>
                 <div className={`${isEnglish? 'bg-orange-400': ''} w-9 rounded cursor-pointer flex-center mb-1`}>
                 <Image width={30} height={25} src="/assets/images/En.png" alt="EN flag" loading="eager" onClick ={sourceEnglishHandler}/>
                 </div>
              </div>
              <div className="test-buttons flex flex-wrap gap-8 mr-20" >
                 {typeTest ===2 && <Button label="Test 1"  severity="secondary" rounded raised size="small" onClick={test1Handler} className="tracking-wider w-24"/>}
                 {typeTest === 1 && <Button label="Test 1" style= {{ backgroundColor: 'var(--highlight-bg)', color: 'var(--highlight-text-color)'}} rounded raised size="small" onClick={test1Handler} className="tracking-wider w-24"/>}
                 {typeTest ===2 && <Button label="Test 2" style= {{ backgroundColor: 'var(--highlight-bg)', color: 'var(--highlight-text-color)'}} rounded raised size="small" onClick={test1Handler} className="tracking-wider w-24"/>}
                 {typeTest === 1 && <Button label="Test 2" severity= "secondary"  rounded raised size="small" onClick={test2Handler} className="tracking-wider w-24"/>}
              </div>
            </div>      
             {isLoading ? loader:
              <div>
                {typeTest ===1 && <div className="flex sm:gap-20">
                  {words.length >= 5 && <Test1  words ={words}/>}
                  {words.length >= 5 && <div className="count mt-52 md:text-5xl sm:text-2xl  text-gray-600 mr-4 xl:ml-0 sm:-ml-8">{quantityRightAnswers}/{countQuestions}</div>}
                </div>}
                {typeTest ===2 && <div>
                  {words.length > 0 && <Test2 words ={words}/>}
                </div>} 
              </div>}
              <div className=" breadcrumb lg:block sm:hidden mt-96 rounded-lg bg-inherit text-gray-600 font-bold text-center absolute ">
                 <BreadCrumb model={items} className="bg-inherit" />
              </div>
         
         </div>
         </>
     )
 

}

export default TestWords;