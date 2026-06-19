import express from "express"
import {ENV} from "./lib/env.js"
import { connectDB } from "./lib/db.js"
import {serve} from "inngest/express"
import cors from "cors"
import { inngest,functions } from "./lib/inngest.js"
import {clerkMiddleware} from '@clerk/express'
import path from "path"
import { protectRoute } from "./middleware/protectRoute.js"
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"
import codeRoutes from "./routes/code.route.js";

const app=express()
const __dirname=path.resolve()
//middleware
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(clerkMiddleware())
app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chat",chatRoutes)
app.use("/api/sessions",sessionRoutes)
app.use("/api/code", codeRoutes);

app.get("/api/health",(req,res)=>{
    res.status(200).json({
        msg:"success from ff apiss 12345 ff"
    })
})

if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
    })
}

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
