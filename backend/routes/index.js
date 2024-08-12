const express = require('express')

const router = express.Router()

const userRouter = require('./User')
const accountRouter = require('./Account')

router.use('/user',userRouter)
router.use('/account',accountRouter)


module.exports = router;