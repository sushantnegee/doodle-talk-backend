const jwt = require("jsonwebtoken")
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req,res,next)=>{
    let token ;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");
            console.log("req.user",req.user);
            next();
            console.log('lol')
        }catch(error){
            res.status(401);
            console.log("Not Authorized, Token Failed")
            throw new Error("Not Authorized, Token Failed")
        }
    }
    
    if(!token){
        res.status(401);
        console.log("Not Authorized, No Token")
        throw new Error("Not Authorized, No Token")
    }
})

module.exports = {protect};