const express = require("express")
const bodyParser = require("body-parser")
const CORS = require('cors')
require('dotenv').config()

const mainRouter = require('./routes/index')

const app = express()

app.use(CORS())

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.use('/api/v1',mainRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    
})