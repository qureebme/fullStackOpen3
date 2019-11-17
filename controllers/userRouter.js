const userRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

userRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        if (!body.username || !body.password){
            return res.status(400).send({error: 'username and password must be given'})
        }
        if (!(body.username.length > 2) || !(body.password.length > 2)){
            return res.status(400).send({error: 'username or password is too short'})
        }
        if (!body.name){
            return res.status(400).send({error: 'name must be provided'})
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
                            .populate('blogs', {url: 1, title: 1, author: 1})
    res.status(200).json(list)
})

module.exports = userRouter