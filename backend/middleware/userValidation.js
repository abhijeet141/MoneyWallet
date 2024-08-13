const zod = require('zod')
const {User} = require('../database/db')

const schema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

async function userValidation(req,res,next){
    const user = req.body;
    const response = schema.safeParse(user);
    console.log(user);
    
    console.log(response);
    
    if(!response.success){
        res.status(404).json({
            message: "Incorrect Inputs"
        })
    }
    else{
        const existingUser = await User.findOne({
            username: user.username
        })
        if(existingUser){
            res.json({
                message: "User already exists please login"
            })
            return;
        }
        else{
            next();
        }
    }
}

module.exports = userValidation;