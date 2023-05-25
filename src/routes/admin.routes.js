const {Router} = require("express");
const{verifyTokenAndAdmin} = require("../middlewares/authentication/auth.middleware")
const {deleteUser, deleteOrder,getAllUsers,getSingleUser} = require("../controllers/admin.controller")
const router = Router();

router.get("/login", verifyTokenAndAdmin, (req,res)=>{
    console.log("Welcome to Admin page");
    res.status(200).json("Welcome Admin");
});
router.delete("/deleteOrder", verifyTokenAndAdmin, deleteOrder);
router.delete("/deleteUser", verifyTokenAndAdmin, deleteUser);
router.get("/getUsers",verifyTokenAndAdmin,getAllUsers);
router.get("/getUser", verifyTokenAndAdmin, getSingleUser);



module.exports = {
    adminRouter:router
}