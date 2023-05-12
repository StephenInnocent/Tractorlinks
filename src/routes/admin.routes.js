const {Router} = require("express");
const{verifyTokenAndAdmin} = require("../middlewares/authentication/auth.middleware")
const {deleteUser, deleteOrder,getAllUsers} = require("../controllers/admin.controller")
const router = Router();

router.get("/:id", verifyTokenAndAdmin, ()=>{
    console.log("Welcome to Admin page")
    res.status(200).json("Welcome Admin")
});
router.delete("/:id/deleteOrder", verifyTokenAndAdmin, deleteOrder);
router.delete("/:id/deleteUser", verifyTokenAndAdmin, deleteUser);
router.get("/:id/getUsers",verifyTokenAndAdmin,getAllUsers)



module.exports = {
    adminRouter:router
}