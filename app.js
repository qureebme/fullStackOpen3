const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/router')


const mongoURI = config.mongoURI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('successfully connected to mongodb'))
        .catch((err) => console.log(`CONNECTION ERROR: ${err}`))

        
app.use(cors())
app.use(bodyParser.json())


app.use('/api/blogs', blogRouter)


module.exports = app