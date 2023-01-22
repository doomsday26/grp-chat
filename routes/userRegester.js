const express= require('express')
const registerController= require('../controllers/registeration')
const router = express.Router();



router.post('/',registerController.signup )


module.exports=router