const {model, Schema} = require("mongoose")

const orderSchema = new Schema({
    name: String,
    contact: Number,
    location: String,
    date: String,
    class: Array,
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