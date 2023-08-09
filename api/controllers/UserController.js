const UserModel=require('../models/user')
const bcrypt = require('bcrypt')
const cloudinary=require('cloudinary').v2
const jwt = require('jsonwebtoken')

cloudinary.config({ 
    cloud_name: 'dnroacutk', 
    api_key: '956193383899983', 
    api_secret: 'fiAOrevYJW_D-HW7sWgAcNIwMNs',
    // secure: true
  });

class UserController{
    static userregistration = async (req, res) => {
        // console.log(req.files.avatar)
        const file=req.files.image
        const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'blogs_image',
        })
        try {
            //   console.log(req.body)
            const { name, email, password, cpassword } = req.body
            const user = await UserModel.findOne({ email: email })
            if (user) {
                res.status(401).json({
                    message:"email already exist"
                })
            }
            else {
                if (name && email && password && cpassword) {
                    if (password == cpassword) {
                        try {
                            const hashpassword = await bcrypt.hash(password, 10)
                            const result = new UserModel({
                                name: name,
                                email: email,
                                password: hashpassword,
                                image: {
                                    public_id: myimage.public_id,
                                    url: myimage.secure_url                     
                                }
                            })
                            const d=await result.save()
                            res.status(201).json({
                                message:"successfully registration 😃🍻😜😝",
                                result
                                // d
                            })
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        res.status(401).json({
                            message:"password and confirm password doesnot change"
                        })
                    }
                } else {
                    res.status(401).json({
                        message:"all fields are required"
                    })
                }
            }
        } catch (err) {
            console.log(err)
        }
        console.log(req.body)
    }
    static verifylogin = async (req, res) => {
        try {
            //  console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({
                    email: email
                })
                if (user != null) {
                    const ismatched = await bcrypt.compare(password, user.password)
                    if (ismatched) {
                        //token generates
                        const token = jwt.sign({ id: user._id }, 'stuti_software_engineer')
                        // console.log(token)
                        res.cookie('token', token)
                        res.status(201).json({
                            status:"success",
                            message:"login successfully with web token",
                            token:token,
                            user,
                         })
                    } else {
                        res.status(401).json({
                           message:"email or password not matched"
                        })
                    }
                } else {
                    res.status(401).json({
                        message:"you are not registered user"
                     })
                }
            }
            else {
                res.status(401).json({
                    message:"all field are required"
                 })
            }
        } catch (err) {
           res.send(err)
        }
    }
    static View = async(req,res)=>{

        const view = await UserModel.findById(req.params.id)
        res.status(200).json({
            success: true,
            view,
        });
    }
    static GetAllUser = async(req,res)=>{
        const users = await UserModel.find()
        //console.log(user)
        res.status(200).json({
            success: true,
            users,
        });
    }
}

module.exports=UserController