// Quiz.js 

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    questions: [
        {
            questionText: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true },  // Correct answer field
        }
    ]
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
