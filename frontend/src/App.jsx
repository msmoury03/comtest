// App.jsx 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/SignUp';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import QuizPage from './components/QuizPage';
import ScorePage from './components/ScorePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
