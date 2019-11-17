const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const users = require('../models/user')
const mongoose = require('mongoose');

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .populate('user', {username: 1, name: 1})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/', async (request, response) => {
    let blog = new Blog(request.body)

    if(!blog.url || !blog.title){
      response.status(400).end()
      return
    }
    let oneUser = await users.findOne({})

    if(!blog.likes){
      blog.likes = 0
    }
    blog.user = oneUser._id
    const savedBlog = await blog.save()

    oneUser.blogs = oneUser.blogs.concat(savedBlog._id)
    await oneUser.save()
    
    response.status(201).json(savedBlog.toJSON())

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne({_id: request.params.id})
            .then((result) => {
              response.status(200).json({deletedCount: result.deletedCount})
            })
            .catch((err) => response.status(400).end())
})

blogRouter.patch('/:id', async (request, response) => {
  await Blog.updateOne({_id: request.params.id}, request.body)
            .then((result) => {
              response.status(200).json({nModified: result.nModified})
            })
            .catch((err) => response.status(400).end('No document matched'))
})

module.exports = blogRouter