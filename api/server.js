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

//Get user
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await db.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(404).json({
            message: 'user not found'
        })
    }
    })

//Update user
server.put('/api/users/:id', async (req, res) => {
    const user = await db.update(req.params.id, req.body)
    if(user){
        res.json(user)
    } else {
        res.status(404).json({
            message: 'user does not exist'
        })
    }
})

//Delete user
server.delete('/api/users/:id', async (req, res) => {
    const user = await db.remove(req.params.id)
    if(!user){
        res.status(404).json({
            message: 'User does not exist'
        })
    } else {
        res.status(204).end()
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of 