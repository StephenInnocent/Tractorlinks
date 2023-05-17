const {Router} = require("express");
const {register,updateUser,login,deleteAccountRequest} = require("../controllers/users.controller");
const {checkUser} = require("../middlewares/authentication/auth.middleware")


const router = Router();

router.post("/register", register);
router.put("/:id", checkUser, updateUser);
router.delete("/:id/deleteMyAccount", checkUser,deleteAccountRequest)
router.post("/login",login);

module.exports = {
    userRouter: router
}