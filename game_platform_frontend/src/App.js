import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import User from './pages/User';
import LearnMore from './pages/LearnMore';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/learn-more" element={<LearnMore />} />
      </Routes>
    </Router>
  );
}

export default App;
