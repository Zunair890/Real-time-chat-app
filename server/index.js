import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv";
import { connectDB } from "./lib/mongodb.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


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