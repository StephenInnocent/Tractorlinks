const {userModel} = require("../models/users.models");
const {adminReqModel} = require("../models/adminReq.models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {

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

        const user = userModel.findOne({name:req.body.name});

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
        {expiresIn:"2d"});

        console.log(accessToken);
        
        res.send(`Succesfully registered!`).status(200).json(user).end();
    } catch(e){
        console.log('an error ocurred',e);
        res.status(500).send(`User registration failed. please retry`).end()
    };
    

    

};

async function updateUser(req,res){
    if (req.body.password){
        const salt = bcrypt.genSaltSync(10);
        const updatedPassword = bcrypt.hashSync(req.body.password, salt)
        req.body.password = updatedPassword;

        try{
           const updatedUser = await userModel.findOneAndUpdate({_id: req.params.id}, {...req.body});
           updatedUser.password = undefined;
           res.status(200).json({updatedUser});
           console.log("Profile successfully updated");
        } catch(e){
            res.status(500)
            console.log(e);
        } finally{
            res.end()
        }
    } else{
        res.status(500).end()
    }

    
};

async function deleteAccountRequest(req,res){
    try{
        const Maker = await userModel.findOne({_id:req.params.id});
        if(Maker){
            await adminReqModel.create({
                name: Maker.name,
                objectId: req.params.id,
                email: Maker.email,
                // description: req.query.description,
                reason: req.body.reason
            })
        } else(e) => {
            console.log("Request Maker not found");
            res.status(500).end()
        }

        res.json("Your request to delete your account is pending approval by Admin. Email notification will be sent to you. Thank you.")
        res.end();
    } catch(e){
        res.status(500).json("Sorry! Could'nt make delete request.")
    }
}


async function login(req, res) {
    try{
        const user = await userModel.findOne({email:req.body.email});
        console.log("user located with email");

        if (!user) return res.status(401).json("Wrong Credentials").end();

        console.log(`User with username '${user.name}' found`);

        if (!bcrypt.compareSync(req.body.password, user.password)) return res.send("Password incorrect!!").end();
        
        // const accessToken = jwt.sign({
        //     id: user._id,
        //     isAdmin: user.isAdmin,
        // }, process.env.JWT_SEC,
        // {expiresIn:"2d"})

        // user.password = undefined;
        
        res.json({user}).end();

        } catch(err){
            res.status(500).json(err).end()
        };
};

async function getAllUsers(){
    try{
        const users = await userModel.find();
        res.status(200).json(users).end()
    } catch(e){
        res.status(500).json(e);
    }
}

module.exports = {
    register,
    updateUser,
    login,
    getAllUsers,
    deleteAccountRequest
}