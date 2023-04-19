const {userModel} = require("../models/users.models");

async function checkRole(req,res, next){
const user = await userModel.findOne({_id:req.params.userID})
if(!user || user.role !== "Farmer") return res.send("Permission denied").end()
}