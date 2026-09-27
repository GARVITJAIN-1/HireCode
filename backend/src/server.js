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

import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
//middleware
app.use(express.json());
const normalizeOrigin = (url) => url?.trim().replace(/\/+$/, "");
const allowedOrigins = [ENV.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"]
  .filter(Boolean)
  .map(normalizeOrigin);
app.use(
  cors((req, callback) => {
    const origin = normalizeOrigin(req.header("Origin"));
    // the frontend is served by this same server in production, so its own origin is always allowed
    const sameOrigin = origin === `${req.protocol}://${req.get("host")}` || origin === `https://${req.get("host")}`;
    const allowed = !origin || sameOrigin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost:");
    // never throw here: an error turns every request (including JS/CSS assets) into a 500
    callback(null, { origin: allowed, credentials: true });
  })
);
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

if (ENV.NODE_ENV === "production") {
    const distPath = [
        path.resolve(__dirname, "../../frontend/dist"),
        path.resolve(process.cwd(), "frontend/dist"),
        path.resolve(__dirname, "../frontend/dist"),
    ].find((p) => fs.existsSync(p)) || path.resolve(__dirname, "../../frontend/dist");

    console.log("Serving static frontend from:", distPath);

    app.use(express.static(distPath));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
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
