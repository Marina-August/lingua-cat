import { jsPDF } from "jspdf";
import { connectToDB } from "@/utils/database";
import Word from "@/models/word";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async(request)=>{
      try{
        await connectToDB();
        const words = await Word.find({});
        console.log("download",words)
        const data = JSON.stringify(words);
       
        const pdf = new jsPDF({
            format:'a4'
        });
        
        for (let i = 0; i < words.length; i++){
            pdf.text(20, 20+ (i*10), words[i].word);
            // pdf.text()
        }


        const headers = new Headers();
        headers.set('Content-Disposition', 'attachment; filename="words.pdf"');
        headers.set('Content-Type', 'application/pdf');

        return new NextResponse(pdf.output(), {
            status: 200,
            headers
        });
    
    } catch (error) {
        console.error(error);
        return new Response('Failed to catch all words', {status:500})
    }
}