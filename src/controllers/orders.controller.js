const {orderModel} =  require("../models/orders.model");
const {adminReqModel} = require("../models/adminReq.models");
const { userModel } = require("../models/users.models");
const validator = require("../middlewares/validation/orders.validation");
const errormessage = require("../middlewares/utilities/errormessage")

async function makeOrder(req,res){
    const result = validator.makeOrderValidator.safeParse(req.body)

    if(!result.success){
        res.status(400).json(errormessage.formatZodError(result.error))
    }else{

        try{
            await orderModel.create({
                name: req.body.name,
                location: req.body.location,
                contact: req.body.contact,
                date: req.body.date,
                class: req.params.serviceID,
                orderedBy: req.params.id
            }).then(() => {
                console.log(`${req.params.serviceID} order by ${req.params.id} was succesfull`)
            }).catch((e) => {
                console.log(`An error occurred`,e);
                res.status(500).json("Failed to create order").end();
            })
        
            res.send(`Order succesful`).end();
        } catch(e){
            res.status(500).end();
        }
    }
    
    
}

async function updateOrder(req,res){

    const result = validator.updateValidator.safeParse(req.body)

    if(!result.success){
        res.status(400).json(errormessage.formatZodError(result.error))
    } else{
        try{
            const updatedOrder = await orderModel.findOneAndUpdate({_id:req.body.id},{...req.body});
        res.json({message:"Order sucessfully updated!. Refresh to view changes ",updatedOrder}).status(200).end();
        } catch(e) {
            console.log(e);
            res.status(500).json("Update failed").end();
        }
    }

}

async function deleteOrderRequest(req,res){
    const result = validator.deleteValidator.safeParse(req.body,req.params)

    if(!result.success){
        res.status(400).json(errormessage.formatZodError(result.error))
    } else{
        try{
            try{
                const Maker = await userModel.findOne({_id:req.params.id});
                if(Maker){
                    let order = await orderModel.findById(req.params.serviceID);
                    if(!order){
                        res.status(500).json("Order to be deleted not found!")
                    } else{
                        await adminReqModel.create({
                            name: Maker.name,
                            objectId: req.params.serviceID,
                            email: Maker.email,
                            description: req.query.description,
                            reason: req.body.reason
                        })
                        res.send(`Your request to delete ${req.params.serviceID} order has been received. Email confirmation will be sent to you when the request has been completed. Thank you.`).end()
                    }
                } else{
                    console.log("Request Maker not found");
                    res.status(500).json("Request Maker not found").end()
                }
            }catch(e){
                res.json(e).status(500).end()
            }
            
    
        } catch(e){
            res.status(500).json("Sorry! Could'nt make delete request.")
        }
    }
};


module.exports = {
    makeOrder,
    deleteOrderRequest,
    updateOrder,
}