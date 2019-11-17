const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/router')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/login')

const mongoURI = config.MONGODB_URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('successfully connected to mongodb'))
        .catch((err) => console.log(`CONNECTION ERROR: ${err}`))

        
app.use(cors())
app.use(bodyParser.json())

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)


const errorHandler = (err, req, res, next) => {
        if (err.name == "ValidationError") res.status(400).send({error: 'username must be unique'})
        else res.status(500).send('Server error')
    }

app.use(errorHandler)
module.exports = app