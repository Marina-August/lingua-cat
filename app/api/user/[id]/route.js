
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await User.findByIdAndRemove(params.id);

        return new Response("User deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting user", { status: 500 });
    }
};