// Importing necessary modules
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import completedHabits from './models/CompletedHabits.js'
import currentHabits from './models/currentHabits.js'
import OpenAI from 'openai'

// Configuring dotenv
dotenv.config();

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://shalder:rishi1105@treejam.p584kjj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to database'));

// OpenAI client initialization
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// API endpoints
app.get("/current-habits", async (req, res) => {
    try {
        const habits = await currentHabits.find();
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Adds habit to requested habit type and frequency
// For weekly activities, the scheduled day is the current day of the week
app.put("/add-habit", async (req, res) => {
    console.log('request')
    // console.log
    console.log('hi')
    const newData = req.body
    console.log('new data: ')
    
    console.log(newData)



    try {
        let existingData = await currentHabits.findOne()
        if (!existingData) {
            return res.status(404).json({ error: 'Data not found' })
        }

        const elementToAdd = {
            title: newData['title'],
            description: newData['description']
        }

        if (newData['frequency'] === "weekly") {
            const d = new Date()
            const day = d.getDay()

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
        const newHabitType = newData['habitType']
        const newFrequency = newData['frequency']
        
        // add new habit
        existingData[newHabitType][newFrequency].push(elementToAdd)
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

// app.listen(PORT, () => {
//     console.log('server running')
// })

app.get("/test", (req, res) => {
    res.json({message: "Hello World!"})
})


app.post('/generate-text', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150,
          });
          console.log(response);
        res.json({ response: response.choices[0].text.trim() });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Error generating text');
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});