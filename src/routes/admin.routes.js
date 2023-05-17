const {Router} = require("express");
const{checkAdmin} = require("../middlewares/authentication/auth.middleware")
const {deleteUser, deleteOrder,getAllUsers,getSingleUser} = require("../controllers/admin.controller")
const router = Router();

router.get("/:id", checkAdmin, ()=>{
    console.log("Welcome to Admin page")
    res.status(200).json("Welcome Admin")
});
router.delete("/:id/deleteOrder", checkAdmin, deleteOrder);
router.delete("/:id/deleteUser", checkAdmin, deleteUser);
router.get("/:id/getUsers",checkAdmin,getAllUsers);
router.get("/:id/getUser", checkAdmin, getSingleUser)



module.exports = {
    adminRouter:router
}