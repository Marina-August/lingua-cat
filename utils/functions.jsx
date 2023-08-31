import { jsPDF } from "jspdf";


export const fetchWordsServer = async () => {
    const response = await fetch("/api/word"
    , { 
      next: {
        revalidate: 0 // use 0 not to use cache
      },
    }); 
    const data = await response.json();
    return data;
  };

