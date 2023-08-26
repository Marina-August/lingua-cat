import { connectToDB } from "@/utils/database";
import Word from "@/models/word";

export const dynamic = 'force-dynamic';

export const GET = async(request)=>{
    try{
        await connectToDB();
        const words = await Word.find({});
        return new Response(JSON.stringify(words), {status:200})
    } catch(error){
        return new Response('Failed to catch all words', {status:500})
    }
}