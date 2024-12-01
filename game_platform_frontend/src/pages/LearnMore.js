import React from 'react';
import './LearnMore.css'; // Stil dosyasını ekleyebilirsiniz

function LearnMore() {
  return (
    <div className="learn-more-container">
      <div className="hero-section">
        <h1 className="hero-title">Learn More About Our Platform</h1>
        <p className="hero-description">
          We are dedicated to providing the best experience for gamers. Our platform offers a wide range of features to help you explore, discover, and purchase your favorite games securely.
        </p>
      </div>
      <div className="info-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Wide Selection:</strong> Access to a broad library of games from various genres.</li>
          <li><strong>Safe Transactions:</strong> Secure and reliable payment methods for peace of mind.</li>
          <li><strong>Instant Access:</strong> Download your games instantly after purchase.</li>
          <li><strong>Customer Support:</strong> 24/7 support to assist with any issues.</li>
        </ul>
      </div>
    </div>
  );
}

export default LearnMore;