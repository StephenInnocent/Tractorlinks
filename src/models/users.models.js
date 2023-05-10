const {model, Schema, trusted} = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
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
        type: Number,
        unique: true,
        required: true
    },
    role: {
        required: true,
        type:String,
        default: "Farmer",
        enum: ["Farmer","Tractor Owner","Admin"]
    },
    tractors: Number,
    ordersCompleted: Number,
    pendingOrders: Number,
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // },
    accessToken: String,
},{timestamps:true});

const userModel = model("User", userSchema)

module.exports = {
    userModel
};