const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Group= require('../models/group')
const userGroups= require('../models/userGroups')
const Message = require("../models/message");

exports.addmsg = async (req, res, next) => {
  try {
    let user = req.user;
    let data = await Message.create( {text: req.body.msg,userId:user.id,groupId:req.params.groupId});
    console.log(req.user.name);
    console.log(data);
    res.status(201).json({user:req.user.name,msg:data.text,msgId:data.id});
  } catch (error) {
    console.log(error);
  }
};

exports.sendchats = async (req, res, next) => {
  try {
    console.log("entering get chats");
    let messages = await Message.findAll({where:{groupId:req.params.groupId}, attributes:{exclude:['createdAt','updatedAt','userId']} ,include:{model:User,attributes:['name']}});
    res.json({ msgs: messages });
  } catch (error) {
    console.log(error);
  }
};

exports.sendnewchats=async(req,res,next)=>{

try {
console.log(req.params.last);
console.log(typeof req.params.last );
 let messages = await Message.findAll({offset: +req.params.last,where:{groupId:req.params.groupId} ,attributes:{exclude:['createdAt','updatedAt','userId']} ,include:{model:User,attributes:['name']}});
  res.json({ msgs: messages });

} catch (err) {
  console.log(err);
}

}

exports.getAllusers= async (req,res,next)=>{
  console.log("entering  to fetch all users");
let users=await User.findAll({attributes:{exclude:['password','createdAt','updatedAt','email']}})
users=Array.from(users).filter(user=>(user.id!=req.user.id))
console.log(users);
res.send(users)
}

exports.createGrp=async (req,res,next)=>{
console.log("group data>>>>>", req.body.groupinfo);
try {
  let user= req.user
let group = await user.createGroup({name:req.body.groupinfo.groupname},{through:{isAdmin:true}})
console.log(group);
// add groupmembers
let members= req.body.groupinfo.groupmemberIds

members.forEach( async(member) => {
  await userGroups.findOrCreate( {where:{isAdmin:false, userId:member, groupId:group.id}}).then().catch(err=>{
    throw Error(err)
  })
});

res.send({success:true,message:"group created"})
} catch (err) {
  console.log(err);
}

}

exports.getGroups=async (req,res,next)=>{
try {
  console.log("entering get groups");
  let groups=await req.user.getGroups({attributes:{exclude:['createdAt','updatedAt','usergroups']},exclude:['usergroups']})
  console.log(groups);

res.send(groups)
} catch (error) {
  
}

}