"use client";

import React from "react";
import { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import Words from "@/components/Words";

import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';



const PersonalPage =()=>{
    const [empty, setEmpty] = useState(true);
    const toast = useRef(null);
    const allWords = useSelector((state)=>state.allWords);
    const dispatch = useDispatch();

    const checkWordsLength=(words)=>{
         if (words.length!==0){
            setEmpty(false);
         }
    }

    const deleteWordHandler = async (word)=>{
        try {
            await fetch(`/api/word/${word._id.toString()}`, {
              method: "DELETE",
            });
            toast.current.show({ severity:'success', summary: 'Success', detail: 'Word is deleted'}) 
            const filteredWords = allWords.filter((item) => item._id !== word._id);
            dispatch(vocabularyCatActions.setAllWords(filteredWords));
          } catch (error) {
            console.log(error);
          }

    }

    return(
        <div>
            {empty && <p>You don't have any words yet!</p>}
             <Toast ref={toast} />
             <Words onCheckWords ={checkWordsLength} onDeleteWord = {deleteWordHandler}/>
        </div>
        
        
    )
}

export default PersonalPage;