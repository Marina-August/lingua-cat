import { connectToDB } from "@/utils/database";
import Language from "@/models/language";


const LANGUAGES = [
    {
        name:"Finnish",
        code:"Fi",
    },
    {
        name:"English",
        code:"En"
    },

]

const addLanguages = async ()=>{
    await connectToDB();
    const newLanguage = new Language ({
        name: "English",
        code:"En"
    })
    const res = await newLanguage.save();
}

export default addLanguages;