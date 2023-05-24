const {userModel} = require("../models/users.models");
const {adminReqModel} = require("../models/adminReq.models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../middlewares/validation/users.validators")
const errormessage = require("../middlewares/utilities/errormessage")
const session = require("express-session");


function checkEmailAndphoneNumber(req,res,next){
    try{
        const testEmail = userModel.find({email:req.body.email})
        if(testEmail){
            res.json("A user Account with the input email exists").status(400).end();
        } else{
            const testNumber = userModel.find({phoneNumber:req.body.phoneNumber})
            if(testNumber){
                res.json("A user Account with the input Number exists").status(400).end()
            } else{
                next();
            }
        }
    } catch(e){
        res.json(e).end();
    }

}

async function register(req, res) {
    try{
        const result = validator.registerValidator.safeParse(req.body);

        console.log(`Validated:`.concat(result.success));

        if (!result.success){
            return res.status(400).json(errormessage.formatZodError(result.error)).end();
        } else{

            const salt = bcrypt.genSaltSync(10);

            const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
            // checkEmailAndphoneNumber();
           
            try{
                 await userModel.create({
                    name: req.body.name,
                    password: encryptedPassword,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    role: req.body.role,
            });

            const user = await userModel.findOne({name:req.body.name});

            if(!user){
                res.status(500).json("User registration failed. please retry").end()
            } else{
                res.json("Succesfully registered!").status(200).end();
            }

            }catch(e){
                console.log('an error ocurred',e);
                res.status(500).send("User registration failed. please retry").end()
            };
        }
    }catch(e){
            res.status(500).json(e).end();
    } 

};

