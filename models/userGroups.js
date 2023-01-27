const sequelize= require('../database')
const Sequelize= require('sequelize')

const userGroups= sequelize.define('usergroups',{
    id:{type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
        },
        isAdmin:Sequelize.BOOLEAN
})

module.exports=userGroups