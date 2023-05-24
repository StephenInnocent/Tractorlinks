const { userModel } = require("../../models/users.models");
const session = require("express-session");
const jwt = require("jsonwebtoken")




const checkAdmin = async (req,res,next) =>{
    const Admin = await userModel.findById(req.params.id);

    if(!Admin){
        res.status(403).json("you are not permitted to do that").end()
    } else{
        if(!Admin.role === "Admin"){
            res.status(403).json("Only Admins are permitted to do that!!!").end();
        } else{
            console.log("Admins can proceed");
            next();
        }
    }
}

const verifyToken = async(req,res,next) => {
    User = await userModel.find({email:req.session.email});

    if(User){

        const accessToken = jwt.sign({
            id: User._id,
            isAdmin: User.isAdmin,
        }, process.env.JWT_SEC,
        {expiresIn:"2d"})  
        
        if(accessToken) {
            // const token = authHeader.split(" ")[1]
            jwt.verify(accessToken,process.env.JWT_SEC, (err,User) =>{
                if (err) res.status(403).json("Token is not valid").end()
                else{
                    req.user = User;
                    console.log("token verified");
                    next();
                };
                
            })
        } else{
            res.status(401).json("Please provide token!").end();
        };
    }else{
        res.status(403).json("You are not authorised to do that!").end()
    }
    
}
 const verifyTokenAndAuthorisation = (req,res,next) => {
     verifyToken(req,res,async ()=> {
        const user = await userModel.find({email:req.session.email});
        if(user){
            console.log("Authorised!");
            next();
        }else{
            res.status(403).json("You are not authorised to do that!").end()
        }
    });
 }

 const verifyTokenAndTractorOwner = (req,res,next) =>{
    verifyToken(req,res, async()=>{
        const user = await userModel.find({email:req.session.email});
        if(user.role === "Tractor Owner"){
            console.log("Authorised!");
            next();
        }else{
            res.status(403).json("You are not authorised to do that!").end()
        }
    })
 }

// const checkUser = async (req,res,next) =>{
//     const user = await userModel.findById(req.params.id)
//     if(user){
//         console.log("Authorised!");
//         next();
//     }else{
//         res.status(403).json("You are not authorised to do that!").end()
//     }
// }


// const checkTractorOwner = async (req,res,next) =>{
//     const user = await userModel.findById(req.params.id);
//     if(user.role === "Tractor Owner"){
//         console.log("Authorised!");
//         next();
//     }else{
//         res.status(403).json("You are not authorised to do that!").end()
//     }
// }

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
    checkAdmin,
    verifyTokenAndTractorOwner,
    verifyTokenAndAuthorisation,
    verifyTokenAndAdmin
}
