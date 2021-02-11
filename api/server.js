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
        .catch(() => {
            res.status(500).json({
                message: "The users information could not be retrieved"
            })
        })
})


//Get user
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await db.findById(req.params.id)
        if(user){
            res.json(user)
        } else {
            res.status(404).json({ 
                message: 'The user with the specified ID does not exist'
            })
        }
    } catch (err) {
         err.status(500).json({
            message: "The user information could not be retrieved"
         })
        }
    })

//Update user
server.put('/api/users/:id', async (req, res) => {
    if(!req.body.name || !req.body.bio){
        res.status(400).json({ 
            message: "Please provide name and bio for the user" 
        }) 
    } else {
        try {
            const user = await db.update(req.params.id, req.body)
            if(user){
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }
        } catch (err) {
            err.status(500).json({
                message: "The user information could not be modified"
            })
        }
    }
})

//Insert user
server.post('/api/users/', async (req, res) => {
    
    if(!req.body.name || !req.body.bio){
        res.status(400).json({ 
            message: "Please provide name and bio for the user" 
        })
    } else {

        const newUser = await db.insert({
            name: req.body.name,
            bio: req.body.bio
        })

        if(newUser){
            res.status(201).json(newUser)
        } else {
            res.status(500).json({
                message: "There was an error while saving the user to the database"
            })
        }

    }
    
})

//Delete user
server.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await db.remove(req.params.id)
        if(user){
            res.status(204).end()
        } else {
            res.status(404).json({ 
                message: "The user with the specified ID does not exist" 
            })
        }
    } catch (err) {
        err.status(500).json({ 
            message: "The user could not be removed" 
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of 