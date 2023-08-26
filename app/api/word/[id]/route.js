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