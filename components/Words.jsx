"use client"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import {useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';


const Words =({onCheckWords, onDeleteWord})=>{
   const allWords = useSelector((state)=>state.allWords);
   const dispatch = useDispatch();

   const fetchWords = async () => {
    const response = await fetch("/api/word");
    const data = await response.json();
    console.log('words:', data);
    dispatch(vocabularyCatActions.setAllWords(data))
    onCheckWords(data);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const editWord = (word) => {
    
  }

  const  deletetWord =(word)=>{
       console.log('Delete Id',word);
       onDeleteWord(word);   
  }

  const bodyTemplate = (word)=>{
    return (
      <div className="flex justify-center gap-3">
      <Button icon="pi pi-pencil" rounded text raised severity="success" onClick={() => editWord(word)}/>
      <Button icon="pi pi-trash" rounded text raised severity="danger" aria-label="Search" onClick={() => deletetWord(word)} />
      </div>
    )
  }
    return (
        <div>
        {allWords.length>0 && <Card style={{width:'90%', margin:'-40px auto 0px', minHeight:'85vh', backgroundColor: '#fafafa', position: 'block'}}>
         <DataTable 
        // header = {header}
        value={allWords}
        showGridlines
        // filters={filters}
        rowHover
        stripedRows 
        paginator rows={8}
        // globalFilterFields={['name.common']}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="word" sortable header="Original"
         style={{ width: '22,5%' }}></Column>
        <Column field="translation" sortable header="Translation" style={{ width: '22,5%' }}></Column>
        <Column field="example" sortable header="Example" 
        style={{ width: '40%' }}
        >
        </Column> 
        <Column body={bodyTemplate}  header="Actions"
         style={{ width: '15%' }}></Column>   
      </DataTable>
      </Card>}
       </div>
    )
}

export default Words;