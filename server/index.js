// Node backend

const PORT = 3001
const mongoose = require('mongoose')
const express = require('express')

const app = express()
app.use(express.json())
// connect to databse
mongoose.connect('mongodb+srv://shalder:rishi1105@treejam.p584kjj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log('connected to database')
})
