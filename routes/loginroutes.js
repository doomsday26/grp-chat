const express= require('express')
const router= express.Router()
const logincontrollers=require('../controllers/logincontrollers')


router.post('/',logincontrollers.login)
router.get('/forgetpass',)

module.exports = router
