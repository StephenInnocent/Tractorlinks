const {model, Schema, trusted} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 32
    },
    email: {
        type: String,
        unique:true,
        required:true,
    },
    phoneNumber:{
        type: String,
        unique: true,
        required: true
    },
    role: {
        required: true,
        type:String,
        default: "Farmer",
        enum: ["Farmer","Tractor Owner","Admin"]
    },
    statesOfOperation: {
        type: Array
    },
    LGAsOfOperation: {
        type: Array
    },
    services:{
        type: Array
    },
    workingDays: {
        type: Array
    },
    incomingFunds: {
        type: Number,
    },
    fundsMade: {
        type: Number
    },
    comments:{
        type: Array
    },
    Reviews: {
        type: Array
    },
    noOfTractors: {
        type: Number,
        default: 0
    },
    ordersCompleted:{
        type: Number,
    },
    pendingOrders: {
        type: Number,
    }
    
},{timestamps:true});

const userModel = model("User", userSchema)

module.exports = {
    userModel
};