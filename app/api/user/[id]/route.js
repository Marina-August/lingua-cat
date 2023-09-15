
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const dynamic = 'force-dynamic';

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await User.findByIdAndRemove(params.id);

        return new Response("User deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting user", { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {
    const { image} = await request.json();

    try {
        await connectToDB();
        // Find the existing User by ID
        const existingUser = await User.findById(params.id);

        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }

        // Update the user with new data
        existingUser.image = image;
        await existingUser.save();

        return new Response("Successfully updated the User", { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};

export const GET = async(request, {params})=>{
    try{
        await connectToDB();
        const user = await User.findById(params.id);
        if(!user){
            return new Response ("User not found", {status:404})
        }

        return new Response(JSON.stringify(user), {status:200})
    } catch(error){
        return new Response('Failed to catch word', {status:500})
    }
}
