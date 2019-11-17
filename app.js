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

app.use(errorHandler)

module.exports = app

function errorHandler(err, req, res, next) {
        if (err.name == "ValidationError") res.status(400).json({error: err.message})

        else if (err.name === 'CastError' && err.kind === 'ObjectId') {
                return res.status(400).json({error: 'malformatted id'})
                }
        else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({error: 'invalid token'})
                }
        else res.status(500).send({error: 'Server error'})
    }