const {orderModel} =  require("../models/orders.model");

async function makeOrder(req,res){

    await orderModel.create({
        name: req.body.name,
        location: req.body.location,
        contact: req.body.contact,
        date: req.body.date,
        class: req.params.serviceID,
        belongsTo: req.params.userID
    }).then(() => {
        console.log(`${req.params.serviceID} order was succesfull`)
    }).catch((e) => {
        console.log(`An error occurred`,e);
    })

    res.send(`Order succesful`).end();
}

async function updateOrder(req,res){
    await orderModel.findOneAndUpdate({belongsTo:req.params.userID,id:req.params.orderID},{...req.body});
    res.send("Order sucessfully updated").end();
}

async function deleteOrder(req,res){
    res.send(`Your request to delete ${req.params.serviceID} order has been received. Email confirmation will be sent to you when the request has been completed. Thank you.`).end()
};

module.exports = {
    makeOrder,
    deleteOrder,
    updateOrder
}