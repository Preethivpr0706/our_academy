import React, { useState, useEffect, useRef } from 'react';
import EnrollmentForm from './EnrollmentForm';
import ContactForm from './Contact';
import IdakkaImage from "../assets/idakka.jpg";
import MaddalamImage from "../assets/maddalam.jpg";
import ThimilaImage from "../assets/Thimila.jpg";
import MizhavuImage from "../assets/mizhavu.jpg";
import KombuImage from "../assets/kombu.jpg";
import ChendaImage from "../assets/chenda.jpg";

const FreeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Vanakkam! Welcome to Sri Kalakshetra Vadhya Sangam. How can I assist you today?", 
      sender: 'bot',
      quickReplies: [
        { text: "Courses Offered", payload: "courses" },
        { text: "Enrollment Process", payload: "enrollment" },
        { text: "Contact Us", payload: "contact" }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [visibleCourses, setVisibleCourses] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesEndRef = useRef(null);

  
  // Complete courses data
  const courses = [
    {
      id: 1,
      name: "Chenda",
      description: "Traditional Kerala drum used in temple festivals and cultural performances",
      duration: "6 months per level",
      levels: ["Basic", "Intermediate", "Advanced"],
      image: ChendaImage,
      syllabus: [
        "Basic strokes (Veekku, Chaapu)",
        "Traditional rhythms (Adantha, Panchari)",
        "Temple festival compositions",
        "Stage performance techniques"
      ]
    },
    {
      id: 2,
      name: "Maddalam",
      description: "Barrel-shaped drum used in Kathakali and other classical performances",
      duration: "6 months per level",
      levels: ["Basic", "Intermediate", "Advanced"],
      image: MaddalamImage,
      syllabus: [
        "Fundamental strokes",
        "Kathakali accompaniment",
        "Traditional rhythms (Chempata, Triputa)",
        "Performance techniques"
      ]
    },
    {
      id: 3,
      name: "Idakka",
      description: "Hourglass-shaped drum known for its melodic tones",
      duration: "6 months per level",
      levels: ["Basic", "Intermediate", "Advanced"],
      image: IdakkaImage,
      syllabus: [
        "Basic playing techniques",
        "Temple rituals accompaniment",
        "Classical compositions",
        "Advanced modulation techniques"
      ]
    },
    {
      id: 4,
      name: "Thimila",
      description: "Traditional percussion instrument used in temple rituals",
      duration: "6 months per level",
      levels: ["Basic", "Intermediate", "Advanced"],
      image: ThimilaImage,
      syllabus: [
        "Basic strokes and techniques",
        "Traditional rhythms",
        "Temple ritual accompaniments",
        "Performance techniques"
      ]
    },
    {
      id: 5,
      name: "Kombu",
      description: "Long wind instrument used in temple processions",
      duration: "6 months per level",
      levels: ["Basic", "Intermediate", "Advanced"],
      image: KombuImage,
      syllabus: [
        "Basic blowing techniques",
        "Traditional compositions",
        "Procession rhythms",
        "Advanced performance techniques"
      ]
    },
    {
      id: 6,
      name: "Mizhavu",
      description: "Large copper drum used in Koodiyattam performances",
      duration: "6 months per level",
      levels: ["Basic", "Intermediate", "Advanced"],
      image: MizhavuImage,
      syllabus: [
        "Basic playing techniques",
        "Koodiyattam accompaniment",
        "Traditional rhythms",
        "Advanced performance techniques"
      ]
    }
  ];

  const COURSES_PER_PAGE = 3;
  const totalPages = Math.ceil(courses.length / COURSES_PER_PAGE);


  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Show typing indicator
    setIsTyping(true);
    
    // Process user message and generate bot response
    setTimeout(() => {
      generateBotResponse(inputMessage);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (payload) => {
    const quickReplyMessage = { text: payload, sender: 'user' };
    setMessages(prev => [...prev, quickReplyMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    setTimeout(() => {
      generateBotResponse(payload);
      setIsTyping(false);
    }, 1000);
  };

  const renderCourseCard = (course) => {
    return {
      text: `📌 ${course.name}\n${course.description}\n\nDuration: ${course.duration}\nLevels: ${course.levels.join(", ")}`,
      sender: 'bot',
      quickReplies: [
        { text: "View Syllabus", payload: `syllabus_${course.id}` },
        { text: "Enroll Now", payload: `enroll_${course.id}` },
        { text: "See Image", payload: `image_${course.id}` }
      ]
    };
  };

  const renderCourseSyllabus = (course) => {
    return {
      text: `📚 ${course.name} Syllabus:\n\n${course.syllabus.map(item => `• ${item}`).join('\n')}`,
      sender: 'bot',
      quickReplies: [
        { text: "Back to Course", payload: `course_${course.id}` },
        { text: "Enroll Now", payload: `enroll_${course.id}` },
        { text: "Main Menu", payload: "menu" }
      ]
    };
  };

  const renderCourseImage = (course) => {
    return {
      text: `🖼️ ${course.name}`,
      image: course.image,
      sender: 'bot',
      quickReplies: [
        { text: "Back to Course", payload: `course_${course.id}` },
        { text: "Enroll Now", payload: `enroll_${course.id}` },
        { text: "Main Menu", payload: "menu" }
      ]
    };
  };

  const showCoursesPage = (page) => {
    const startIndex = (page - 1) * COURSES_PER_PAGE;
    const endIndex = startIndex + COURSES_PER_PAGE;
    const pageCourses = courses.slice(startIndex, endIndex);
    
    setCurrentPage(page);
    
    // Remove previous course messages
    setMessages(prev => prev.filter(msg => 
      !msg.text?.includes("We offer these") && 
      !msg.text?.includes("Here are our") &&
      !courses.some(c => msg.text?.includes(c.name))
    ));
    
    // Add new course messages
    const courseMessages = pageCourses.map(course => renderCourseCard(course));
    const headerMessage = {
      text: page === 1 ? 
        "We offer these traditional Kerala percussion courses:" : 
        `Here are our courses (Page ${page} of ${totalPages}):`,
      sender: 'bot'
    };
    
    setMessages(prev => [...prev, headerMessage, ...courseMessages]);
    
    // Add pagination controls
    const paginationReplies = [];
    if (page > 1) {
      paginationReplies.push({ text: "◀ Previous Courses", payload: `page_${page - 1}` });
    }
    if (page < totalPages) {
      paginationReplies.push({ text: "More Courses ▶", payload: `page_${page + 1}` });
    }
    paginationReplies.push({ text: "Main Menu", payload: "menu" });
    
    const paginationMessage = {
      text: "Browse through our courses:",
      sender: 'bot',
      quickReplies: paginationReplies
    };
    
    setMessages(prev => [...prev, paginationMessage]);
  };

  const generateBotResponse = (userInput) => {
    let botResponse = {};
    const lowerInput = userInput.toLowerCase();

    // Handle course selection
    if (lowerInput.includes('course') || lowerInput === 'courses') {
      showCoursesPage(1);
      return;
    }

    // Handle pagination
    if (lowerInput.startsWith('page_')) {
      const pageNum = parseInt(lowerInput.split('_')[1]);
      if (pageNum >= 1 && pageNum <= totalPages) {
        showCoursesPage(pageNum);
      }
      return;
    }

    // Handle specific course requests
    for (const course of courses) {
      const courseId = course.id;
      const courseName = course.name.toLowerCase();
      
      if (lowerInput.includes(courseName) || lowerInput === `course_${courseId}`) {
        setMessages(prev => [...prev, renderCourseCard(course)]);
        return;
      }
      
      if (lowerInput === `syllabus_${courseId}`) {
        setMessages(prev => [...prev, renderCourseSyllabus(course)]);
        return;
      }
      
      if (lowerInput === `image_${courseId}`) {
        setMessages(prev => [...prev, renderCourseImage(course)]);
        return;
      }
      
      if (lowerInput === `enroll_${courseId}`) {
        setSelectedCourse(course);
        setShowEnrollmentForm(true);
        botResponse = {
          text: `Great choice! Please fill out the enrollment form for ${course.name}.`,
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
        return;
      }
    }

    // Handle enrollment process
    if (lowerInput.includes('enroll') || lowerInput === 'enrollment') {
      botResponse = {
        text: "I can help you enroll in any of our courses. Would you like to:",
        sender: 'bot',
        quickReplies: [
          { text: "See Courses", payload: "courses" },
          { text: "Ask About Enrollment", payload: "enrollment_info" }
        ]
      };
    }
    else if (lowerInput === 'enrollment_info') {
      botResponse = {
        text: "Our enrollment process:\n\n1. Select your preferred course\n2. Fill out the enrollment form\n3. We'll contact you to confirm\n4. Complete payment\n5. Start your musical journey!\n\nWould you like to see our courses?",
        sender: 'bot',
        quickReplies: [
          { text: "View Courses", payload: "courses" },
          { text: "Contact Support", payload: "contact" }
        ]
      };
    }

    // Handle contact requests
    else if (lowerInput.includes('contact') || lowerInput === 'contact') {
      setShowContactForm(true);
      botResponse = {
        text: "I'm opening our contact form for you. Please provide your details and we'll get back to you soon.",
        sender: 'bot'
      };
    }

    // Handle termination
    else if (lowerInput.includes('bye') || lowerInput.includes('end chat') || lowerInput.includes('exit')) {
      botResponse = {
        text: "Thank you for connecting with Sri Kalakshetra Vadhya Sangam. Have a wonderful day! Nandri! 🙏",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
      setTimeout(() => setIsOpen(false), 2000);
      return;
    }

    // Handle thanks
    else if (lowerInput.includes('thank') || lowerInput.includes('thanks') || lowerInput.includes('nandri')) {
      botResponse = {
        text: "You're most welcome! It's our privilege to share Kerala's percussion heritage. Would you like information about anything else?",
        sender: 'bot',
        quickReplies: [
          { text: "Yes, please", payload: "menu" },
          { text: "No, thanks", payload: "end chat" }
        ]
      };
    }

    // Return to main menu
    else if (lowerInput === 'menu') {
      botResponse = {
        text: "What would you like to know about?",
        sender: 'bot',
        quickReplies: [
          { text: "Courses Offered", payload: "courses" },
          { text: "Enrollment Process", payload: "enrollment" },
          { text: "Contact Us", payload: "contact" }
        ]
      };
    }

    // Default response
    else {
      botResponse = {
        text: "I appreciate your message. How else may I help you?",
        sender: 'bot',
        quickReplies: [
          { text: "Main Menu", payload: "menu" },
          { text: "Contact Support", payload: "contact" },
          { text: "End Chat", payload: "end chat" }
        ]
      };
    }

    setMessages(prev => [...prev, botResponse]);
  };

  const handleFormSubmit = (success, message) => {
    if (showEnrollmentForm) {
      setShowEnrollmentForm(false);
      const botResponse = {
        text: success ? 
          `Thank you for enrolling in ${selectedCourse.name}! ${message}` : 
          `Enrollment issue: ${message}`,
        sender: 'bot',
        quickReplies: [
          { text: "View Other Courses", payload: "courses" },
          { text: "Main Menu", payload: "menu" }
        ]
      };
      setMessages(prev => [...prev, botResponse]);
    }
    
    if (showContactForm) {
      setShowContactForm(false);
      const botResponse = {
        text: success ? 
          `Thank you for contacting us! ${message}` : 
          `Contact issue: ${message}`,
        sender: 'bot',
        quickReplies: [
          { text: "Main Menu", payload: "menu" },
          { text: "End Chat", payload: "end chat" }
        ]
      };
      setMessages(prev => [...prev, botResponse]);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chatbot Trigger Button */}
      <div 
        className="chatbot-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        )}
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              </svg>
              <h3>Kalakshetra Support</h3>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.image && (
                  <div className="message-image">
                    <img src={msg.image} alt={msg.text} />
                  </div>
                )}
                {msg.text.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {msg.quickReplies && (
                  <div className="quick-replies">
                    {msg.quickReplies.map((reply, i) => (
                      <button 
                        key={i} 
                        className="quick-reply"
                        onClick={() => handleQuickReply(reply.payload)}
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="message bot-message typing-indicator">
                <div className="typing-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Enrollment Form Modal */}
      {showEnrollmentForm && (
        <div className="chatbot-modal-overlay">
          <div className="chatbot-modal">
            <button 
              className="modal-close-button"
              onClick={() => setShowEnrollmentForm(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <EnrollmentForm 
              course={selectedCourse} 
              onClose={() => setShowEnrollmentForm(false)}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="chatbot-modal-overlay">
          <div className="chatbot-modal">
            <button 
              className="modal-close-button"
              onClick={() => setShowContactForm(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <ContactForm 
              onClose={() => setShowContactForm(false)}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeChatbot;