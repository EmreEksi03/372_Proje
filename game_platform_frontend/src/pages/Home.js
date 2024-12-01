import React from 'react';
import { Link } from 'react-router-dom'; // react-router-dom'dan Link import ettik
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to the Game Platform</h1>
        <p className="hero-description">Explore, Discover, and Purchase the Best Games Available!</p>
        <div className="cta-buttons">
          {/* Link ile yönlendirme ekliyoruz */}
          <Link to="/games">
            <button className="cta-btn primary">Browse Games</button>
          </Link>
          <Link to="/learn-more">
          <button className="cta-btn secondary">Learn More</button></Link>
        </div>
      </div>
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Wide Selection</h3>
            <p>Choose from a vast library of games across various genres.</p>
          </div>
          <div className="feature-card">
            <h3>Safe Transactions</h3>
            <p>Secure payment methods for worry-free purchases.</p>
          </div>
          <div className="feature-card">
            <h3>Instant Downloads</h3>
            <p>Start playing your new games immediately after purchase.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;