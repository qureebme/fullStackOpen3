const config = require('../utils/config')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Users = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .populate('user', {username: 1, name: 1})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/', async (request, response, next) => {
    let blog = new Blog(request.body)

    try {
        const decodedToken = jwt.verify(request.token, config.SECRET)
        if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
        }

        if(!blog.url || !blog.title){
          response.status(400).end({error: "url and title must be provided"})
          return
        }

        const user = await Users.findById(decodedToken.id)

        if(!blog.likes){
          blog.likes = 0
        }
        blog.user = user._id
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        
        response.status(201).json(savedBlog.toJSON())
    }
    catch(err){
      next(err)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {

    try{
      const decodedToken = jwt.verify(request.token, config.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
        }

      const user = await Users.findById(decodedToken.id)
      const blog = await Blog.findById({_id: request.params.id})

      if(user.id.toString() === blog.user.toString()) {
        await Blog.deleteOne({_id: request.params.id})
            .then((result) => {
              response.status(200).json({deletedCount: result.deletedCount})
            })
      }

      else response.status(403).send({error: 'forbidden request!'})
    }
    catch(err){
      next(err)
    }
})

blogRouter.patch('/:id', async (request, response) => {
  await Blog.updateOne({_id: request.params.id}, request.body)
            .then((result) => {
              response.status(200).json({nModified: result.nModified})
            })
            .catch((err) => response.status(400).end('No document matched'))
})

module.exports = blogRouter