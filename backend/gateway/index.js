import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors"
import cookieParser from "cookie-parser"
import protect from "./middleware/auth.middleware.js"
import getCurrentUser from "./controller/user.controller.js"
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js"
import morgan from "morgan"
dotenv.config()

const port =process.env.PORT

const app=express()
console.log(process.env.FRONTEND_URL)
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
})) 
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/chat",protect,proxyWithHeaders(process.env.CHAT_SERVICE))
app.use("/api/agent",protect,proxyWithHeaders(process.env.AGENT_SERVICE))
app.use("/api/me",protect,getCurrentUser)

app.get("/",(req,res)=>{
    res.json({message : "hello from express"})
})
app.listen(port,()=>{
    console.log(`gateway started at ${port}`)
})