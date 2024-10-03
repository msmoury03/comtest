//  SignUp.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();
    const [showElements, setShowElements] = useState(false);

    useEffect(() => {
        // Add 'show' class to inputs and button after a delay
        setTimeout(() => {
            setShowElements(true);
        }, 500); // Delay for animation
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://quiz-applications-backend.onrender.com/api/signup', formData);
            toast.success('Signup successful Please login', {
                autoClose: 2000,
                className: 'toast-success',
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Signup Error:', error);
            toast.error('Signup failed! Please try again.', {
                autoClose: 2000,
                className: 'toast-error',
            });
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <h3>Username</h3>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={showElements ? 'show' : ''}
                />
                <h3>Email</h3>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={showElements ? 'show' : ''}
                />
                <h3>Password</h3>
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={showElements ? 'show' : ''}
                />
                <button type="submit" className={showElements ? 'show' : ''}>
                    Sign Up
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;
