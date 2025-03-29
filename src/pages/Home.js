import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Import the CSS file
import heroImage from "../assets/hero-image.jpg"; 
import sangamImage from "../assets/sangam.jpg"; 
import guruImage from "../assets/guru.jpg"; 
import FreeChatbot from './FreeChatbot'; // Adjust the import path as needed

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={heroImage} alt="Kerala Percussion" className="hero-image" />
        <div className="hero-content">
          <h1 className="hero-title">Sri Kalakshetra Vadhya Sangam</h1>
          <p className="hero-subtitle">
            Master the rhythm of traditional Kerala percussion instruments
          </p>
          <button className="hero-button" onClick={() => navigate("/courses")}>Enroll Now</button>
        </div>
      </div>

      {/* About Sri Kalakshetra Vadhya Sangam */}
      <div className="section-container">
        <img src={sangamImage} alt="Sri Kalakshetra Vadhya Sangam" className="section-image" />
        <div className="section-content">
          <h2 className="section-title">About Sri Kalakshetra Vadhya Sangam</h2>
          <p className="section-text">
            Sri Kalakshetra Vadhya Sangam is a prestigious percussion academy dedicated to preserving the rich
            traditions of Kerala's percussion instruments. Our courses cover everything from basic techniques
            to advanced rhythms, ensuring students gain a comprehensive understanding of our cultural heritage.
          </p>
        </div>
      </div>

      {/* Why Join Sri Kalakshetra Vadhya Sangam */}
      <div className="why-join-section">
        <div className="why-join-content">
          <h2 className="section-title">Why Join Sri Kalakshetra Vadhya Sangam</h2>
          <div className="benefits-container">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <h3 className="benefit-title">Authentic Learning</h3>
              <p className="benefit-text">
                Learn traditional techniques passed down through generations, preserving the authentic art form.
              </p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4l3 3"></path>
                </svg>
              </div>
              <h3 className="benefit-title">Flexible Schedule</h3>
              <p className="benefit-text">
                Choose from various class timings that fit your schedule, making it easier to balance learning with other commitments.
              </p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="benefit-title">Expert Guidance</h3>
              <p className="benefit-text">
                Learn from maestros with decades of experience in both teaching and performing on prestigious stages.
              </p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="benefit-title">Performance Opportunities</h3>
              <p className="benefit-text">
                Regular showcase events and festival performances to build confidence and gain real-world experience.
              </p>
            </div>
          </div>
          <Link to="/courses" className="why-join-button">Explore Our Courses</Link>
        </div>
      </div>

      {/* About Guru Sri Sathish Kumar Raman Kutty */}
      <div className="section-container reverse">
        <div className="guru-image-container">
          <img src={guruImage} alt="Guru Sathish Kumar Raman Kutty" className="guru-image" />
        </div>
        <div className="section-content">
          <h2 className="section-title">About Our Guru</h2>
          <p className="section-text">
            Guru Sri Sathish Kumar Raman Kutty is a renowned percussionist with decades of experience in
            teaching and performing. Under his guidance, students master the intricate art of Kerala's
            traditional rhythms with precision and passion. His dedication to preserving authentic techniques
            while nurturing individual creativity has made him one of the most respected teachers in the field.
          </p>
        </div>
      </div>

      {/* Know More About Instruments Section - Enhanced Version */}
      <div className="instruments-showcase-section">
        <div className="instruments-showcase-overlay"></div>
        <div className="instruments-showcase-content">
          <h2 className="instruments-showcase-title">Discover the Rhythmic Heritage of Kerala</h2>
          <p className="instruments-showcase-text">
            Immerse yourself in the rich tapestry of Kerala's percussion traditions. From the thunderous Chenda 
            to the melodic Idakka, our instruments have shaped cultural expressions for centuries.
          </p>
          
          <div className="instruments-preview-container">
            <div className="instrument-preview">
              <div className="instrument-preview-circle">
                <span className="instrument-name-tag">Chenda</span>
              </div>
            </div>
            <div className="instrument-preview">
              <div className="instrument-preview-circle">
                <span className="instrument-name-tag">Maddalam</span>
              </div>
            </div>
            <div className="instrument-preview">
              <div className="instrument-preview-circle">
                <span className="instrument-name-tag">Idakka</span>
              </div>
            </div>
          </div>
          
          <Link to="/instruments" className="instruments-showcase-button">
            <span>Explore Our Instruments</span>
            <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
      <FreeChatbot></FreeChatbot>
    </div>
  );
};

export default Home;