// "use client";

// import { useEffect, useState } from "react";
// import Image from 'next/image';
// import Test1 from "@/components/Test1";
// import { useSelector, useDispatch } from 'react-redux';

// import { vocabularyCatActions } from '@/redux/store';

// const MyWords = ()=>{
//     const [isFinnish, setIsFinnish] = useState (false);
//     const [isEnglish, setIsEnglish] = useState(false);
//     const [isAllLanguages, setIsAllLanguages] = useState(true);
//     const [words, setWords] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const dispatch = useDispatch();
//     const allWords = useSelector((state)=>state.allWords);

//     const fetchWords = async () => {
//         setIsLoading(true);
//         const response = await fetch("/api/word");
//         const data = await response.json();
//         const _words = data.words.map(word => {
//           return {
//             ...word,
//             sourceLang: data.languages.find(l => l._id === word.source),
//             targetLang: data.languages.find(l => l._id === word.target)
//           }
//         })
//         setWords(_words);
//         dispatch(vocabularyCatActions.setAllWords(_words));
//         setIsLoading(false);
//       };

//     useEffect(()=>{
//         fetchWords();     
//     }, [])

//     const allLanguagesHandler =()=>{
//         setIsAllLanguages(true);
//         setIsFinnish(false);
//         setIsEnglish(false);
//         fetchWords();
//     }
 
//     const sourceEnglishHandler =()=>{
//       setIsEnglish(true);
//       setIsFinnish(false);
//       setIsAllLanguages(false);
//       const _words = [...allWords];
//       const englishWords = _words.filter(el=> el.sourceLang.code == "En");
//       setWords(englishWords);
//     }

 
//     const sourceFinnishHandler =()=>{
//         setIsFinnish(true);
//         setIsEnglish(false); 
//         setIsAllLanguages(false);
//         const _words = [...allWords];
//         const finnishWords = _words.filter(el=> el.sourceLang.code == "Fi");
//         setWords(finnishWords);
//     }
 
 
 
//      return(
//          <div>
//              <div className="flex gap-4 border-slate-300 mb-8">
//                  <h2>Language:</h2>
//                  <div className={`${isAllLanguages? 'bg-orange-400': ''} w-9 rounded cursor-pointer `}>
//                     <Image width={30} height={25} src="/assets/images/Earth.png" alt="Earth" loading="eager" className="icon" onClick={allLanguagesHandler}/>
//                  </div>
//                  <div className={`${isFinnish? 'bg-orange-400': ''} w-9 rounded cursor-pointer `}>
//                     <Image width={30} height={25} src="/assets/images/Fi.png" alt="FI flag" loading="eager" className="icon" onClick={sourceFinnishHandler}/>
//                  </div>
//                  <div className={`${isEnglish? 'bg-orange-400': ''} w-9 rounded cursor-pointer`}>
//                  <Image width={30} height={25} src="/assets/images/En.png" alt="EN flag" loading="eager" className="icon" onClick ={sourceEnglishHandler}/>
//                  </div> 
//                  {words.length > 0 && <Test1  words ={words}/>} 
//                  {words.length === 0 && <h2>Sorry. You should have at least 5 words in your dictionary to do tests.</h2>} 

//              </div>
             
//          </div>
//      )
 

// }

// export default MyWords;