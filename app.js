const express = require("express");
const mongoose = require("mongoose");
const app=express();
const PORT=5000;
const {MONGOURI}=require("./keys")

require("./server/models/user")
app.use(express.json())
app.use(require("./server/routes/auth"))

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected",()=>{
    console.log("Cconnected to Mongo");
})
mongoose.connection.on("error",(err)=>{
    console.log("Error connecting  to Mongo",err);
})

app.listen(PORT,()=>{
    console.log("server is running on: ",PORT);
})