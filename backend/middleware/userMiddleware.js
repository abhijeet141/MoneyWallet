const jwt = require('jsonwebtoken')
const jwt_secret = require('../routes/config')
const {User} = require('../database/db')

async function userMiddleware(req,res,next){
    const token = req.headers.authorization;
    console.log(token);
    if(!token || !token.startsWith('Bearer ')){
        return res.status(403).json({})
    }
    const tokenId = token.split(" ")[1]    
    try{
        const response = jwt.verify(tokenId,jwt_secret)
        console.log("Decoded JWT payload:", response);
        req.username = response.username
        const user = await User.findOne({
            username: req.username
        })        
        req.userId = user._id;
        console.log(req.userId);
        next();
    }
    catch{
        res.status(403).json({})
    }
}

module.exports = userMiddleware;