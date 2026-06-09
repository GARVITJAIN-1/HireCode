import express from "express"
import {ENV} from "./lib/env.js"
import { connectDB } from "./lib/db.js"
import {serve} from "inngest/express"
import cors from "cors"
import { inngest,functions } from "./lib/inngest.js"
const app=express()

//middleware
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use("/api/inngest",serve({client:inngest,functions}))

app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"success from ff apiss 12345 ff"
    })
})



const startServer=async()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT,()=>{
        console.log("server is running on port:",ENV.PORT);
        
        })
    }catch(error){
        console.error("Error starting in server",error)
    }
}

startServer()
