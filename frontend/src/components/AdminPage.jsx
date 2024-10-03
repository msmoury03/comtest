// AdminPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // You can create a separate CSS file for styling

const AdminPage = () => {
    const [quizzes, setQuizzes] = useState([
        { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate(); // To navigate to the home page

    const handleInputChange = (index, field, value) => {
        const newQuizzes = [...quizzes];
        if (field === 'questionText') {
            newQuizzes[index].questionText = value;
        } else if (field.startsWith('option')) {
            const optionIndex = parseInt(field.split('_')[1]);
            newQuizzes[index].options[optionIndex] = value;
        } else if (field === 'correctAnswer') {
            newQuizzes[index].correctAnswer = value;
        }
        setQuizzes(newQuizzes);
    };

    const handleSubmit = async () => {
        // Check if all fields are filled out
        const isValid = quizzes.every(quiz =>
            quiz.questionText &&
            quiz.correctAnswer &&
            quiz.options.every(option => option) // Ensure every option is filled
        );

        if (!isValid) {
            // Set a toast message and prevent submission
            setToastMessage('Please fill out all fields before saving.');
            return; // Exit the function if validation fails
        }

        try {
            const formattedQuizzes = quizzes.map(quiz => ({
                questionText: quiz.questionText,
                options: quiz.options,
                correctAnswer: quiz.correctAnswer
            }));

            const response = await axios.post('https://quiz-applications-backend.onrender.com/api/quiz/create', { questions: formattedQuizzes });
            console.log('Quiz saved successfully:', response.data);
            setToastMessage('Quiz has been created successfully!'); // Set toast message
            setQuizzes([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]); // Reset state
        } catch (error) {
            console.error('Error saving quiz:', error);
        }
    };

    const handleHomeRedirect = () => {
        navigate('/'); // Redirect to home page
    };

    return (
        <div className='mainbox'>
            <h1>Create Quiz</h1>
            {quizzes.map((quiz, index) => (
                <div key={index}>
                    <input
                        className='input_AP'
                        type="text"
                        placeholder="Enter question"
                        value={quiz.questionText}
                        onChange={(e) => handleInputChange(index, 'questionText', e.target.value)}
                    />
                    <div>
                        {quiz.options.map((option, optionIndex) => (
                            <input
                                className='input_AP'
                                key={optionIndex}
                                type="text"
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) => handleInputChange(index, `option_${optionIndex}`, e.target.value)}
                            />
                        ))}
                    </div>
                    <input
                        className='input_AP'
                        type="text"
                        placeholder="Correct answer"
                        value={quiz.correctAnswer}
                        onChange={(e) => handleInputChange(index, 'correctAnswer', e.target.value)}
                    />
                </div>
            ))}
            <button onClick={handleSubmit}>Save</button>
            <button onClick={handleHomeRedirect}>Home</button>
            {toastMessage && <div className="toast">{toastMessage}</div>} {/* Toast message */}
        </div>
    );
};

export default AdminPage;
