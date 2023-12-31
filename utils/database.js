import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);

if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }
  try {


    await mongoose.connect( process.env.MONGODB_URI
       , {
      dbName: "personal_dictionary",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, 
      serverSelectionTimeoutMS: 30000, 
    })
    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error, "Our Error");

  }
}