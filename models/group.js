const Sequelize= require('sequelize')
const sequelize= require('../database')
const Group= sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING
})

module.exports=Group