// Login.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showElements, setShowElements] = useState(false);

    useEffect(() => {
        // Add 'show' class to inputs and button after a delay
        setTimeout(() => {
            setShowElements(true);
        }, 500); // Delay for animation
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://quiz-applications-backend.onrender.com/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            const role = response.data.role;
            toast.success('Login successful!', {
                autoClose: 2000,
                className: 'toast-success',
            });

            // Navigate after the toast is displayed
            setTimeout(() => {
                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/user');
                }
            }, 2000);
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Login failed!', {
                autoClose: 2000,
                className: 'toast-error',
            });
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <h3>Email</h3>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={showElements ? 'show' : ''}
                />
                <h3>Password</h3>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={showElements ? 'show' : ''}
                />
                <button type="submit" className={showElements ? 'show' : ''}>
                    Login
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
