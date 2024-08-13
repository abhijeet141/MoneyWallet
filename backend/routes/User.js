const express = require('express')
const {User, Account} = require('../database/db')
const userValidation = require('../middleware/userValidation')
const jwt_secret = require('./config')
const jwt = require('jsonwebtoken')
// const nodemailer = require('nodemailer'); 
const Hash = require('../crypto')
const userMiddleware = require('../middleware/userMiddleware')
const zod = require('zod')
const router = express.Router()

// const transporter = nodemailer.createTransport({ 
// 	host: secure_configuration.HOST,
//             port: secure_configuration.PORT,
// 	auth: { 
// 		user: secure_configuration.EMAIL_USERNAME, 
// 		pass: secure_configuration.PASSWORD 
// 	} 
// }); 

// const token = jwt.sign({
//     data: "Token Data"
// }, 'ourSecretKey', { expiresIn: '10m' } )

router.post('/signup',userValidation,async(req,res)=>{
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const hashedPassword = Hash(password)
    const user = new User({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword
    })
    user.save();
    const userId = user._id;
    await Account.create({
        userId,
        balance: 1 + Math.random()*1000
    })
    const response = await User.findOne({
        username: username
    })
    if(response){
        const tokenId = jwt.sign({
            username: username
        },jwt_secret)
        req.userId = response._id;
        res.json({
            message: "user created sucessfully",
            token: tokenId
        })
    }
    else{
        res.status(403).json({
            message: "User not exists"
        })
    }
})

router.post('/signin',async(req,res)=>{
    const {username, password} = req.body;
    const hashedPassword = Hash(password)
    const response = await User.findOne({
        username: username,
        password: hashedPassword
    })
    if(response){
        const tokenId = jwt.sign({
            username: username
        },jwt_secret)
        req.userId = response._id;
        console.log(req.userId);
        res.json({
            tokenId
        })
    }
    else{
        res.status(403).json({
            message: "User not exists"
        })
    }
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put('/',userMiddleware,async (req,res)=>{
    const response = updateBody.safeParse(req.body);
    if(!response.success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne(req.body,{
        id: req.userId
    })

    res.json({
        message: "user updated sucessfully"
    })
})

router.get('/bulk',userMiddleware,async (req,res)=>{
    const filter = req.query.filter || "";
    console.log(req.userId);
    const users = await User.find({
        $or:[{
            firstName: {
                "$regex": filter
            }
        },{
            lastName:{
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.filter(user => req.userId.toString() != user._id.toString()).map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id        
        }))
    })
})


module.exports = router;