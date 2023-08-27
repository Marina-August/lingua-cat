"use client";

import Form from "@/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const EditWord =()=>{
    const searchParams = useSearchParams();
    const wordId = searchParams.get('id');
    const [word, setWord] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getWordDetails = async () => {
          const response = await fetch(`/api/word/${wordId}`);
          const data = await response.json();
          setWord(data);
        };
        if (wordId) getWordDetails();
      }, [wordId]);


      const updateWord = async (newWord)=>{
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
            router.push("/personal-page");
          }
        } catch (error) {
          console.log(error);
        }
      }



    return(
        <Form type ="Edit" editWord={word} onUpdateWord ={updateWord}/>
    )
    
}
 export default EditWord;