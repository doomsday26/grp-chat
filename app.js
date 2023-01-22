const express= require('express');
const path = require('path');
const app = express()
const sequelize= require('./database')
require('dotenv').config();
const userRegesterationRoutes= require('./routes/userRegester')
const cors = require('cors')
const bodyParser=require('body-parser')
const User= require('./models/user')
const loginRoutes= require('./routes/loginroutes')
app.use(cors())
app.use(bodyParser.json())


app.use('/signup',userRegesterationRoutes)
app.use('/login',loginRoutes)
app.use((req,res)=>{
    console.log(req.url);
 res.sendFile(path.join(__dirname,`./views/${req.url}`))
} )






sequelize
.sync({force:true})
//.sync()
.then(result=>{

}).catch(err=>{console.log(err);})


app.listen(process.env.port,()=>{
console.log('server running on port',process.env.port);
})