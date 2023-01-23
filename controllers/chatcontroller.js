const User= require('../models/user')
const jwt = require('jsonwebtoken');
const Message= require('../models/message');
const { where } = require('sequelize');
let authuserid


exports.addmsg= async (req,res,next)=>{
let userdata
console.log(req.body);
let data = await new Promise((resolve, reject) => {
    jwt.verify(req.body.data, process.env.JWT_SECRET_KEY, (err,data) => {
if(err){reject(err)}
if(data){resolve(data)}
    })
})  
console.log(data);
authuserid=data.id
let users=await User.findAll({where:{id:data.id}})    
if(users.length>0){
let user = users[0]
let data= await user.createMessage({text:req.body.msg})
console.log(data);
}
res.send("data saved")
}

exports.sendchats=async (req,res,next)=>{
    console.log("entering get chats");
 
 let users=await User.findAll({where:{id:1}})    
if(users.length>0){
let user = users[0]
let messages= await user.getMessages()
res.json({msgs:messages})
}
}