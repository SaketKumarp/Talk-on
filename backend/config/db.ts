
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

export const connectDB= async () : Promise<void>=> {
        try{
            await mongoose.connect(process.env.MONGO_URI as string);
            console.log("MongoDB connected !")
        }catch (error){
                console.log("db copnnection error", error)
                throw Error
        }
        
}
 // redish -- pub-sub model 
 // 