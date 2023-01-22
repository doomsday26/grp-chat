require('dotenv').config()
const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.SCHEMA,process.env.SQL_USER,process.env.SQLPASSWORD,{host:process.env.HOST,
//     dialect:'mysql'

// }); 

const sequelize = new Sequelize('group-chat','root','harsh226748',{host:'localhost',
    dialect:'mysql'
}); 

module.exports=sequelize;