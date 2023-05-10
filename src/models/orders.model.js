const {model, Schema} = require("mongoose")

const orderSchema = new Schema({
    name: String,
    contact: Number,
    location: String,
    date: String,
    class: {
        type: String,
        default: "Tractor Hiring",
        // enum: ["Tractor-Hiring","Agro-chemicals","Extension-services"]
    },
    belongsTo: String,
    status: {
        type: String,
        default:"pending",
        enum: ["pending","completed"]
    }
},{timestamps:true})

const orderModel = model ("order", orderSchema)

module.exports = {
    orderModel
}