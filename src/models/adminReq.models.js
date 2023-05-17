const {model, Schema} = require("mongoose");

const adminReqSchema = new Schema({
       name: String,
       objectId: String,
       email: String,
       description: String,
       reason: String,
       status: {
        type: String,
        enum: ["Pending","Processed"],
        default: "Pending"
       } 
},{timestamps: true})

const adminReqModel = model("adminReq", adminReqSchema);

module.exports = {
    adminReqModel,
}


