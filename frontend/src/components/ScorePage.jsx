import { Link } from 'react-router-dom';

const ScorePage = ({ score }) => {
    return (
        <div className="score-page">
            <h2>Your Final Score: {score}</h2>
            <Link to="/quiz" className="retry-btn">Retry Quiz</Link>
            <Link to="/" className="home-btn">Back to Home</Link>
        </div>
    );
};

export default ScorePage;
