import { connectToDB } from "@/utils/database";
import Word from "@/models/word";

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the word by ID and remove it
        await Word.findByIdAndRemove(params.id);

        return new Response("Word deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting word", { status: 500 });
    }
};

export const GET = async(request, {params})=>{
    try{
        await connectToDB();
        const word = await Word.findById(params.id);
        if(!word){
            return new Response ("Word not found", {status:404})
        }

        return new Response(JSON.stringify(word), {status:200})
    } catch(error){
        return new Response('Failed to catch word', {status:500})
    }
}

export const PATCH = async (request, { params }) => {
    const { source,word, target, translation, example } = await request.json();

    try {
        await connectToDB();

        // Find the existing word by ID
        const existingWord = await Word.findById(params.id);

        if (!existingWord) {
            return new Response("Word not found", { status: 404 });
        }

        // Update the word with new data
        existingWord.source = source;
        existingWord.word = word;
        existingWord.target = target;
        existingWord.translation = translation;
        existingWord.example = example;

        await existingWord.save();

        return new Response("Successfully updated the Word", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Word", { status: 500 });
    }
};
