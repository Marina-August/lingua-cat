
import { connectToDB } from "@/utils/database";
import Word from "@/models/word";
import Language from "@/models/language";

export const dynamic = 'force-dynamic';

export const GET = async(request,{params})=>{
    try{
        await connectToDB();
        const words = await Word.find({user_id:params.id}).populate('user_id');
        const languages = await Language.find({});
        return new Response(JSON.stringify({words, languages}), {status:200})
    } catch(error){
        return new Response('Failed to catch all words', {status:500})
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Word.deleteMany({user_id:params.id});

        return new Response("Words deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting words", { status: 500 });
    }
};