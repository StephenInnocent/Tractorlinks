const { userModel } = require("../../models/users.models")




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

// const verifyToken = (req,res,next) => {
//     const authHeader = req.headers.token;
//     User = userModel.findById(req.params.id);
//     if(authHeader) {
//         const token = authHeader.split(" ")[1]
//         jwt.verify(token,process.env.JWT_SEC, (err,User) =>{
//             if (err) res.status(403).json("Token is not valid").end()
//             else{
//                 req.user = User;
//                 console.log("token verified");
//                 next();
//             };
            
//         })
//     } else{
//         res.status(401).json("Please provide token!").end();
//     }
// }
// const verifyTokenAndAuthorisation = (req,res,next) => {
//     verifyToken(req,res, ()=> {
//         if(req.params.id){
//             console.log("Authorised!");
//             next();
//         }else{
//             res.status(403).json("You are not authorised to do that!").end()
//         }
//     })
// }

const checkUser = async (req,res,next) =>{
    const user = await userModel.findById(req.params.id)
    if(user){
        console.log("Authorised!");
        next();
    }else{
        res.status(403).json("You are not authorised to do that!").end()
    }
}

// const verifyTokenAndAdmin = (req,res,next) => {
//     verifyToken(req,res, ()=> {
//         if(req.user.role = "Admin"){
//             console.log("Admins can proceed");
//             next();
//         }else{
//             console.log("Not an Admin");
//             res.status(403).json("You are not authorised to do that").end()
//         }
//     })
// }


module.exports = {
    checkAdmin,
    
    checkUser
}
