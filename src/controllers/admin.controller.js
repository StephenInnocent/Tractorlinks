const {userModel} = require("../models/users.models");
const {orderModel} = require("../models/orders.model");
const {adminReqModel} = require("../models/adminReq.models");
const validator = require("../middlewares/validation/admin.validation");
const errormessage = require("../middlewares/utilities/errormessage");

async function deleteUser(req,res){

    const result = validator.deleteUserValidator.safeParse(req.body)

    console.log(`validated:`.concat(result.success))

    if(!result.success){
        res.status(400).json(errormessage.formatZodError(result.error)).end();
    }else{
        try{
            //find request to delete account made by user and then delete the user and request.
            const reqorder = await adminReqModel.findOne({_id:req.body.id});

            if(reqorder){
                console.log("Delete-account request found!");


                await userModel.deleteOne({_id:reqorder.objectId});

                await adminReqModel.deleteOne({_id:req.body.id})
                console.log("User deleted. Email verification follows");
    
                res.status(200).json("User Account has been deleted succesfully...").end();
            }else{
                res.json("The requested delete-account order does not exist!").end();
            };
        }catch(err){
                res.status(500).json(err).end();
        };   
    }
}

async function deleteOrder(req,res){

    const result = validator.deleteUserValidator.safeParse(req.body)

    console.log(`validated:`.concat(result.success))

    if(!result.success){
        res.status(400).json(errormessage.formatZodError(result.error)).end();
    }else{
        try{
            const reqorder = await adminReqModel.findOne({_id:req.body.id});

            if(reqorder){
                console.log("Delete-order request found!");


                await orderModel.deleteOne({_id:reqorder.objectId});

                await adminReqModel.deleteOne({_id:req.body.id})
                console.log("Order deleted. Email verification follows");
    
                res.status(200).json("Order has been deleted succesfully...").end();
            }else{
                res.json("The requested delete-order request does not exist!").end();
            };
            }catch(err){
                res.status(500).json(err).end();
            }   
    }
}

// async function deleteOrder(req,res){
//     const result = validator.deleteOrderValidator.safeParse(req.body)

//     if(!result.success){
//         res.status(400).json(errormessage.formatZodError(result.error)).end();
//     } else{
//         try{
//             const reqorder = await adminReqModel.findOne({_id: req.body.id})
//             if(reqorder){
//                 console.log("Located delete-order-request to be deleted");
//             } else{
//                 console.log("cannot find the delete request");
//                 res.status(400).json("Cannot order with such id").end()
//             }
            

//             await userModel.deleteOne({_id:reqorder.objectId});

//             await adminReqModel.deleteOne({_id:req.body.id})
//             console.log("Order deleted. Email verification follows");
//             res.status(200).json("Order has been deleted succesfully...").end()
//         } catch(err){
//             res.status(500).json(err).end()
//         }
//     }
// };

async function getAllUsers(){
    try{
        const users = await userModel.aggregate(all)
        res.status(200).json(users).end();
    } catch(e){
        res.status(500).json(e).end();
    };
};


async function getSingleUser(req,res){

    const result = validator.getUserValidator.safeParse(req.body)

    if(!result.success){
        res.status(400).json(errormessage.formatZodError(result.error))
    }else{
        try{
            const user = await userModel.findById(req.body.id);
            if(!user) {
                res.status(400).json("User does not exist").end()
            } else{
                res.status(200).json(user).end();
            }            
        }catch(e){
            res.status(500).json(e).end()
        }
    }
}



module.exports = {
    deleteUser,
    deleteOrder,
    getAllUsers,
    getSingleUser
}