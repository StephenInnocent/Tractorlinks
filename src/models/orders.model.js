const {model, Schema} = require("mongoose")

const orderSchema = new Schema({
    name: String,
    contact: Number,
    location: String,
    date: Date,
})

const orderModel = model ("order", orderSchema)

module.exports = {
    orderModel
}