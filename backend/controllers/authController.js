// authController.js 

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "e4b74e8d1f91234a8b930abd18cd102f65ad3471343c99a67f1234a8df30ef56";

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};
