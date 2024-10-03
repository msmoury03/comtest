// quizController.js 

const Quiz = require('../models/Quiz');

// Create quiz
exports.createQuiz = async (req, res) => {
    try {
        console.log(req.body.questions); // Log incoming data
        const newQuiz = new Quiz({
            questions: req.body.questions,
        });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating quiz' });
    }
};


// Get quizzes (for the user page)
exports.getQuiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find(); // Retrieve all quizzes from the database
        res.status(200).json(quizzes); // Send quizzes back as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
};