import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send the form data to your backend
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message: "Thank you! Your message has been sent successfully."
        });
        
        // Reset form after 3 seconds and hide it
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setFormStatus({ submitted: false, success: false, message: "" });
          setShowForm(false);
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: error.message || "There was a problem sending your message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2 className="contact-title">Get in Touch</h2>
        <div className="contact-divider"></div>
        
        <div className="contact-info-container">
          <div className="contact-item">
            <i className="contact-icon phone-icon"></i>
            <p className="contact-text">
              <a href="tel:+917299817996" className="contact-link">+91 7299817996</a>
            </p>
          </div>
          
          <div className="contact-item">
            <i className="contact-icon email-icon"></i>
            <p className="contact-text">
              <a href="mailto:harishradhakrishnan2001@gmail.com" className="contact-link">harishradhakrishnan2001@gmail.com</a>
            </p>
          </div>
        </div>
        
        <div className="social-links">
          <a href="https://www.instagram.com/harish_rknan?igsh=Y2JheWwwdjNnbXM0" target="_blank" rel="noopener noreferrer" className="social-link instagram">
            <i className="social-icon instagram-icon"></i>
            <span>Instagram</span>
          </a>
          
          <a href="https://www.facebook.com/profile.php?id=100009367175522" target="_blank" rel="noopener noreferrer" className="social-link facebook">
            <i className="social-icon facebook-icon"></i>
            <span>Facebook</span>
          </a>
          
          <a href="https://wa.me/917299817996" target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
            <i className="social-icon whatsapp-icon"></i>
            <span>WhatsApp</span>
          </a>
        </div>
        
        {!showForm ? (
          <button className="contact-button" onClick={() => setShowForm(true)}>
            Send a Message
          </button>
        ) : (
          <div className="contact-form-container">
            {formStatus.submitted ? (
              <div className={`form-status ${formStatus.success ? "success" : "error"}`}>
                {formStatus.message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-header">
                  <h3>Send Us a Message</h3>
                  <button 
                    type="button" 
                    className="close-button" 
                    onClick={() => setShowForm(false)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email address"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Type your message here..."
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;