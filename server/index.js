// Node backend

const PORT = 3001
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')

const app = express()
app.use(cors())
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

// Adds habit to requested habit type and frequency
// For weekly activities, the scheduled day is the current day of the week
app.put("/add-habit", async (req, res) => {
    const newData = req.body

    try {
        const existingData = await currentHabits.findOne({})

        if (!existingData) {
            return res.status(404).json({ error: 'Data not found' })
        }

        const elementToAdd = {
            title: newData.title,
            description: newData.description
        }

        if (newData.frequency === "weekly") {
            const d = new Date()
            let day = d.getDay()

            switch(day) {
                case 0:
                    elementToAdd.day = "Sunday"
                    break
                case 1:
                    elementToAdd.day = "Monday"
                    break
                case 2:
                    elementToAdd.day = "Tuesday"
                    break
                case 3:
                    elementToAdd.day = "Wednesday"
                    break
                case 4:
                    elementToAdd.day = "Thursday"
                    break
                case 5:
                    elementToAdd.day = "Friday"
                    break
                case 6:
                    elementToAdd.day = "Saturday"
                    break
            }
        }
        
        if (newData.habitType === "social") {
            existingData.social.push(elementToAdd)
        } else if (newData.habitType === "academic") {
            existingData.academic.push(elementToAdd)
        } else if (newData.habitType === "personal") {
            existingData.personal.push(elementToAdd)
        }

        const updatedData = await existingData.save()

        res.json(updatedData)
    } catch (error) {
        console.error('Error pushing elements to the nested array in MongoDB:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Updates description of existing habit searched by title regardless of types
app.put("/edit-habit", async (req, res) => {
    const newData = req.body

    try {
        const existingData = await currentHabits.findOne({})

        if (!existingData) {
            return res.status(404).json({ error: 'Data not found' })
        }

        if (newData.habitType === "social") {
            for (const doc of existingData.social) {
                if (doc.title === newData.title) {
                    doc.description = newData.description
                    await doc.save()
                }
            }
        } else if (newData.habitType === "academic") {
            for (const doc of existingData.academic) {
                if (doc.title === newData.title) {
                    doc.description = newData.description
                    await doc.save()
                }
            }
        } else if (newData.habitType === "personal") {
            for (const doc of existingData.personal) {
                if (doc.title === newData.title) {
                    doc.description = newData.description
                    await doc.save()
                }
            }
        }

        const updatedData = await existingData.save()

        res.json(updatedData)
    } catch (error) {
        console.error('Error editing elements to the nested array in MongoDB:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.put("/add-completed-habit", async (req, res) => {
    const newData = req.body

    try {
        const existingData = await completedHabits.findOne({})

        if (!existingData) {
            return res.status(404).json({ error: 'Data not found' })
        }

        const elementToAdd = {
            title: newData.title,
            description: newData.description
        }

        existingData.push(elementToAdd)

        const updatedData = await existingData.save()

        res.json(updatedData)
    } catch (error) {
        console.error('Error pushing elements to the completedHabits nested array in MongoDB:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.listen(PORT, () => {
    console.log('server running')
})

app.get("/test", (req, res) => {
    res.json({message: "Hello World!"})
})