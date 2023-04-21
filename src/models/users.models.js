const {model, Schema} = require("mongoose")

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    phoneNumber:{
        type: Number,
        unique: true
    },
    role: {
        type:String,
        default: "Farmer",
        enum: ["Farmer","TractorOwner"]
    },
    tractors: Number,
    ordersCompleted: Number,
    pendingOrders: Number,
});

const userModel = model("User", userSchema)

module.exports = {
    userModel
};