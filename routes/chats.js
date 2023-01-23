const express= require('express')
const router= express.Router()
const chatcontroller= require('../controllers/chatcontroller')
router.post('/',chatcontroller.addmsg)



module.exports= router