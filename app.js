const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 9999;
const {userRouter} = require("./src/routes/users.routes");
const {orderRouter} = require("./src/routes/orders.routes");
const {adminRouter} = require("./src/routes/admin.routes");
const cors = require("cors");
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());
app.use("/orders", orderRouter);
app.use("/users", userRouter);
app.use("/users/admin", adminRouter)

mongoose.connect(MONGO_URL).then(() => {
    app.listen(port, (req,res) =>{
        console.log(`express server running at port ${port}`)
    })
}).catch((e)=>{
    console.log("A MongoDB connection error occured",e);
})


