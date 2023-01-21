const express= require('express');
const path = require('path');
const app = express()
require('dotenv').config();
const userRegesterationRoutes= require('./routes/userRegester')


//app.use(userRegesterationRoutes)
app.use((req,res)=>{
    console.log(req.url);
 res.sendFile(path.join(__dirname,`./views/${req.url}`))
} )

app.listen(process.env.port,()=>{
console.log('server running on port',process.env.port);
})