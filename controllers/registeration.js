const User= require('../models/user')
const bcrypt= require('bcrypt');
let saltRounds= 10;
let password

exports.signup=async (req,res,next)=>{
    console.log(req.body);
let email= req.body.email;
try {
let users= await User.findAll({where:{email:email}})
console.log(users);
    if(users[0]){
        res.status(201).json({"success":false ,"message":"user with name is already present"})
    }else{

   password= await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
        resolve(hash)
        });
      }) 
  let user= await User.create({
            name:req.body.name,
            email:req.body.email,
            password:password
        })
res.status(201).json({success:true,message:"you have successfully signed in, now login to continue "})
 }

} catch (error) {
    console.log(error);
}
//{ name: 'h1', password: '1234', email: 'h1.com' }

}