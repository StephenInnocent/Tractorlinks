const {Router} = require("express");
const {makeOrder, updateOrder, deleteOrderRequest} = require("../controllers/orders.controller")
const {verifyTokenAndAuthorisation} = require("../middlewares/authentication/auth.middleware")


const router = Router();

router.post("/:id/:serviceID", verifyTokenAndAuthorisation,makeOrder);
router.put("/:id/update", verifyTokenAndAuthorisation,updateOrder);
router.delete("/:id/:serviceID/delete", verifyTokenAndAuthorisation,deleteOrderRequest);


module.exports = {
    orderRouter: router
}