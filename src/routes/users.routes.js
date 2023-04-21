const {Router} = require("express");
const {register, deleteUser, editProfile, login} = require("../controllers/users.controller");

const router = Router();

router.post("/:role", register);
router.patch("/:userID", editProfile);
router.delete("/:userID", deleteUser);
router.post("/",login)

module.exports = {
    userRouter: router
}