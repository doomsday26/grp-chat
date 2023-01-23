const sequelize= require('../database')
const Sequelize= require('sequelize')

const message= sequelize.define('message',{
    id:{type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
        },
        text:{
            type:Sequelize.STRING,
        }
})

module.exports= message