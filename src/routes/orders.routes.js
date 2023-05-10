const {Router} = require("express");
const {makeOrder, updateOrder, deleteOrderRequest} = require("../controllers/orders.controller")
const {verifyTokenAndAdmin, verifyTokenAndAuthorisation} = require("../middlewares/auth.middleware")


const router = Router();

router.post("/:id/:serviceID", verifyTokenAndAuthorisation,makeOrder);
router.put("/:id/:serviceID", verifyTokenAndAuthorisation,updateOrder);
router.delete("/:id/:serviceID", verifyTokenAndAuthorisation,deleteOrderRequest);


module.exports = {
    orderRouter: router
}