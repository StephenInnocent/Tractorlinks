const {userModel} = require("../models/users.models");
const {orderModel} = require("../models/orders.model");
const {adminReqModel} = require("../models/adminReq.models")

async function deleteUser(req,res){
    try{
        await userModel.findByIdAndDelete(req.params.objectId)
        res.status(200).json("User has been deleted succesfully...")
    } catch(e){
        res.status(500).json(e)
    }
};

async function deleteOrder(req,res){
    try{
        const maker = await orderModel.findOne({_id:req.params.serviceID})
        console.log("Located order to be deleted");
        
        await orderModel.deleteOne({name:maker.name, contact:maker.contact});
        await adminReqModel.deleteOne({objectId: req.params.serviceID})
        console.log("Order deleted. Email verification follows");
        res.status(200).json("Order has been deleted succesfully...")
    } catch(e){
        res.status(500).json(e)
    }
};


module.exports = {
    deleteUser,
    deleteOrder
}