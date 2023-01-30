const express= require('express')
const router= express.Router()
const chatcontroller= require('../controllers/chatcontroller')
let authenticatecontroller= require('../controllers/authenticatecontroller')




router.get('/isAdmin/:groupId', authenticatecontroller.authenticate,chatcontroller.isAdmin)
router.post('/changeGroupSettings', authenticatecontroller.authenticate,chatcontroller.changeGroupSettings)
router.post('/removeAdmin', authenticatecontroller.authenticate,chatcontroller.removeAdmin)
router.post('/removeFromGroup', authenticatecontroller.authenticate,chatcontroller.removeMember)
router.post('/makeAdmin', authenticatecontroller.authenticate,chatcontroller.makeAdmin)
router.get('/groupUsers/:groupId', authenticatecontroller.authenticate,chatcontroller.groupUsers)
router.get('/remainingUsers/:groupId', authenticatecontroller.authenticate,chatcontroller.getRemainingUsers)
router.get('/users',authenticatecontroller.authenticate,chatcontroller.getAllusers)
router.get('/getGroups',authenticatecontroller.authenticate,chatcontroller.getGroups)
router.post('/creategrp',authenticatecontroller.authenticate,chatcontroller.createGrp)
router.post('/:groupId',authenticatecontroller.authenticate ,chatcontroller.addmsg)
router.get('/groupchats/:groupId',authenticatecontroller.authenticate,chatcontroller.sendchats)
router.get('/:last/:groupId',authenticatecontroller.authenticate,chatcontroller.sendnewchats )


module.exports= router


//app.use('/chat',chatroutes)