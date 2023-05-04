const {Router} = require("express");
const {register, deleteUser, updateUser, login} = require("../controllers/users.controller");
const {verifyToken, verifyTokenAndAdmin,verifyTokenAndAuthorisation} = require("../middlewares/auth.middleware")
const router = Router();

router.post("/register", register);
router.put("/:id", verifyTokenAndAuthorisation, updateUser);
router.delete("/:id", verifyTokenAndAdmin, deleteUser);
router.post("/auth/login", login)

module.exports = {
    userRouter: router
}