import React, { useState } from "react";
import "../styles/EnrollmentForm.css"; // Make sure to create this CSS file

const EnrollmentForm = ({ course, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    phoneNumber: "",
    email: "",
    location: "",
    referralSources: {
      friends: false,
      family: false,
      socialMedia: false,
    },
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      referralSources: {
        ...formData.referralSources,
        [name]: checked,
      },
    });
  };

  // Updated handleSubmit function for EnrollmentForm.js
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.studentName || !formData.age || !formData.phoneNumber || !formData.location) {
      setFormError("Please fill all required fields");
      return;
    }
    
    try {
      // Send form data to the backend
      const response = await fetch('http://localhost:5000/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course,
          formData,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Show success message
        setFormSubmitted(true);
        setFormError("");
      } else {
        setFormError("Failed to submit enrollment. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError("An error occurred. Please try again later.");
    }
  };

  if (formSubmitted) {
    return (
      <div className="enrollment-form-container">
        <div className="enrollment-success">
          <h2>Enrollment Request Sent!</h2>
          <p>Thank you for enrolling in our {course.name} course. We will contact you shortly to confirm your enrollment.</p>
          <button className="form-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="enrollment-form-container">
      <h2>Enroll in {course.name} Course</h2>
      <form onSubmit={handleSubmit} className="enrollment-form">
        {formError && <div className="form-error">{formError}</div>}
        
        <div className="form-group">
          <label htmlFor="studentName">Name *</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="5"
            max="100"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email (Optional)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group checkbox-group">
          <label>How did you hear about us? *</label>
          <div className="checkbox-options">
            <label>
              <input
                type="checkbox"
                name="friends"
                checked={formData.referralSources.friends}
                onChange={handleCheckboxChange}
              />
              Friends
            </label>
            <label>
              <input
                type="checkbox"
                name="family"
                checked={formData.referralSources.family}
                onChange={handleCheckboxChange}
              />
              Family
            </label>
            <label>
              <input
                type="checkbox"
                name="socialMedia"
                checked={formData.referralSources.socialMedia}
                onChange={handleCheckboxChange}
              />
              Social Media
            </label>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit Enrollment
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;