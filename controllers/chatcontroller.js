const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Group= require('../models/group')
const userGroups= require('../models/userGroups')
const Message = require("../models/message");
const { where } = require("sequelize");

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

exports.getRemainingUsers=async(req,res,next)=>{
let grpId= req.params.groupId
console.log(grpId);
console.log("getting remaining users>>>>>>>>>");
let grpusers=await userGroups.findAll({where:{groupId:grpId},attributes:{exclude:['createdAt','updatedAt','isAdmin','groupId','id']}})
let allusers= await User.findAll({attributes:{exclude:['createdAt','updatedAt','email','password','name']}})
let arr=[]
allusers = allusers.map(ele=>ele.id)
grpusers= grpusers.map(ele=>ele.userId)
leftusers= allusers.filter(ele=> !grpusers.includes(ele))
let users= await User.findAll({where:{id:leftusers},attributes:{exclude:['createdAt','updatedAt','email','password']}})
res.send(users)

}
exports.groupUsers=async(req,res,next)=>{
  
try {
  console.log("entering sending group users >>>>>>");
 console.log( req.params.groupId)
 let groups= await Group.findAll({where:{id:req.params.groupId}})
let group= groups[0]
 console.log(group);
 let users = await group.getUsers({attributes:{exclude:['createdAt','updatedAt','email','password']},through:{attributes:{exclude:['createdAt','updatedAt']}}})
 console.log(users);
 res.send(users)
} catch (error) {
  
}

}

exports.isAdmin=async(req,res,next)=>{
  console.log("entering is admin>>>>>>>>>>>>>>");
  console.log(typeof req.user.id);
  console.log(typeof req.params.groupId);
 let data= await userGroups.findAll({where:{userId:req.user.id,groupId:+req.params.groupId}})
 data= data[0]
 res.send({isAdmin:data.isAdmin})
}

exports.removeAdmin = async(req,res,next)=>{
  let id = req.body.userId
  let groupId= req.body.groupId
  let users=await userGroups.findAll({where:{userId:+id,groupId:+groupId}})
  let user= users[0]
console.log(user);
  user.isAdmin=false
  await user.save()
  res.send("updated")
}

exports.makeAdmin = async(req,res,next)=>{
  console.log("making admin >>>>>>>>>>>>>>>>>>>>>>>>>>>");
  let id = req.body.userId
  let groupId= req.body.groupId
  console.log(req.body);
  let users=await userGroups.findAll({where:{userId:+id,groupId:+groupId}})
  let user= users[0]
  console.log(users);
  user.isAdmin=true
  await user.save()
  res.send("updated")
}

exports.removeMember=async(req,res,next)=>{
  let id = req.body.userId
  let groupId= req.body.groupId
  let users=await userGroups.findAll({where:{userId:+id,groupId:+groupId}})
  let user= users[0]
  await user.destroy()
  res.send("user deleted")
}

exports.changeGroupSettings=async(req,res,next)=>{
  let groupId= req.body.groupId
  let users=req.body.newUsers
  let newGrpName =req.body.newGroupName


try {
  users.forEach(async(id)=>{
    await userGroups.create({isAdmin:false , userId:id, groupId:groupId})
  })
  
  let group= await Group.findByPk({id:groupId})
  group.name=newGrpName
  await group.save()
  res.send({msg:"successfully updatedthe details"})
   
} catch (error) {
  console.log(error);
}




}