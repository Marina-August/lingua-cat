"use client"

import { DataTable } from 'primereact/datatable';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import {useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useSelector, useDispatch } from 'react-redux';
import { vocabularyCatActions } from '@/redux/store';



// import "/node_modules/flag-icons/css/flag-icons.min.css";


const Words =({onCheckWords, onDeleteWord})=>{
   const [visible, setVisible] = useState(false);
   const [deleteWord, setDeleteWord] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const allWords = useSelector((state)=>state.allWords);
   const dispatch = useDispatch();
   const router = useRouter();

   const fetchWords = async () => {
    setIsLoading(true);
    const response = await fetch("/api/word");
    const data = await response.json();
    const _words = data.words.map(word => {
      return {
        ...word,
        sourceLang: data.languages.find(l => l._id === word.source),
        targetLang: data.languages.find(l => l._id === word.target)
      }
    })
    dispatch(vocabularyCatActions.setAllWords(_words));
    setIsLoading(false);
  };


  useEffect(() => {
    fetchWords();
  }, []);

  const editWord = (word) => {
    router.push(`/personal-page/update-word?id=${word._id}`);
  }

  const  deletetWord =(word)=>{
         setDeleteWord(word);
         setVisible(true);
        
  }

  const accept = () => {
    // toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    onDeleteWord(deleteWord);  
  }

  const reject =()=>{
    setVisible(false);
  }

  const actionsBodyTemplate = (word)=>{
    return (
      <div className="flex justify-center gap-3">
      <Button icon="pi pi-pencil" rounded text raised severity="success" onClick={() => editWord(word)}/>
      <Button icon="pi pi-trash" rounded text raised severity="danger" aria-label="Search" onClick={() => deletetWord(word)} />
      </div>
    )
  }

  const wordBodyTemplate = (word)=>{
    return (
      <div className="flex justify-start gap-5">
        <Image  width={25} height={15} src={`/assets/images/${word.sourceLang.code}.png`} alt="flag" loading="eager" />
        <span>{word.word}</span>
      </div>
    )
  }

  const translationBodyTemplate = (word)=>{
    return (
      <div className="flex justify-start gap-5">
        <Image width={25} height={15} src={`/assets/images/${word.targetLang.code}.png`} alt="flag" loading="eager" />
        <span>{word.translation}</span>
      </div>
    )
  }
  
    const loader = 
    <div className="text-center">
    <div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div>
    </div>;

    return (
      <>
       {isLoading ? loader:
        <div>
         <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" 
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
          {allWords.length===0 && <h1>You don't have any words yet</h1>}
          {allWords.length>0 &&  <Card style={{width:'90%', margin:'-40px auto 0px', minHeight:'85vh', backgroundColor: '#fafafa', position: 'block'}}>
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
          <Column body={wordBodyTemplate} sortable header="Original"
          style={{ width: '22,5%' }}></Column>
          <Column body={translationBodyTemplate} sortable header="Translation" style={{ width: '22,5%' }}></Column>
          <Column field="example" sortable header="Example" 
          style={{ width: '40%' }}
          >
          </Column> 
          <Column body={actionsBodyTemplate}  header="Actions"
          style={{ width: '15%' }}></Column>   
        </DataTable>
      </Card>}
       </div>}
    </>   
    )
}

export default Words;