async function updateUser(req,res){
    

    try{
        const result = validator.updateValidator.safeParse(req.params);

        console.log(`validated:`.concat(result.success));
        console.log(result.error);

        if (!result.success){
            return res.status(400).json(errormessage.formatZodError(result.error)).end();
        } else{
                if(req.body.password){
                    const salt = bcrypt.genSaltSync(10);
                    const updatedPassword = bcrypt.hashSync(req.body.password, salt)
                    req.body.password = updatedPassword;
                }
                
                
                try{
                   const updatedUser = await userModel.findOneAndUpdate({_id: req.params.id}, {...req.body});
                   updatedUser.password = undefined;
                   updatedUser.phoneNumber = undefined;
                   updatedUser.email = undefined;
        
        
                    console.log("Profile successfully updated");
                    res.status(200).json({updatedUser,message:"Refresh to view changes"}).end()
                } catch(e){
                    res.status(500).json("Update failed").end()
                    console.log(e);
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
            try{
                const Maker = await userModel.find({email:req.session.email});

                if(Maker){
                    console.log("omo request running o!");
                    console.log("Maker present");
                    const reqorder = await adminReqModel.create({
                    name: Maker.name,
                    object: Maker,
                    email: Maker.email,
                    description: "Delete My Account",
                    reason: req.body.reason
                    });
                    if(reqorder){
                        console.log("Request made");
                        res.json("Your request to delete your account is pending approval by Admin. Email notification will be sent to you. Thank you.").end();
                    }else{
                        console.log("Request not made");
                        res.status(500).json("Request failed").end();
                    }
                } else{
                    console.log("Request Maker not found");
                    res.status(500).json("Request Maker not found").end();
                }
                   
            } catch{
                res.status(500).end();
            }
            
            
            // if(Maker){
            //     console.log("omo request running o!");
            //         console.log("Maker present");
            //         const reqorder = await adminReqModel.create({
            //         name: Maker.name,
            //         objectId: req.params.id,
            //         email: Maker.email,
            //         description: req.params.description,
            //         reason: req.body.reason
            //     });
            //     if(reqorder){
            //         console.log("Request made");
            //         res.json("Your request to delete your account is pending approval by Admin. Email notification will be sent to you. Thank you.").end();
            //     }else{
            //         console.log("Request not made");
            //         res.status(500).json("Request failed").end();
            //     }
            // } else(e) => {
            //     console.log("Request Maker not found");
            //     res.status(500).end()
            // }
    
            
        } catch(e){
            res.status(500).json("Sorry! Could'nt make delete request.")
        }
    }
    
}


async function logIn(req, res) {

    if(!req.body.email){
        const validatedData = validator.loginValidatorNumber.safeParse(req.body);
        //console.log(validatedData)
        if(!validatedData.success){
            res.status(400).json(errormessage.formatZodError(validatedData.error)).end()
        } else {
            try{

                const user = await userModel.findOne({phoneNumber:req.body.phoneNumber});
        
                if (!user) return res.status(401).json("Wrong Credentials").end();

                else{
                    
                    console.log(`User with username '${user.name}' found`);
                }
        
                if (!bcrypt.compareSync(req.body.password, user.password)) return res.send("Incorrect Password!").end();
                else{
                    console.log("Password correct!");
                    const accessToken = jwt.sign({
                        id: user._id,
                        isAdmin: user.isAdmin,
                    }, process.env.JWT_SEC,
                    {expiresIn:"2d"})
    
                    req.session.regenerate(function (err) {
                        if (err) console.log(err);
                    
                        // store user information in session, typically a user id
                        req.session.email = req.body.email;
                        req.session.token = accessToken;
                        console.log(req.session.email,req.session.token);
                    
                        // save the session before redirection to ensure page
                        // load does not happen before session is saved
                        req.session.save(function (err) {
                          if (err) return next(err)
                            console.log("session saved");
                        })
                    });
    
                    user.password = undefined;
                    user.email = undefined;
                    user.phoneNumber = undefined;
                    user.createdAt = undefined;
                    user.updatedAt = undefined;
                    user.role = undefined;
                    
    
                    res.json({user}).end()
                }
                
            } catch(err){
                    res.status(500).json(err).end();
            };
        }
    } else{
        const validatedData = validator.loginValidatorEmail.safeParse(req.body);
        //console.log(validatedData)
        if(!validatedData.success){
            res.status(400).json(errormessage.formatZodError(validatedData.error)).end()
        } else {
            try{

                const user = await userModel.findOne({email:req.body.email});
        
                if (!user) return res.status(401).json("Account does'nt exist").end();

                else{
                    
                    console.log(`User with username '${user.name}' found`);
        
                }
        
                if (!bcrypt.compareSync(req.body.password, user.password)) return res.json("Incorrect Password!").end();
                else{
                    console.log("password correct");
                    const accessToken = jwt.sign({
                        id: user._id,
                        isAdmin: user.isAdmin,
                    }, process.env.JWT_SEC,
                    {expiresIn:"2d"})
            
                    req.session.regenerate(function (err) {
                        if (err) console.log(err);
                    
                        // store user information in session
                        req.session.email = req.body.email;
                        req.session.token = accessToken;
                        console.log(req.session.email,req.session.token);
                    
                        // save the session before redirection to ensure page
                        // load does not happen before session is saved
                        req.session.save(function (err) {
                          if (err) return next(err)
                            console.log("session saved");
                        })
                    });
    
                    user.password = undefined;
                    user.email = undefined;
                    user.phoneNumber = undefined;
                    user.createdAt = undefined;
                    user.updatedAt = undefined;
                
    
                    res.status(200).json({user}).end();
    
                }
                
                
        
            } catch(err){
                    res.status(500).json(err).end()
            };
        };
    }

    
    
}

async function availableTractors(req,res){
    try{
        const tractors = await userModel.find({statesOfOperation:req.body.state,LGAsOfOperation:req.body.LGA});

        if(tractors){
            const no = tractors.length

           
            
            tractors.password = undefined;
            tractors.phoneNumber = undefined;
            tractors.email = undefined;
            tractors._id = undefined;
            tractors.comments = undefined;
            tractors.reviews = undefined;
            tractors.fundsMade = undefined;

            res.status(200).json(tractors).end()
        } else{
            res.status(200).json("No tractors are available").end()
        }
    } catch(e){
        res.status(500).json({e}).end();
    }
    
}
function logOut(req,res){
    req.session.email = null;
    req.session.token = null;
    
    req.session.save(function (err) {
        if (err) next(err)
    });

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
    req.session.regenerate(function (err) {
    if (err) next(err);
    else{
        console.log("session destroyed");
        res.redirect('/')
    }
    
    });
}


module.exports = {
    logOut,
    register,
    updateUser,
    logIn,
    deleteAccountRequest,
    availableTractors
}