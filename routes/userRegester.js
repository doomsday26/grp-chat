const express= require('express')
const registerController= require('../controllers/registeration')
const router = express.Router();



router.use('/',registerController.signup )


module.exports=router