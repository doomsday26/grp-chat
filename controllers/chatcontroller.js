const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Message = require("../models/message");

exports.addmsg = async (req, res, next) => {
  try {
    let user = req.user;
    let data = await user.createMessage( {text: req.body.msg});
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
    let messages = await Message.findAll({attributes:{exclude:['createdAt','updatedAt','userId']} ,include:{model:User,attributes:['name']}});
    res.json({ msgs: messages });
  } catch (error) {
    console.log(error);
  }
};

exports.sendnewchats=async(req,res,next)=>{

try {
console.log(req.params.last);
console.log(typeof req.params.last );
 let messages = await Message.findAll({offset: +req.params.last  ,attributes:{exclude:['createdAt','updatedAt','userId']} ,include:{model:User,attributes:['name']}});
  res.json({ msgs: messages });

} catch (err) {
  console.log(err);
}

}