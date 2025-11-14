const express = require('express')

//user defined modules
const userRouter = require('./routes/users')

const app = express()

//middleware
app.use(express.json())
app.use('/user', userRouter)

app.listen(4000, 'localhost', () => {
    console.log('server started at port 4000')
})