const express = require("express");
const mongoose = require("mongoose");
const app=express();
const PORT=5000;
const {MONGOURI}=require("./keys")


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
mongoose.connection.on("connected",()=>{
    console.log("Cconnected to Mongo");
})
mongoose.connection.on("error",(err)=>{
    console.log("Error connecting  to Mongo",err);
})
require("./server/models/user")
require("./server/models/post")
app.use(express.json())
app.use(require("./server/routes/auth"))
app.use(require("./server/routes/post"))
app.use(require("./server/routes/user")) 



app.listen(PORT,()=>{
    console.log("server is running on: ",PORT);
})