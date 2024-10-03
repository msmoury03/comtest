// quizRoutes.js 

const express = require('express');
const quizController = require('../controllers/quizController');

const router = express.Router();

router.post('/create', quizController.createQuiz);
router.get('/', quizController.getQuiz); // Change the route path to /quizzes

module.exports = router;