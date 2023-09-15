"use client";

import Form from "@/components/Form";
import { useDispatch, useSelector} from 'react-redux';
import { vocabularyCatActions } from "@/redux/store";
import { useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';


const AddWord =()=>{
  const counter = useSelector((state)=> state.counter);
  const wordIsAdded = useSelector((state)=>state.wordIsAdded);
  const isAwake = useSelector((state)=>state.isAwake)
  const toast = useRef(null);

  const dispatch = useDispatch();

    const addWord = async (word)=>{
        console.log("page", word)
        try {
            const response = await fetch("../api/word/new", {
              method: "POST",
              body: JSON.stringify({
                userId: word.user,
                source: word.source,
                word:word.enteredWord ,
                target: word.target,
                translation: word.targetWord ,
                example: word.usage
              }),
            });
      
            if (response.ok) {
              console.log("ok");
              toast.current.show({ severity:'success', summary: 'Success', detail: 'Word is added' , 
              // sticky: true
            });

              if(isAwake){
                 dispatch(vocabularyCatActions.increment());
              } else{

              }
        
            }
          } catch (error) {
            console.log(error);
          } 
    }

    return (
        <>
        <Toast ref={toast} />
        <Form type="Add" onWordHandler={addWord} />
         </>
    )
}

export default AddWord;