const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('api tests', () => {

    test('Blog returns the correct number of blog posts in json format', async () => {
        let results = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

            expect(results.body.length).toBe(11)
    })

    test('Expect id to be defined', async () => {
        let results = await api
                .get('/api/blogs')
            results.body.map((item) => {expect(item.id).toBeDefined()})
    })

    test('Post request succesfully creates new blog post', async () => {
        let blogEntry = {
            title: 'test blog2',
            author: 'tyson gay',
            url: 'www.2die4.com',
            likes: 8
        }
        let get1 = await api.get('/api/blogs').expect(200),
            initialNumber = get1.body.length;

        let post1 = await api.post('/api/blogs')
                            .send(blogEntry)
                            .expect(201)

        let get2 = await api.get('/api/blogs').expect(200),
            finalNumber = get2.body.length;

        expect(finalNumber).toBe(initialNumber + 1)
    })

    test.only('If likes prop is missing, default to zero', async () => {
        let blogEntry = {
            title: 'test blog2',
            author: 'tyson gay',
            url: 'www.2die4.com'
        }
        let req = await api.post('/api/blogs')
                    .send(blogEntry)
                    .expect(201)
        expect(req.body.likes).toBe(0)
    })
})


afterAll(() => {
    mongoose.connection.close()
  })