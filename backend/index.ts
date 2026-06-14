import express from "express"
import cors from "cors"
import http from "http"
import dotenv from "dotenv"
dotenv.config()


const app = express();
app.use(express.json())
app.use(cors())

app.get("/", (req,res)=> {
        res.send("srver is fine")
})

const PORT = process.env.PORT || 3000
const server  = http.createServer(app)
server.listen(PORT,()=> {
    console.log("server is running", PORT)
})