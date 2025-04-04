import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv";
import { connectDB } from "./lib/mongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app= express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// as when we make a reequest from frontend to backend there is some conflict due to they are not on same url, so we use th cors

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Access-Control-Allow-Origin"]
    })
)




const PORT= process.env.PORT;


//routes
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


app.get("/",(req,res)=>{
    res.send("Hello world")
});
app.listen(PORT,()=>{
    console.log("server is running on port "+ PORT);
    connectDB();
})