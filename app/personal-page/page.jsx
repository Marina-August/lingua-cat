"use client";

import { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import Words from "@/components/Words";

import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';


const PersonalPage =()=>{
    const toast = useRef(null);
    const allWords = useSelector((state)=>state.allWords);
    const dispatch = useDispatch();

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
             <Toast ref={toast} />
             <Words onDeleteWord = {deleteWordHandler} />       
        </div>
        
        
    )
}

export default PersonalPage;