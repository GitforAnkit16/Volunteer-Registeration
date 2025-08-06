import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to VolunteerHub</h1>
          <p>Join our community of interns and volunteers making a difference</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Apply as Intern
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Volunteer with Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <h2>Why Join Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Meaningful Work</h3>
              <p>Contribute to projects that make a real impact in the community</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Learn & Grow</h3>
              <p>Develop new skills and gain valuable experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Network</h3>
              <p>Connect with like-minded individuals and professionals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Career Development</h3>
              <p>Build your resume with meaningful experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Whether you're looking for an internship or want to volunteer your time, we have opportunities that match your interests and skills.</p>
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
