import * as dotenv from "dotenv"
import mongoose from "mongoose";

export const connectToDataBase = async () => {
    dotenv.config()

    const mongoUrl = process.env.MONGO_URL || ""

    try{
        await mongoose.connect(mongoUrl)
        console.log("Successfully connect to dataBase")
    }
    catch (e){
        console.log("Error connect to dataBase")
    }

}