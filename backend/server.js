const express = require('express')
const cors = require('cors')

//user defined modules
const userRouter = require('./routes/users')
const movieRouter = require('./routes/movies')
const reviewRouter = require('./routes/reviews')
const shareRouter = require('./routes/shares')
const authorization = require('./utils/auth')

const app = express()

//middleware

app.use(cors())
app.use(authorization)
app.use(express.json())
app.use('/user', userRouter)
app.use('/movie', movieRouter)
app.use('/review', reviewRouter)
app.use('/share', shareRouter)


app.listen(4000, 'localhost', () => {
    console.log('server started at port 4000')
})