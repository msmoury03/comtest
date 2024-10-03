// QuizPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuizPage.css'; // Import the new CSS file

const QuizPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [randomQuizzes, setRandomQuizzes] = useState([]); // For storing random 5 quizzes
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('https://quiz-applications-backend.onrender.com/api/quiz');
                console.log(response.data); // Log response data
                setQuizzes(response.data); // Set quizzes directly from response
                generateRandomQuizzes(response.data); // Generate initial 5 random quizzes
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                alert('Error fetching quizzes, please try again later.');
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchQuizzes();
    }, []);

    // Shuffle quizzes and select 5 random quizzes
    const generateRandomQuizzes = (allQuizzes) => {
        const shuffled = allQuizzes.sort(() => 0.5 - Math.random()); // Shuffle quizzes
        const selectedQuizzes = shuffled.slice(0, 5); // Select first 5 quizzes after shuffling
        setRandomQuizzes(selectedQuizzes);
        setUserAnswers(new Array(5).fill(null).map(() => [])); // Initialize userAnswers for 5 quizzes
    };

    const handleAnswerSelect = (quizIndex, questionIndex, answer) => {
        const newAnswers = [...userAnswers];
        if (!newAnswers[quizIndex]) {
            newAnswers[quizIndex] = []; // Initialize the array if it's undefined
        }
        newAnswers[quizIndex][questionIndex] = answer; // Set the answer for the specific question
        setUserAnswers(newAnswers); // Update userAnswers state
    };

    const handleSubmitQuiz = () => {
        let calculatedScore = 0;
        randomQuizzes.forEach((quiz, quizIndex) => {
            quiz.questions.forEach((question, questionIndex) => {
                if (userAnswers[quizIndex] && userAnswers[quizIndex][questionIndex] === question.correctAnswer) {
                    calculatedScore++;
                }
            });
        });
        setScore(calculatedScore);
    };

    const handleRestartQuiz = () => {
        generateRandomQuizzes(quizzes); // Generate a new set of random quizzes
        setScore(null); // Reset the score
    };

    if (loading) {
        return <div className='Loading'>Loading quizzes...</div>; // Show loading message
    }

    if (score !== null) {
        // Show the score at the end of the quiz
        return (
            <div className='maindiv'>
                <h1 className='scoreH1'>Your Score: {score} / {randomQuizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}</h1>
                <div className='btnsmaim'>
                    <button onClick={handleRestartQuiz}>Restart Quiz</button>
                    <button onClick={() => navigate('/')}>Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className='mainbop'>
            <h1 className='QuizH1'>Quiz</h1>
            {randomQuizzes.length === 0 ? (
                <p>No quizzes available</p>
            ) : (
                <div>
                    {randomQuizzes.map((quiz, quizIndex) => (
                        <div className="quiz-container" key={quizIndex}>
                            <h2>{quiz.questionText}</h2>
                            {quiz.questions.map((question, questionIndex) => (
                                <div className="quiz-question" key={questionIndex}>
                                    <h3>{question.questionText}</h3>
                                    <div className="options">
                                        {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex}>
                                                <input
                                                    className='checkboxll'
                                                    type="radio"
                                                    name={`quiz_${quizIndex}_question_${questionIndex}`} // Unique name for each question
                                                    value={option}
                                                    onChange={() => handleAnswerSelect(quizIndex, questionIndex, option)}
                                                    checked={userAnswers[quizIndex]?.[questionIndex] === option} // Manage checked state
                                                />
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={handleSubmitQuiz}>Submit All</button>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
