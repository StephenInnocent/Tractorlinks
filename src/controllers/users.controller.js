const {userModel} = require("../models/users.models");
const {adminReqModel} = require("../models/adminReq.models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../middlewares/validation/users.validators")
const errormessage = require("../middlewares/utilities/errormessage")


async function register(req, res) {
    try{
        const result = validator.registerValidator.safeParse(req.body);

        console.log(`Validated:`.concat(result.success));

        if (!result.success){
            return res.status(400).json(errormessage.formatZodError(result.error)).end();
        } else{

            const salt = bcrypt.genSaltSync(10);

            const encryptedPassword = bcrypt.hashSync(req.body.password, salt);

            try{
                 await userModel.create({
                    name: req.body.name,
                    password: encryptedPassword,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    role: req.body.role,
            });

            const user = await userModel.findOne({name:req.body.name});

            
            res.send(`Succesfully registered!`).status(200).end();

            }catch(e){
                console.log('an error ocurred',e);
                res.status(500).send(`User registration failed. please retry`).end()
            };
        }
    }catch(e){
            res.status(500).end();
    } 

};

async function updateUser(req,res){

    try{
        const result = validator.updateValidator.safeParse(req.body);

        console.log(`validated:`.concat(result.success));
        console.log(result.error);

        if (!result.success){
            return res.status(400).json(errormessage.formatZodError(result.error)).end();
        } else{
            if (req.body.password){
                const salt = bcrypt.genSaltSync(10);
                const updatedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = updatedPassword;
        
                try{
                   const updatedUser = await userModel.findOneAndUpdate({_id: req.params.id}, {...req.body});
                   updatedUser.password = undefined;
                   updatedUser.phoneNumber = undefined;
                   updatedUser.email = undefined;
        
        
                    console.log("Profile successfully updated");
                    res.status(200).json({updatedUser,message:"Refresh to view changes"}).end()
                } catch(e){
                    res.status(500).end()
                    console.log(e);
                }
        
            } else{
                res.status(500).end()
            }
        }
    
    } catch(e){
        res.status(500).json(e).end()
    }

};

async function deleteAccountRequest(req,res){
    const result = validator.deleteValidator.safeParse(req.body)

    if(!result.success){
        res.status(400).json(errormessage.formatZodError(result.error)).end()
        console.log(result.error);
    } else{
        try{
            const Maker = await userModel.findOne({_id:req.params.id});
            
            if(Maker){
                console.log("makerpresent");
                    const reqorder = await adminReqModel.create({
                    name: Maker.name,
                    objectId: req.params.id,
                    email: Maker.email,
                    description: req.params.description,
                    reason: req.body.reason
                });
                if(reqorder){
                    console.log("Request made");
                    res.json("Your request to delete your account is pending approval by Admin. Email notification will be sent to you. Thank you.").end();
                }else{
                    console.log("Request not made");
                    res.status(500).json("Request failed").end();
                }
            } else(e) => {
                console.log("Request Maker not found");
                res.status(500).end()
            }
    
            
        } catch(e){
            res.status(500).json("Sorry! Could'nt make delete request.")
        }
    }
    
}


async function login(req, res) {
    const validatedData = validator.loginValidator.safeParse(req.body);
    //console.log(validatedData)
    if(!validatedData.success){
        res.status(400).json(errormessage.formatZodError(validatedData.error)).end()
    } else {
        try{

            const user = await userModel.findOne({email:req.body.email});
    
            if (!user) return res.status(401).json("Wrong Credentials").end();

            else{
                
                console.log(`User with username '${user.name}' found`);
    
            }
    
            if (!bcrypt.compareSync(req.body.password, user.password)) return res.send("Password incorrect!!").end();
            
            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SEC,
            {expiresIn:"2d"})
    
            console.log(accessToken);

            user.password = undefined;
            user.email = undefined;
            user.phoneNumber = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
        

            res.json({user,accessToken}).end();

    
            } catch(err){
                res.status(500).json(err).end()
            };
    };
    
}



module.exports = {
    register,
    updateUser,
    login,
    deleteAccountRequest
}