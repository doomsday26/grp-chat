const express= require('express');
const path = require('path');
const app = express()
const sequelize= require('./database')
require('dotenv').config();
const userRegesterationRoutes= require('./routes/userRegester')
const cors = require('cors')
const bodyParser=require('body-parser')
const User= require('./models/user')
const Message= require('./models/message')
const Group= require('./models/group')
const loginRoutes= require('./routes/loginroutes')
const chatroutes= require('./routes/chats')
const userGroups= require('./models/userGroups')
app.use(cors())
app.use(bodyParser.json())
// app.use('/allusers',async(req,res)=>{
//     let users=await User.findAll()
// console.log(users);
// res.send(users)
// })

app.use('/signup',userRegesterationRoutes)
app.use('/login',loginRoutes)
app.use('/chat',chatroutes)


User.hasMany(Message)
Message.belongsTo(User)

User.belongsToMany(Group,{through:userGroups})
Group.belongsToMany(User,{through:userGroups})

Group.hasMany(Message)
Message.belongsTo(Group)

sequelize
//.sync({force:true})
.sync()
.then(result=>{

}).catch(err=>{console.log(err);})


app.listen(process.env.port,()=>{
console.log('server running on port',process.env.port);
})