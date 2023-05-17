const {Router} = require("express");
const {makeOrder, updateOrder, deleteOrderRequest} = require("../controllers/orders.controller")
const {checkUser} = require("../middlewares/authentication/auth.middleware")


const router = Router();

router.post("/:id/:serviceID", checkUser,makeOrder);
router.put("/:id/update", checkUser,updateOrder);
router.delete("/:id/:serviceID/delete", checkUser,deleteOrderRequest);


module.exports = {
    orderRouter: router
}