"use client";

import Form from "@/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const EditWord =()=>{
    const searchParams = useSearchParams();
    const wordId = searchParams.get('id');
    const [word, setWord] = useState('');
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getWordDetails = async () => {
          const response = await fetch(`/api/word/${wordId}`);
          const data = await response.json();
          const resSource = await fetch (`/api/language/${data.source}`)
          const dataSource = await resSource.json();
          const resTarget = await fetch (`/api/language/${data.target}`)
          const dataTarget = await resTarget.json();
          setWord(data);
          setSource(dataSource);
          setTarget(dataTarget);
        };
        if (wordId) getWordDetails();
      }, [wordId]);


      const updateWord = async (newWord)=>{
        console.log("new word", newWord)
        try {
          const response = await fetch(`/api/word/${wordId}`, {
            method: "PATCH",
            body: JSON.stringify({
                source: newWord.source,
                word:newWord.enteredWord ,
                target: newWord.target,
                translation: newWord.targetWord ,
                example: newWord.usage
            }),
          });
    
          if (response.ok) {
            router.push("/personal-page/");
          }
        } catch (error) {
          console.log(error);
        }
      }



    return(
        <Form type ="Edit" editWord={word} onUpdateWord ={updateWord} sourceL ={source} targetL ={target}/>
    )
    
}
 export default EditWord;