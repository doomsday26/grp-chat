const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.authenticate = async (req, res, next) => {
  try {
    console.log("entering sendind chats");
    console.log("request body>>>>>>", req.headers);
    let data = await new Promise((resolve, reject) => {
      jwt.verify(req.headers.data, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve(data);
        }
      });
    });
    console.log(data);
    authuserid = data.id;
    let users = await User.findAll({ where: { id: data.id } });
    if (users.length > 0) {
      let user = users[0];
      req.user = user;
      next();
    }
    else{
        throw new Error("errror")
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};
