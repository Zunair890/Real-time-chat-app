import express from "express";
import authRoutes from "./routes/auth.route.js"
const app= express();

app.use("/api/auth",authRoutes)
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.listen(4000,()=>{
    console.log("server is running on port 4000")
})