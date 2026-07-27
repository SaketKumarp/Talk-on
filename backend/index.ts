import express from "express"
import cors from "cors"
import http from "http"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import authRoutes from "./routes/auth-routes"
import useRoutes from "./routes/user-routes"
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

const startServer = async ()=> {
        try {
            await connectDB();
            const server = http.createServer(app);
            server.listen(PORT, () => {
              console.log("server is running", PORT);
            });

        } catch (error) {
            console.log("error while starting eserver", error)
            throw Error
        }
}
// alright i will add some codes here 
startServer();

