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
    location: {
        type: String,
        required:true,
        min: 6,
    },
    date: {
        type: Date,
        required:true,
    },
    class: {
        type: String,
        default: "Tractor Hiring",
        enum: ["Tractor-Hiring","Fertilisers","Training","Dairy","seedlings","Livestock Management"]
    },
    orderedBy: String,
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