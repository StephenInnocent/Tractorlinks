const {Router} = require("express");
const {register,updateUser, login, deleteAccountRequest} = require("../controllers/users.controller");
const {verifyTokenAndAuthorisation} = require("../middlewares/auth.middleware")



const router = Router();

router.post("/register", register);
router.put("/:id", verifyTokenAndAuthorisation, updateUser);
router.post("/:id", verifyTokenAndAuthorisation,deleteAccountRequest)
router.post("/login", login)

module.exports = {
    userRouter: router
}