const {model, Schema} = require("mongoose");

const adminReqSchema = new Schema({
       name: String,
       objectId: String,
       email: String,
       description: String,
       reason: String
},{timestamps: true})

const adminReqModel = model("adminReq", adminReqSchema);

module.exports = {
    adminReqModel,
}


