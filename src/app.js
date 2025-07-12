const express = require("express");

const app = express();

// app.use("/",(req, res)=>{
//     res.send("Hello 1 utkarsh world");
// })

app.use("/hello",(req, res, )=>{
    res.send("Test route is working");

});
app.use("/test",(req, res)=>{
    res.send("Hello utkarsh world");
})

app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})