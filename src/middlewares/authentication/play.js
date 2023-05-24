const session = require("express-session");


function checkSession(req,res,next){
    if(session){
        console.log("session exists");
        next();
    }else{
        console.log("session absent");
        next();
    }
}

module.exports={
    checkSession
}