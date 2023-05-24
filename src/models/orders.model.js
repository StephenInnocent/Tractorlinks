const {model, Schema} = require("mongoose")

const orderSchema = new Schema({
    name: {
        type: String,
        required:true,
        min: 6,
    },
    contact: {
        type: Number,
        required:true,
        min: 6,
    },
    state:{
        type: String,
        required:true
    },
    LGA:{
        type:String,
        required:true
    },
    location: {
        type: String,
        required:true,
        min: 6,
    },
    date: {
        type: String,
        required:true,
    },
    time: {
        type: String
    },
    typeOfTractor:{
        type: String
    },
    class: {
        type: String,
        default: "Tractor Hiring",
        enum: ["Tractor-Hiring","Fertilisers","Training","Dairy","seedlings","Livestock Management"]
    },
    orderedBy: {
        type:String,
    },
    takenBy: String,
    status: {
        type: String,
        default:"processing",
        enum: ["processing","pending","completed"]
    }
},{timestamps:true})

const orderModel = model ("order", orderSchema)

module.exports = {
    orderModel
}