import { connectToDB } from "@/utils/database";
import Language from "@/models/language";

export const GET = async(request, {params})=>{
    try{
        await connectToDB();
        const language = await Language.findById(params.idL);
        if(!language){
            return new Response ("Language not found", {status:404})
        }
        return new Response(JSON.stringify(language), {status:200})
    } catch(error){
        return new Response('Failed to catch language', {status:500})
    }
}