import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'intern',
    position: '',
    experience: '',
    motivation: '',
    availability: ''
  });
  
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      const response = await axios.post('/api/applicants', formData);
      setMessage('Application submitted successfully! We will review your application and get back to you soon.');
      
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'intern',
        position: '',
        experience: '',
        motivation: '',
        availability: ''
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage('Error submitting application. Please check your connection and try again.');
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="registration-form">
      <div className="container">
        <div className="form-header">
          <h2>Apply as Intern/Volunteer</h2>
          <p>Fill out the form below to join our community and make a difference!</p>
        </div>
        
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Application Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="intern">Intern</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="position">Desired Position *</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., Frontend Developer, Marketing Assistant, Data Analyst"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="experience">Relevant Experience *</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe your relevant experience, skills, education, or any projects you've worked on..."
              rows="4"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="motivation">Why do you want to join us? *</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              placeholder="Tell us about your motivation, what you hope to achieve, and why you're interested in this opportunity..."
              rows="4"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="availability">Availability *</label>
            <textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="When are you available? Include days of the week, hours per week, duration of commitment, and start date..."
              rows="3"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
