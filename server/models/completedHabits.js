const mongoose = require('mongoose')

const completedHabits = new mongoose.Schema({
    completedHabits: Object
})

module.exports = mongoose.model('completedHabits', completedHabits)

