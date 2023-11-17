import mongoose from 'mongoose';

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
});

export default mongoose.model('currentHabits', currentHabitsSchema, 'currentHabits');