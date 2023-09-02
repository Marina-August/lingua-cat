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



const Words =({onCheckWords, onDeleteWord})=>{
   const [visible, setVisible] = useState(false);
   const [deleteWord, setDeleteWord] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingPdf, setIsLoadingPdf] = useState(false);
   const [isfilter, setIsfilter] = useState(false);
   const [isFinnish, setIsFinnish] = useState (false);
   const [isEnglish, setIsEnglish] = useState(false);
   const [isAllLanguages, setIsAllLanguages] = useState(true);
   const [wordsForTable, setWordsForTable] = useState([]);
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
    setWordsForTable(_words);
    dispatch(vocabularyCatActions.setAllWords(_words));
    setIsLoading(false);
  };

  // const fetchFinnishWords = async () => {
  //   setIsLoading(true);
  //   const response = await fetch("/api/word");
  //   const data = await response.json();
  //   const _words = data.words.map(word => {
  //     return {
  //       ...word,
  //       sourceLang: data.languages.find(l => l._id === word.source),
  //       targetLang: data.languages.find(l => l._id === word.target)
  //     }
  //   })
  //   const finnishWords = _words.filter(el=> el.sourceLang.code == "Fi");
  //   dispatch(vocabularyCatActions.setAllWords(finnishWords));
  //   setIsLoading(false);
  // };

  const fetchFinnishWords = ()=>{
    const _words = [...allWords];
    const finnishWords = _words.filter(el=> el.sourceLang.code == "Fi");
    setWordsForTable(finnishWords);
  }

  // const fetchEnglishWords = async () => {
  //   setIsLoading(true);
  //   const response = await fetch("/api/word");
  //   const data = await response.json();
  //   const _words = data.words.map(word => {
  //     return {
  //       ...word,
  //       sourceLang: data.languages.find(l => l._id === word.source),
  //       targetLang: data.languages.find(l => l._id === word.target)
  //     }
  //   })
  //   const englishWords = _words.filter(el=> el.sourceLang.code == "En");
  //   dispatch(vocabularyCatActions.setAllWords(englishWords));
  //   setIsLoading(false);
  // };

  const fetchEnglishWords = ()=>{
    const _words = [...allWords];
    const englishWords = _words.filter(el=> el.sourceLang.code == "En");
    setWordsForTable(englishWords);
  }


  useEffect(() => {
    const all = Number(localStorage.getItem('all'));
    const finnish = Number(localStorage.getItem('finnish'));
    const english = Number (localStorage.getItem('english'));
    setIsAllLanguages(all);
    setIsFinnish(finnish);
    setIsEnglish(english);
    if (all == 1){
       console.log("ALL")
        fetchWords(); 
    } else if(finnish == 1){
       console.log ("FINNISH")
        fetchFinnishWords();
    } else if (english == 1){
        fetchEnglishWords();
    } else
    {
       fetchWords();
    }
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

    const downloadHandler = async ()=>{
        setIsLoadingPdf(true);
        try {
          const response = await fetch("/api/download");
          console.log("client load", response)
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'words.pdf';
          a.click();
        } catch (error) {
          console.error('Error downloading PDF', error);
        }
        setIsLoadingPdf(false);
    }

    const filterHandler=()=>{
      setIsfilter((prevIsFilter)=>{return !prevIsFilter});
    }

    const allLanguagesHandler =()=>{
      setIsAllLanguages(true);
      setIsFinnish(false);
      setIsEnglish(false);
      localStorage.setItem('finnish', 0);
      localStorage.setItem('english', 0);
      localStorage.setItem('all', 1);
      fetchWords();
    }

    const sourceFinnishHandler =()=>{
        setIsFinnish(true);
        setIsEnglish(false); 
        setIsAllLanguages(false);
        localStorage.setItem('finnish', 1);
        localStorage.setItem('english', 0);
        localStorage.setItem('all', 0);
    }

    useEffect(()=>{
      if (isFinnish === true){
      fetchFinnishWords();
    } else{
      
    }

    },[isFinnish])

    const sourceEnglishHandler =()=>{
      setIsEnglish(true);
      setIsFinnish(false);
      setIsAllLanguages(false);
      localStorage.setItem('finnish', 0);
      localStorage.setItem('english', 1);
      localStorage.setItem('all', 0);
    }

    useEffect(()=>{
      if (isEnglish === true){
      fetchEnglishWords();
    } else{
   
    }

    },[isEnglish])


    return (
      <>
       {isLoading ? loader:
        <div>
         <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" 
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
          {allWords.length===0 && <h1>You don't have any words yet</h1>}
          {allWords.length>0 &&  <Card style={{width:'90%', margin:'-40px auto 0px', minHeight:'85vh', backgroundColor: '#fafafa', position: 'block'}}>
            <div className="flex justify-between">
              <div className="mb-8 text-end ">
               <Button  label = {isfilter? "Hide Filter":"Choose Language"} icon="pi pi-filter"  severity="secondary" rounded text raised 
                size="small" onClick={filterHandler}/>
            </div>
            <div className="mb-8 text-end ">
               <Button  label = {isLoadingPdf ? "Downloading pdf": "Download"} icon="pi pi-download"  severity="secondary" rounded text raised 
               aria-label='Download' size="small" onClick={downloadHandler}/>
            </div>
            </div> 
            {isfilter && 
              <div className="flex gap-4 border-slate-300 mb-8">
                <p className="font-medium">Original:</p>
                <div className={`${isAllLanguages? 'bg-orange-400': ''} w-9 rounded cursor-pointer `}>
                   <Image width={30} height={25} src="/assets/images/Earth.png" alt="Earth" loading="eager" className="icon" onClick={allLanguagesHandler}/>
                </div>
                <div className={`${isFinnish? 'bg-orange-400': ''} w-9 rounded cursor-pointer `}>
                   <Image width={30} height={25} src="/assets/images/Fi.png" alt="FI flag" loading="eager" className="icon" onClick={sourceFinnishHandler}/>
                </div>
                <div className={`${isEnglish? 'bg-orange-400': ''} w-9 rounded cursor-pointer`}>
                <Image width={30} height={25} src="/assets/images/En.png" alt="EN flag" loading="eager" className="icon" onClick ={sourceEnglishHandler}/>
                </div>   
              </div>}
          <DataTable 
          // header = {header}
          value={wordsForTable}
          showGridlines
          // filters={filters}
          rowHover
          stripedRows 
          paginator rows={8}
          // globalFilterFields={['name.common']}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column body={wordBodyTemplate} sortable header="Original"
          field="word"
          style={{ width: '22,5%' }}></Column>
          <Column body={translationBodyTemplate} sortable header="Translation" style={{ width: '22,5%' }} field="translation"></Column>
          <Column field="example"  header="Example" 
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