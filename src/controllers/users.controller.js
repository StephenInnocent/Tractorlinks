const {userModel} = require("../models/users.models");
const bcrypt = require("bcrypt");

async function register(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(req.body.password, salt);

    await userModel.create({
        name: req.body.name,
        password: encryptedPassword,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: req.params.role,
    }).catch((e) =>{
        console.log('an error ocurred',e);
        res.send(`User registration failed. please retry`).end()
    });

    res.send(`Succesfully registered!`).end();

}

async function editProfile(req,res){
    await userModel.findOneAndUpdate({_id: req.params.userID}, {...req.body})
    .catch((e) =>{
        console.log(e);
    })
    res.send('Profile successfully updated');
}

async function deleteUser(req,res){
    res.send(`Your request has been received and is being processed. You will be notified when fully resolved`).end()
}

module.exports = {
    register,
    editProfile,
    deleteUser
}