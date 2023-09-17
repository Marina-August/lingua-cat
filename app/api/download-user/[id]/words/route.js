import { jsPDF } from "jspdf";
import { connectToDB } from "@/utils/database";
import Word from "@/models/word";
import autoTable from 'jspdf-autotable'
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async(request,{params})=>{
      try{
        await connectToDB();
        const words = await Word.find({user_id:params.id}).populate('user_id');
        const pdf = new jsPDF({
            format:'a4'
        });

        autoTable(pdf,{
            head:[['Original', 'Translation', 'Example']],
            styles: { fillColor: [255, 128, 0] },
            padding: {
                left: 10,
                top: 2,
                bottom: 2,
              },
            columnStyles: {
                0: {
                    cellWidth: 50,
                   
                },
                1: {
                  cellWidth: 50,
               
                },
                2:{
                  cellWidth: 80,
                   
                },
                cellWidth: 'wrap',
               
              },
            theme: 'grid'
        })
        
        for (let i = 0; i < words.length; i++){
            autoTable(pdf,{
                theme: 'grid',
                columnStyles: {
                    0: {
                      cellWidth: 50
                    },
                    1: {
                      cellWidth: 50
                    },
                    2:{
                      cellWidth: 82
                    },
                    cellWidth: 'wrap'
                  },
                
                body:[[words[i].word, words[i].translation, words[i].example]]
            })

        }

        const headers = new Headers();
        headers.set('Content-Disposition', 'attachment; filename="words.pdf"');
        headers.set('Content-Type', 'application/pdf');

        return new NextResponse(pdf.output(), {
            status: 200,
            headers
        });
    } catch (error) {
        return new Response(error.message, {status:500})
    }
}