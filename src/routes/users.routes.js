const {Router} = require("express");
const {register,updateUser,login,deleteAccountRequest,availableTractors} = require("../controllers/users.controller");
const {checkUser} = require("../middlewares/authentication/auth.middleware")


const router = Router();

router.post("/register", register);
router.put("/:id/update", checkUser, updateUser);
router.delete("/:id/deleteMyAccount", checkUser,deleteAccountRequest)
router.post("/login",login);
router.post("/:id/availableTractors", checkUser,availableTractors)

module.exports = {
    userRouter: router
}