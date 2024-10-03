// UserPage.jsx

import { Link } from 'react-router-dom';
import './UserPage.css'

const UserPage = () => {
    const greetings = ['Welcome!', 'Hello!', 'Hi there!', 'Ready to test your knowledge?'];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    return (
        <div className="user-page-container">
            <h2>{randomGreeting}</h2>
            <Link to="/quiz" className="start-btn">Start Quiz</Link>
        </div>
    );
};

export default UserPage;
