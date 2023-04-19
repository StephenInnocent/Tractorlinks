const {Router} = require("express");
const {register, deleteUser, editProfile} = require("../controllers/users.controller");

const router = Router();

router.post("/:role", register);
router.patch("/:userID", editProfile);
router.delete("/:userID", deleteUser);

module.exports = {
    userRouter: router
};