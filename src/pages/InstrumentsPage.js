import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChendaImage from "../assets/chenda.jpg";
import MaddalamImage from "../assets/maddalam.jpg";
import IdakkaImage from "../assets/idakka.jpg";
import ThimilaImage from "../assets/Thimila.jpg";
import KurumkuzhalImage from "../assets/kurumkuzhal.jpg";
import EzhathalamImage from "../assets/ezhathalam.jpg";
import KombuImage from "../assets/kombu.jpg";
import Mizhavu from "../assets/mizhavu.jpg";
import UdukkuImage from "../assets/udukkku.jpg";

import "../styles/Instruments.css"

// Main component
const InstrumentsPage = () => {
  const [activeInstrument, setActiveInstrument] = useState(null);

  const instruments = [
    {
      id: 1,
      name: "Chenda",
      image: ChendaImage,
      description: "The Chenda is a cylindrical percussion instrument used in Kerala's traditional art forms like Kathakali and Koodiyattam. Known for its loud, commanding sound, the Chenda creates the dynamic rhythm patterns essential to these performances.",
      usage: "Primarily used in temple festivals, Kathakali, Koodiyattam, and Theyyam performances. The distinctive playing style called 'Chenda Melam' features large ensembles of Chenda players creating complex rhythmic patterns.",
      details: "Made from the wood of jackfruit trees with animal hide stretched across both open ends. The performer wears the Chenda using a strap around the neck and plays it with two sticks."
    },
    {
      id: 2,
      name: "Maddalam",
      image: MaddalamImage,
      description: "The Maddalam is a barrel-shaped drum that produces a deep, resonant sound. It's an essential percussion instrument in Kathakali performances and various temple arts of Kerala.",
      usage: "The Maddalam provides the bass foundation in Kathakali orchestras and is also used in Krishnanattam and temple rituals. Its rich, deep tones complement the sharper sounds of other percussion instruments.",
      details: "Crafted from jackfruit wood and covered with cow hide on both sides. The drum is horizontally placed on a stand or held with a strap while playing. The left side is played with the hand, while the right side is played with a curved stick."
    },
    {
      id: 3,
      name: "Idakka",
      image: IdakkaImage,
      description: "The Idakka is an hourglass-shaped drum with a unique pitch-changing capability. By applying pressure to the lacing that connects the two drumheads, players can create melodic variations uncommon in percussion instruments.",
      usage: "Used primarily in temple rituals and classical Kerala orchestras, particularly in Panchavadyam. The Idakka is considered sacred and is often played during temple ceremonies and processions.",
      details: "Made with jackfruit wood and covered with parchment. The instrument is hung from the player's neck and played with a curved stick. The tension of the lacing affects the pitch, allowing for a wide tonal range."
    },
    {
      id: 8,
      name: "Kurumkuzhal",
      image: KurumkuzhalImage,
      description: "The Kurumkuzhal is a small double-reed wind instrument similar to the Nadaswaram but with a higher pitch. It is widely used in Kerala’s temple and ritual music traditions.",
      usage: "Primarily played in Panchavadyam and temple ceremonies, often accompanying percussion instruments. It provides melodic support and enhances the grandeur of traditional ensembles.",
      details: "Made from wood, typically jackfruit or rosewood, with a double-reed mouthpiece. The Kurumkuzhal produces sharp and vibrant notes, requiring precise breath control and fingering techniques to master its distinct tonal variations."
},
    {
      id: 5,
      name: "Thimila",
      image: ThimilaImage,
      description: "The Thimila is a cylindrical drum similar to the Chenda but with a distinctive tone. It plays a crucial role in Panchavadyam, a traditional temple ensemble of Kerala.",
      usage: "Primarily used in Panchavadyam performances and temple festivals. The Thimila leads the Panchavadyam ensemble, setting the tempo and patterns that other instruments follow.",
      details: "Made from jackfruit wood with cow hide stretched across both ends. Played with two sticks, the Thimila produces a higher pitch than the Chenda and requires precise finger techniques to create its characteristic sound."
    },
    {
      id: 6,
      name: "Ezhathalam",
      image: EzhathalamImage,
      description: "The Ilathalam is a small pair of metallic cymbals that produces a sharp, resonant sound. It is an essential instrument in traditional Kerala temple music ensembles like Panchavadyam and Theyyam.",
      usage: "Primarily used to maintain rhythm in Panchavadyam, Kathakali, and Theyyam performances. The Ilathalam provides a steady metallic beat that complements the main percussion instruments.",
      details: "Made from bronze or bell metal, the Ilathalam consists of two small plates struck together in a controlled manner. The player varies the force and speed to create different rhythmic patterns, adding depth to the ensemble’s music."
},
{
  id: 7,
  name: "Kombu",
  image: KombuImage,
  description: "The Kombu is a long, curved wind instrument made of brass or copper. It produces deep, resonant tones and is a key component in Kerala’s temple and folk music traditions.",
  usage: "Used in Panchavadyam, Theyyam, and other temple rituals. The Kombu is played in a call-and-response style, adding grandeur to processions and ceremonies.",
  details: "The instrument consists of a hollow, curved tube that requires strong breath control to play. The player modulates lip pressure to produce different notes, often harmonizing with percussion instruments in traditional performances."
},
{
  id: 8,
  name: "Mizhavu",
  image: Mizhavu,
  description: "The Mizhavu is a large copper drum considered sacred in Kerala's temple traditions. It's the principal percussion instrument used in Koodiyattam, the oldest surviving Sanskrit theater tradition.",
  usage: "Exclusively used in Koodiyattam and Kutiyattam performances. The Mizhavu player must undergo special training to master the intricate rhythms that accompany different characters and emotions in these ancient theatrical arts.",
  details: "Made of copper with a narrow neck and wide bottom, covered with parchment made from calf skin. Traditionally, only members of certain communities were allowed to play this instrument due to its sacred status."
},
{
  id: 9,
  name: "Udukku",
  image: UdukkuImage,
  description: "The Udukku is a small, hourglass-shaped percussion instrument used in Kerala’s temple rituals and folk performances. It produces a rich, resonant sound that adds rhythm and depth to traditional music.",
  usage: "Commonly played in temple rituals, Theyyam, and devotional music. The Udukku is also used in performances dedicated to deities like Ayyappan and Bhagavathy.",
  details: "Made from jackfruit wood with a tightly stretched animal skin membrane. Played with one hand while the other hand controls the tension of the strings to alter pitch and tone, creating dynamic rhythmic patterns."
},





    
  ];

  const handleInstrumentClick = (id) => {
    setActiveInstrument(id === activeInstrument ? null : id);
  };

  return (
    <div className="instruments-container">
      <div className="instruments-header">
        <h1>Traditional Kerala Percussion Instruments</h1>
        <p>Discover the rich heritage of rhythm and sound that forms the backbone of Kerala's classical arts</p>
        <Link to="/" className="back-button">Back to Home</Link>
      </div>

      {activeInstrument && (
        <div className="detailed-view">
          {instruments
            .filter(instrument => instrument.id === activeInstrument)
            .map(instrument => (
              <div key={instrument.id} className="detailed-instrument">
                <div className="detailed-content">
                  <div className="detailed-image-container">
                    <img src={instrument.image} alt={instrument.name} className="detailed-image" />
                  </div>
                  <div className="detailed-info">
                    <h2>{instrument.name}</h2>
                    <div className="info-section">
                      <h3>Description</h3>
                      <p>{instrument.description}</p>
                    </div>
                    <div className="info-section">
                      <h3>Usage</h3>
                      <p>{instrument.usage}</p>
                    </div>
                    <div className="info-section">
                      <h3>Construction</h3>
                      <p>{instrument.details}</p>
                    </div>
                    <button 
                      className="close-button"
                      onClick={() => setActiveInstrument(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="instruments-grid">
        {instruments.map((instrument) => (
          <div 
            key={instrument.id} 
            className="instrument-card"
            onClick={() => handleInstrumentClick(instrument.id)}
          >
            <div className="instrument-image-container">
              <img src={instrument.image} alt={instrument.name} className="instrument-image" />
              <div className="overlay">
                <span>View Details</span>
              </div>
            </div>
            <h2 className="instrument-name">{instrument.name}</h2>
            <p className="instrument-brief">{instrument.description.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstrumentsPage;