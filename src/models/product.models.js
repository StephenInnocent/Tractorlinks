const {model, Schema, trusted} = require("mongoose");

const productSchema = new Schema({
    Name: {
        type: String,
        min: 6,
        max:50
    },
    service: {
        type: string,
    },
    description: {
        type:string
    },
    providedBy: {
        type:string
    },
    deliveryAvailable: {
        type:string,
        default: "No",
        enum: ["Yes","No"]
    },
    statesAvailable: {
        type: Array,
    },
    LGAsAvailable: {
        type: Array,
    }
},{timestamps: true})

const productModel = model("products", productSchema);

module.exports = {
    productModel
}

