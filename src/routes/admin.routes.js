const {Router} = require("express");
const{verifyTokenAndAdmin} = require("../middlewares/auth.middleware")
const {deleteUser, deleteOrder} = require("../controllers/admin.controller")
const router = Router();

router.get("/:id", verifyTokenAndAdmin, ()=>{
    console.log("Welcome to Admin page")
    res.status(200).json("Welcome Admin")
});
router.post("/:id/:serviceID", verifyTokenAndAdmin, deleteOrder);
router.post("/:id/:objectId", verifyTokenAndAdmin, deleteUser);



module.exports = {
    adminRouter:router
}