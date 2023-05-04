const jwt = require("jsonwebtoken");
require("dotenv").config()


const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SEC, (err,User) =>{
            if (err) res.status(403).json("Token is not valid");
            req.user = User;
            next();
        })
    } else{
        res.status(401).json("Please provide token!").end();
    }
}
const verifyTokenAndAuthorisation = (req,res,next) => {
    verifyToken(req,res, ()=> {
        if(req.User.id === req.params.id){
            next();
        }else{
            res.status(403).json("You are not authorised to do that!")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res, ()=> {
        if(req.User.id === req.params.id || req.User.isAdmin){
            next();
        }else{
            res.status(403).json("You are not authorised to do that!")
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorisation,
    verifyTokenAndAdmin
}