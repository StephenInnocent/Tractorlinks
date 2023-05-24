const {Router} = require("express");
const {makeOrder, updateOrder, deleteOrderRequest,getCompletedOrders,getMyOrders,getPendingOrders,ordersOffered} = require("../controllers/orders.controller")
const {verifyTokenAndAuthorisation,verifyTokenAndTractorOwner} = require("../middlewares/authentication/auth.middleware")


const router = Router();

router.post("/:serviceID", verifyTokenAndAuthorisation,makeOrder);
router.put("/update", verifyTokenAndAuthorisation,updateOrder);
router.delete("/:id/:serviceID/delete", verifyTokenAndAuthorisation,deleteOrderRequest);
router.get("/:id?status=pending",verifyTokenAndAuthorisation,getPendingOrders);
router.get("/:id?status=completed",verifyTokenAndAuthorisation,getCompletedOrders);
router.get("/:id/",verifyTokenAndAuthorisation,getMyOrders);
router.get("/:id",verifyTokenAndTractorOwner,ordersOffered);


module.exports = {
    orderRouter: router
}