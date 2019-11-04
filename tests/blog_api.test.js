const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('api tests', () => {

    test.only('Blog returns the correct number of blog posts in json format', async () => {
        let results = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

            expect(results.body.length).toBe(11)
    })
})


afterAll(() => {
    mongoose.connection.close()
  })