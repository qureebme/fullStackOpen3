const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
let allUsers = [];

beforeEach(async () => {
    let req = await api.get('/api/users')
                        .expect(200)
                        .expect('Content-Type', /application\/json/)
        allUsers = req.body
})

describe('user API tests', () => {

    test('new user not created when password length is less than 3', async () =>{
        const User = {
            name: 'Sauli Niinisto',
            username: 'sauli1',
            password: 'Ni'
        }
        let req1 = await api.post('/api/users')
                            .send(User)
                            .expect(400)
        let req2 = await api.get('/api/users')
                            .expect(200)
        expect(req2.body.length).toBe(allUsers.length)
    })

    test('new user not created when username length is less than 3', async () =>{
        const User = {
            name: 'Sauli Niinisto',
            username: 'sa',
            password: 'Niinisto'
        }

        let req1 = await api.post('/api/users')
                                .send(User)
                                .expect(400)
        let req2 = await api.get('/api/users')
                            .expect(200)
        expect(req2.body.length).toBe(allUsers.length)
    })

    test('new user not created when username is missing', async () =>{
        const User = {
            name: 'Sauli Niinisto',
            password: 'Niinisto'
        }
        let req1 = await api.post('/api/users')
                                .send(User)
                                .expect(400)
                                
        let req2 = await api.get('/api/users')
                            .expect(200)
        expect(req2.body.length).toBe(allUsers.length)
    })

    test('new user not created when password is missing', async () =>{
        const User = {
            name: 'Sauli Niinisto',
            username: 'sa'
        }
        let req1 = await api.post('/api/users')
                                .send(User)
                                .expect(400)
        let req2 = await api.get('/api/users')
                            .expect(200)
        expect(req2.body.length).toBe(allUsers.length)
    })

    test('new user not created when name is missing', async () =>{
        const User = {
            username: 'sa',
            password: 'Niinisto'
        }
        let req1 = await api.post('/api/users')
                                .send(User)
                                .expect(400)
        let req2 = await api.get('/api/users')
                            .expect(200)
        expect(req2.body.length).toBe(allUsers.length)
    })

    test('new user not created when username already exists', async () =>{
        const User = {
            name: 'Sauli Niinisto',
            password: 'Niinisto'
        }
        User.username = allUsers[0].username

        let req1 = await api.post('/api/users')
                                .send(User)
                                .expect(400)
        let req2 = await api.get('/api/users')
                            .expect(200)
        expect(req2.body.length).toBe(allUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })