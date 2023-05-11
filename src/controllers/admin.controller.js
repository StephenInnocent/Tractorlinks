const {userModel} = require("../models/users.models");
const {orderModel} = require("../models/orders.model");
const {adminReqModel} = require("../models/adminReq.models")

async function deleteUser(req,res){
    try{
        const reqorder = await adminReqModel.findOne({_id: req.params.requestID})
        console.log("Located order to be deleted");
        
        await orderModel.deleteOne({_id:reqorder.objectId});
        await adminReqModel.deleteOne({_id:req.params.requestID})
        console.log("Order deleted. Email verification follows");
        res.status(200).json("Order has been deleted succesfully...")
    } catch(e){
        res.status(500).json(e)
    }
};

async function deleteOrder(req,res){
    try{
        const reqorder = await adminReqModel.findOne({_id: req.params.requestID})
        console.log("Located delete-account-request to be deleted");
        
        await userModel.deleteOne({_id:reqorder.objectId});
        await adminReqModel.deleteOne({_id:req.params.requestID})
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