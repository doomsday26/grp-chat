const express= require('express')
const router= express.Router()
const chatcontroller= require('../controllers/chatcontroller')
let authenticatecontroller= require('../controllers/authenticatecontroller')
router.get('/users',authenticatecontroller.authenticate,chatcontroller.getAllusers)
router.get('/getGroups',authenticatecontroller.authenticate,chatcontroller.getGroups)
router.post('/creategrp',authenticatecontroller.authenticate,chatcontroller.createGrp)
router.post('/:groupId',authenticatecontroller.authenticate ,chatcontroller.addmsg)
router.get('/groupchats/:groupId',authenticatecontroller.authenticate,chatcontroller.sendchats)
router.get('/:last/:groupId',authenticatecontroller.authenticate,chatcontroller.sendnewchats )



module.exports= router


//app.use('/chat',chatroutes)