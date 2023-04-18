const express = require("express");
const app = express;;
const mongoose = require('mongoose');
const port = process.env.PORT || 9999;
const {userRouter} = require("./src/routes/users.routes");
const {orderRouter} = require("./src/routes/orders.routes")
const MONGO_URL = "mongodb+srv://Dev1:Tractorlinks1@cluster0.idytdnq.mongodb.net/Tractorlinks?retryWrites=true&w=majority"

app.use(express.json())

mongoose.connect(MONGO_URL).then(() => {
    app.listen(port, (req,res) =>{
        console.log(`express server running at port ${port}`)
    })
}).catch((e)=>{
    console.log("A MongoDB connection error occured",e);
})


