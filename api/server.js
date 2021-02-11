// BUILD YOUR SERVER HERE

const express = require('express')
const db = require('./users/model')

const server = express()

server.use(express.json())

//Homepage
server.get('/', (req,res) => {
    res.json({
        message: 'I am the homepage'
    })
})

//Get all users
server.get('/api/users', async (req, res) => {
    db.find()
        .then(users => {
            res.json(users)
        })
})


const notFound = { message: 'user not found'}

//Get user
server.get('/api/users/:id', async (req, res) => {
        const user = await db.findById(req.params.id)
        if(user){
            res.json(user)
        } else {
            res.status(404).json(notFound)
        }
    })

//Update user
server.put('/api/users/:id', async (req, res) => {
    const user = await db.update(req.params.id, req.body)
    if(user){
        res.json(user)
    } else {
        res.status(404).json(notFound)
    }
})

//Insert user
server.post('/api/users/', async (req, res) => {
    const newUser = await db.insert({
        name: req.body.name,
        bio: req.body.bio
    })
    if(newUser){
        res.status(201).json(newUser)
    } else {
        res.json({
            message: 'there has been an error'
        })
    }
})

//Delete user
server.delete('/api/users/:id', async (req, res) => {
    const user = await db.remove(req.params.id)
    if(user){
        res.status(204).end()
    } else {
        res.status(404).json(notFound)
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of 