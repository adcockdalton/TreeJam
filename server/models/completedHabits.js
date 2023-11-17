import mongoose from 'mongoose';

const completedHabits = new mongoose.Schema({
    completedHabits: Object
});

export default mongoose.model('completedHabits', completedHabits);

