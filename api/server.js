// BUILD YOUR SERVER HERE

const express = require('express')
const db = require('./users/model')

const server = express()

server.use(express.json())

server.get('/', (req,res) => {
    res.json({
        message: 'I am the homepage'
    })
})

server.get('/api/users', (req, res) => {
    const users = db.find()
    res.json(users)
})

server.get('/api/users/:id', (req, res) => {
    const user = db.findById(req.params.id)
    if(user){
        res.json(user)
    } else {
        res.status(404).json({
            message: 'user not found'
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
