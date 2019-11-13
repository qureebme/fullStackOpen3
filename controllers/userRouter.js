const userRouter = require('express').Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

userRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        if (!body.username || !body.password){
            return res.status(400).send('username and password must be given')
        }
        if (!(body.username.length > 2) || !(body.password.length > 2) || !(body.name)){
            return res.status(400).send('username or password is too short')
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        
        const savedUser = await user.save()
        res.json(savedUser)
    }
    catch (exception) {
    next(exception)
    }
})

userRouter.get('/', async (req, res) => {
    let list = await User.find({})
    res.status(200).json(list)
})

module.exports = userRouter