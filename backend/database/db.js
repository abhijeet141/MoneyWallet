const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },
    firstName:{
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 3
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account',accountSchema)


module.exports = {
    User,
    Account
}