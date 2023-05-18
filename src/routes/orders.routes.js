const {Router} = require("express");
const {makeOrder, updateOrder, deleteOrderRequest,getCompletedOrders,getMyOrders,getPendingOrders,ordersOffered} = require("../controllers/orders.controller")
const {checkUser,checkTractorOwner} = require("../middlewares/authentication/auth.middleware")


const router = Router();

router.post("/:id/:serviceID", checkUser,makeOrder);
router.put("/:id/update", checkUser,updateOrder);
router.delete("/:id/:serviceID/delete", checkUser,deleteOrderRequest);
router.get("/:id?status=pending",checkUser,getPendingOrders);
router.get("/:id?status=completed",checkUser,getCompletedOrders);
router.get("/:id/",checkUser,getMyOrders);
router.get("/:id",checkTractorOwner,ordersOffered)


module.exports = {
    orderRouter: router
}