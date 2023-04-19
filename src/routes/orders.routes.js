const {Router} = require("express");
const {makeOrder, updateOrder, deleteOrder} = require("../controllers/orders.controller")

const router = Router();

router.post("/:userID/:serviceID", makeOrder);
router.patch("/:userID/:serviceID", updateOrder);
router.delete("/:userID/:serviceID", deleteOrder)

module.exports = {
    orderRouter: router
}