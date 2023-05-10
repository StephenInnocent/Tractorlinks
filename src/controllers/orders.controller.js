const {orderModel} =  require("../models/orders.model");
const {adminReqModel} = require("../models/adminReq.models");
const { userModel } = require("../models/users.models");

async function makeOrder(req,res){
    try{
        await orderModel.create({
            name: req.body.name,
            location: req.body.location,
            contact: req.body.contact,
            date: req.body.date,
            class: req.params.serviceID,
            OrderedBy: req.params.id
        }).then(() => {
            console.log(`${req.params.serviceID} order by ${req.params.id} was succesfull`)
        }).catch((e) => {
            console.log(`An error occurred`,e);
            res.status(500).json("Failed to create order");
        })
    
        res.send(`Order succesful`).end();
    } catch(e){
        res.send(500).end();
    }
    
}

async function updateOrder(req,res){
    try{
        await orderModel.findOneAndUpdate({_id:req.params.serviceID},{...req.body});
    res.json("Order sucessfully updated").status(200).end();
    } catch(e) {
        console.log(e);
        res.status(500).json("Update failed").end();
    }
    
}

async function deleteOrderRequest(req,res){
    try{
        const Maker = await userModel.findOne({_id:req.params.id});
        if(Maker){
            await adminReqModel.create({
                name: Maker.name,
                objectId: req.params.serviceID,
                email: Maker.email,
                // description: req.query.description,
                reason: req.body.reason
            })
        } else(e) => {
            console.log("Request Maker not found");
            res.status(500).end()
        }
        

        res.send(`Your request to delete ${req.params.serviceID} order has been received. Email confirmation will be sent to you when the request has been completed. Thank you.`).end()
    } catch(e){
        res.status(500).json("Sorry! Could'nt make delete request.")
    }
    
};


module.exports = {
    makeOrder,
    deleteOrderRequest,
    updateOrder
}