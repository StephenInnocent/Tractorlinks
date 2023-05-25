const {orderModel} =  require("../models/orders.model");
const {adminReqModel} = require("../models/adminReq.models");
const { userModel } = require("../models/users.models");
const validator = require("../middlewares/validation/orders.validation");
const errormessage = require("../middlewares/utilities/errormessage");
const session = require("express-session");

async function makeOrder(req,res){
    const result = validator.makeOrderValidator.safeParse(req.body);

    if(!result.success){
        res.status(400).json(errormessage.formatZodError(result.error))
    }else{
        try{
            await orderModel.create({
                name: req.body.name,
                location: req.body.location,
                contact: req.body.contact,
                date: req.body.date,
                state: req.body.state,
                LGA: req.body.LGA,
                time: req.body.time,
                class: req.params.serviceID,
                orderedBy: req.session.email,
            }).then(() => {
                console.log(`${req.params.serviceID} order was succesfull`)
            }).catch((e) => {
                console.log(`An error occurred`,e);
                res.status(500).json("Failed to create order").end();
            })
        
            res.json(`Order succesful`).end();
        } catch(e){
            res.status(500).json("Failed to create order").end();
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
            if(updatedOrder){
                res.json({message:"Order sucessfully updated!. Refresh to view changes ",updatedOrder}).status(200).end();
            }else{
                res.status(500).json("Update failed").end();
            }
           
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

async function ordersOffered(req,res){
    try{
        const orders = await orderModel.find({takenBy:req.params.id}) 
        if(!orders){
            res.json("Sorry, You have no orders offered").end();
        }else{
            res.status(200).json(orders).end();
        }
}catch(e){
    res.status(500).json(e).end()
}
}

async function getMyOrders(req,res){
    const userID = req.session.id;
    try{
        const myOrders = await orderModel.find({orderedBy:req.params.id});

        if(myOrders){
            res.status(200).json(myOrders).end()
        }else{
            res.status(500).json("Cannot find any orders made by you").end()
        }
    } catch(e){
        res.status(500).json(e).end()
    }
    
}

async function getCompletedOrders(req,res){
    try{
        const completedOrders = await orderModel.find({orderedBy:req.params.id,status:req.query.status});

        if(completedOrders){
            res.status(200).json(completedOrders).end()
        }else{
            res.status(500).json("Cannot find any completed orders made by you").end()
        }
    } catch(e){
        res.status(500).json(e).end()
    }
    
}

async function getPendingOrders(req,res){
    try{
        const PendingOrders = await orderModel.find({orderedBy:req.params.id,status:req.query.status});

        if(PendingOrders){
            res.status(200).json(PendingOrders).end()
        }else{
            res.status(500).json("Cannot find any Pending orders made by you").end()
        }
    } catch(e){
        res.status(500).json(e).end()
    }
    
}


module.exports = {
    makeOrder,
    deleteOrderRequest,
    updateOrder,
    getCompletedOrders,
    getMyOrders,
    ordersOffered,
    getPendingOrders
}