// Home.jsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [showContent, setShowContent] = useState(false); // State to manage visibility

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true); // Show content after 1 second
        }, 1000); // Adjust time as needed

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <div className="home-container">
            <h1 className={`welcome ${showContent ? 'show' : ''}`}>Welcome to Quiz App</h1>
            <div className="btn-group">
                <Link to="/signup" className={`btn ${showContent ? 'show' : ''}`}>Sign Up</Link>
                <Link to="/login" className={`btn ${showContent ? 'show' : ''}`}>Login</Link>
            </div>
        </div>
    );
};

export default Home;
