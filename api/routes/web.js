const express=require('express')
const BlogController = require('../controllers/BlogController')
const UserController = require('../controllers/UserController')
const router=express.Router()


//blogcontroller
router.post('/create',BlogController.create)
router.get('/display',BlogController.display)
router.get('/view/:id',BlogController.view)
router.post('/update/:id',BlogController.update)
router.get('/delete/:id',BlogController.delete)

//usercontroller
router.post('/register',UserController.userregistration)
router.post('/login',UserController.verifylogin)
router.get('/getalluser',UserController.GetAllUser)
router.get('/view/:id',UserController.View)

module.exports=router