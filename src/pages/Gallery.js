import React from "react";
import "../styles/Gallery.css"; // Import the CSS file
import img1 from "../assets/img1.jpg";  
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";

const Gallery = () => {
  // Array of images with alt text
  const galleryImages = [
    { src: img1, alt: "Percussion performance - Chenda" },
    { src: img2, alt: "Percussion students practicing" },
    { src: img3, alt: "Traditional performance" },
    { src: img4, alt: "Percussion Academy group photo" },
    { src: img5, alt: "Percussion instrument close-up" },
    { src: img6, alt: "Students learning percussion" },
  ];

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Gallery</h2>
      <p className="gallery-description">A glimpse into our academy and students' journey</p>

      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div key={index} className="gallery-item">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="gallery-image"
              loading="lazy" // For better performance
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;