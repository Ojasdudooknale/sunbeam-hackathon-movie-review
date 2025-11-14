const express = require('express')
const cors = require('cors')

//user defined modules
const userRouter = require('./routes/users')
const authorization = require('./utils/auth')

const app = express()
app.use(authorization)

//middleware
app.use(cors())
app.use(express.json())
app.use('/user', userRouter)


app.listen(4000, 'localhost', () => {
    console.log('server started at port 4000')
})