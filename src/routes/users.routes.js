const {Router} = require("express");
const {register,checkEmailAndphoneNumber,updateUser,logIn,deleteAccountRequest,availableTractors,logOut} = require("../controllers/users.controller");
const {verifyTokenAndAuthorisation} = require("../middlewares/authentication/auth.middleware")
const {checkSession} = require("../middlewares/authentication/play")

const router = Router();

router.post("/register",register);
router.put("/update", verifyTokenAndAuthorisation, updateUser);
router.delete("/deleteMyAccount", verifyTokenAndAuthorisation,deleteAccountRequest)
router.post("/login",logIn);
router.post("/availableTractors", verifyTokenAndAuthorisation,availableTractors);
router.post("/logout",logOut)

module.exports = {
    userRouter: router
}