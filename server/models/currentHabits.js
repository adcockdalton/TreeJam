const mongoose = require('mongoose')

const currentHabitsSchema = new mongoose.Schema({
    social: {
        daily: Array,
        weekly: Array
    },
    academic: {
        daily: Array,
        weekly: Array
    },

    personal: {
        daily: Array,
        weekly: Array
    }
})

module.exports = mongoose.model('currentHabits', currentHabitsSchema, 'currentHabits')