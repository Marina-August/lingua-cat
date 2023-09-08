import { connectToDB } from "@/utils/database";
import Word from "@/models/word";
import Language from "@/models/language";

export const POST = async (req, res) =>{
    const {userId,source,word, target, translation, example} = await req.json();

    try{
        await connectToDB();
        const sourceLanguage = await Language.findOne({ name:source })
        // console.log("source", sourceLanguage);
        const sourceId = sourceLanguage._id;
        
        const targetLanguage = await Language.findOne({ name:target })
        const targetId = targetLanguage._id;
        const newWord = new Word ({
            user_id: userId,
            source: sourceId,
            word,
            target: targetId,
            translation,
            example
        })

        await newWord.save();
        return new Response(JSON.stringify(newWord),{status:201})
    } catch(error){
        return new Response ("Failed to create  a new word", {status:500})
    }
}