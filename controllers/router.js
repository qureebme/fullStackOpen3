const blogRouter = require('express').Router()
const Blog = require('../models/blog')

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

module.exports = blogRouter