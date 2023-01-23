const express= require('express')
const router= express.Router()
const chatcontroller= require('../controllers/chatcontroller')
let authenticatecontroller= require('../controllers/authenticatecontroller')
router.post('/',authenticatecontroller.authenticate ,chatcontroller.addmsg)
router.get('/',authenticatecontroller.authenticate,chatcontroller.sendchats)


module.exports= router