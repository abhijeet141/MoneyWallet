const express = require('express');
const { Account } = require('../database/db');
const userMiddleware = require('../middleware/userMiddleware');
const mongoose = require('mongoose');

const router = express.Router()

router.post('/transfer',userMiddleware,async(req,res)=>{
    const session =  await mongoose.startSession();
    session.startTransaction();
    const {amount, to} = req.body;
    console.log(to);
    const account = await Account.findOne({
        userId: req.userId
    }).session(session);
    console.log(account);
    console.log(amount);
    console.log(account.balance);
    
    if(!account || account.balance<amount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        })
        return;
    }
    const toAccount = await Account.findOne({
        userId: to
    }).session(session);
    console.log(toAccount);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }
    await Account.updateOne({
        userId: req.userId
    },{
        $inc:{
            balance: -amount
        }
    }).session(session)

    await Account.updateOne({
        userId: to
    },{
        $inc:{
            balance: amount
        }
    }).session(session)
    //commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer Sucessful"
    })
})

router.get('/balance',userMiddleware,async (req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    })
    console.log(account);    
    res.json({
        balance: account.balance,
        firstName: req.firstName,
        lastName: req.lastName
    })
})

module.exports = router;