import express from "express"
import cors from "cors"
import http from "http"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import authRoutes from "./routes/auth-routes"
import useRoutes from "./routes/user-routes"
import {createClient} from "redis"
dotenv.config()


const app = express();
app.use(express.json())
app.use(cors())
app.use("/auth", authRoutes)
app.use("/user", useRoutes);


app.get("/", (req,res)=> {
        res.send("server is fine")
})

const PORT = process.env.PORT || 3000
export const redisClient = createClient({
  url: process.env.REDIS_URL,
}); 



const startServer = async ()=> {
        try {
          
            await connectDB();
            await redisClient.connect()
            console.log("redis connected")
            const server = http.createServer(app);
            server.listen(PORT, () => {
              console.log("server is running", PORT);
            });
          

        } catch (error) {
            console.log("error while starting eserver", error)
             process.exit(1);
            
        }
}
 
startServer();

