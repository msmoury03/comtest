// server.js 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Use the port from environment variables
const MONGO_URI = process.env.MONGO_URI; // Use the MongoDB URI from environment variables

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
