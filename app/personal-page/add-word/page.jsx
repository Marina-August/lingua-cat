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

  // useEffect(()=>{
  //   const count = localStorage.getItem('counter');
  //   if(count){
  //      dispatch(vocabularyCatActions.setCounter(count))
  //   }else{

  //   }
  //  },[])

    const addWord = async (word)=>{
        console.log("page", word)
        try {
            const response = await fetch("../api/word/new", {
              method: "POST",
              body: JSON.stringify({
                source: word.source,
                word:word.enteredWord ,
                target: word.target,
                translation: word.targetWord ,
                example: word.usage
              }),
            });
      
            if (response.ok) {
            //   router.push("/personal-page");
              console.log("ok");
              toast.current.show({ severity:'success', summary: 'Success', detail: 'Word is added' , 
              // sticky: true
            });

              if(isAwake){
                 dispatch(vocabularyCatActions.increment());
                 localStorage.setItem('counter', counter+1); // set localstorage to remember after reloading how much hunger is
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