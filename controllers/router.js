const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose');

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/', (request, response) => {
    let blog = new Blog(request.body)

    if(!blog.url || !blog.title){
      response.status(400).end()
      return
    }

    if(!blog.likes){
      blog.likes = 0
    }

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne({_id: request.params.id})
            .then((result) => {
              response.status(200).json({deletedCount: result.deletedCount})
            })
            .catch((err) => response.status(400).end())
})

module.exports = blogRouter