// Node backend

const PORT = 3001
const mongoose = require('mongoose')
const express = require('express')

const app = express()
app.use(express.json())

// load mongoose schema models
const completedHabits = require('./models/completedHabits')
const currentHabits = require('./models/currentHabits')


// connect to databse
mongoose.connect('mongodb+srv://shalder:rishi1105@treejam.p584kjj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log('connected to database')
})

// API endpoint to get the user's currently active habits (daily/weekly)

app.get("/current-habits", async (req, res) => {
    try {
        console.log('getting habits')
        const habits = await currentHabits.find()
        console.log(habits)
        res.json(habits)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

app.listen(PORT, () => {
    console.log('server running')
})