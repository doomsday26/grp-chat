const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Message = require("../models/message");

exports.addmsg = async (req, res, next) => {
  try {
    let user = req.user;
    let data = await user.createMessage({ text: req.body.msg });
    console.log(data);
    res.send("data saved");
  } catch (error) {
    console.log(error);
  }
};

exports.sendchats = async (req, res, next) => {
  try {
    console.log("entering get chats");
    let user = req.user;
    let messages = await user.getMessages();
    res.json({ msgs: messages });
  } catch (error) {
    console.log(error);
  }
};
