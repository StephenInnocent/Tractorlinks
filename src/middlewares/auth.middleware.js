const jwt = require("jsonwebtoken");
require("dotenv").config();
const {userModel} = require("../models/users.models")


const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    User = userModel.findById(req.params.id);
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SEC, (err,User) =>{
            if (err) res.status(403).json("Token is not valid");
            req.user = User;
            console.log("token verified");
            next();
        })
    } else{
        res.status(401).json("Please provide token!").end();
    }
}
const verifyTokenAndAuthorisation = (req,res,next) => {
    verifyToken(req,res, ()=> {
        if(req.params.id){
            console.log("Authorised!");
            next();
        }else{
            res.status(403).json("You are not authorised to do that!")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res, ()=> {
        if(req.user.role = "Admin"){
            console.log("Admins can proceed");
            next();
        }else{
            console.log("Not an Admin");
            res.status(403).json("You are not authorised to do that").end()
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorisation,
    verifyTokenAndAdmin
}