const express=require("express");
const DataBase=require("./config/dataBase");
const Mentor=require("./routers/mentor");
const Students=require("./routers/students");

const app=express()
DataBase();
app.use(express.json())
app.use("/mentor",Mentor);
app.use("/students",Students)

app.get("/",(req,res)=>{
    res.json("its working two router mentor and students")
})
app.listen(8080,()=>{
    console.log("Server Started");
})