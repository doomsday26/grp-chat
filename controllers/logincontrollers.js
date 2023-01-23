const express= require('express');
const User= require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')


function generateAccessToken({useremail,password}) {
    return jwt.sign({email:useremail,password:password}, process.env.JWT_SECRET_KEY, { expiresIn: '1800s' });
  }

exports.login=async (req,res,next)=>{

try {
let users= await User.findAll({where:{email:req.body.email}})
if(users.length>0){
    let user = users[0]
    console.log(user);
    let boolean= await bcrypt.compare(req.body.password,user.password)
if(boolean){
const token = generateAccessToken({ useremail: req.body.email,password:req.body.password });
console.log(token);
res.json({key:token})

}else{
    res.status(401).json({message:"unauthorised user , password incorrect"})
}


}else{
    res.status(404).json({message:"user not found"})
}

} catch (error) {
  console.log(error);  
}


}

// function generateAccessToken(username) {
//     return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
//   }