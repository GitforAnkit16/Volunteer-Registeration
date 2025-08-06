import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminView = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await axios.post('/api/admin/login', credentials);
      if (response.data.success) {
        setIsAuthenticated(true);
        setMessage('Login successful!');
        fetchApplicants();
      }
    } catch (error) {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/applicants');
      setApplicants(response.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      setMessage('Error loading applications. Please refresh the page.');
    }
    setLoading(false);
  };

  const deleteApplicant = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the application from ${name}?`)) {
      try {
        await axios.delete(`/api/applicants/${id}`);
        setMessage(`Successfully deleted application from ${name}`);
        fetchApplicants(); // Refresh the list
        
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting applicant:', error);
        setMessage('Error deleting application. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setApplicants([]);
    setCredentials({ username: '', password: '' });
    setMessage('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="container">
          <div className="login-card">
            <h2>Admin Login</h2>
            <p>Enter your credentials to access the admin dashboard</p>
            
            {message && (
              <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value
                  })}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                  })}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-login">
                Login to Dashboard
              </button>
            </form>
            
            <div className="login-hint">
              <small>
                <strong>Demo Credentials:</strong><br />
                Username: <code>admin</code><br />
                Password: <code>admin123</code>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="admin-view">
      <div className="container">
        <div className="admin-header">
          <div>
            <h2>Admin Dashboard</h2>
            <p>Manage volunteer and intern applications</p>
          </div>
          <button 
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            Logout
          </button>
        </div>
        
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
        
        {/* Statistics Cards */}
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">{applicants.length}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {applicants.filter(app => app.type === 'intern').length}
            </div>
            <div className="stat-label">Intern Applications</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {applicants.filter(app => app.type === 'volunteer').length}
            </div>
            <div className="stat-label">Volunteer Applications</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {applicants.filter(app => 
                new Date(app.appliedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length}
            </div>
            <div className="stat-label">This Week</div>
          </div>
        </div>

        {/* Applications List */}
        <div className="applications-section">
          <h3>All Applications</h3>
          
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              Loading applications...
            </div>
          ) : applicants.length === 0 ? (
            <div className="no-applications">
              <div className="no-app-icon">📋</div>
              <h4>No Applications Yet</h4>
              <p>Applications will appear here once people start applying through the registration form.</p>
            </div>
          ) : (
            <div className="applicants-grid">
              {applicants.map(applicant => (
                <div key={applicant._id} className="applicant-card">
                  <div className="applicant-header">
                    <div className="applicant-info">
                      <h4>{applicant.name}</h4>
                      <p className="applicant-email">{applicant.email}</p>
                    </div>
                    <span className={`type-badge ${applicant.type}`}>
                      {applicant.type}
                    </span>
                  </div>
                  
                  <div className="applicant-details">
                    <div className="detail-item">
                      <strong>Phone:</strong> {applicant.phone}
                    </div>
                    <div className="detail-item">
                      <strong>Position:</strong> {applicant.position}
                    </div>
                    <div className="detail-item">
                      <strong>Applied:</strong> {formatDate(applicant.appliedAt)}
                    </div>
                  </div>
                  
                  <div className="applicant-sections">
                    <div className="section">
                      <strong>Experience:</strong>
                      <p>{applicant.experience}</p>
                    </div>
                    
                    <div className="section">
                      <strong>Motivation:</strong>
                      <p>{applicant.motivation}</p>
                    </div>
                    
                    <div className="section">
                      <strong>Availability:</strong>
                      <p>{applicant.availability}</p>
                    </div>
                  </div>
                  
                  <div className="applicant-actions">
                    <button 
                      onClick={() => deleteApplicant(applicant._id, applicant.name)}
                      className="btn btn-danger btn-delete"
                    >
                      🗑️ Delete Application
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
