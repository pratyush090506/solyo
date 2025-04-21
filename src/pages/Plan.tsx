import React, { useState } from 'react';
import axios from 'axios';
import './Plan.css';
import { auth } from '../services/firebase';

import SolyoWatermark from '../assets/solyowm.png';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const questions = [
  "Which city are you starting your journey from?",
  "Which dreamy country would like to travel to??",
  "And the specific city you'd like to visit?",
  "What's the vibe of this escapade? (Vacay? Biz trip? Thrill-seeking?)",
  "How many souls are joining this quest?",
  "Zen vibes or adrenaline highs?",
  "Wallet looking chunky, comfy, or 'let's do this on a shoestring'?",
];

function Plan() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = auth.currentUser;

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      const newAnswers = [...answers, currentInput.trim()];
      setAnswers(newAnswers);
      setCurrentInput('');
      nextStep();
    }
  };

  const nextStep = () => {
    if (step < questions.length) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
      setAnswers(prevAnswers => prevAnswers.slice(0, -1));
    }
  };

  const generatePrompt = () => {
    const [originCity, destinationCountry, destinationCity, purpose, travelers, retreatType, budget] = answers;
    return `Craft a short, captivating, and slightly quirky itinerary for ${travelers} adventurers jetting from ${originCity} to the dazzling ${destinationCity}, ${destinationCountry}, for a ${purpose} that leans towards a ${retreatType} experience with a ${budget} budget. Hit us with the daily highlights, maybe a unique local tip, and keep it punchy!`;
  };

  const handleGenerateItinerary = async () => {
    setLoading(true);
    setError('');
    setItinerary('');

    const intelligentPrompt = generatePrompt();

    try {
      const response = await axios.post(API_ENDPOINT, {
        contents: [{
          parts: [{ text: intelligentPrompt }]
        }]
      });

      const responseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (responseText) {
        const formattedItinerary = responseText.replace(/\n\n/g, '\n<br/><br/>').replace(/\n/g, '<br/>');
        setItinerary(formattedItinerary);
      } else {
        setError('Failed to generate an epic plan!');
      }
    } catch (err) {
      console.error('Error conjuring the itinerary:', err);
      setError('Uh oh! Gemini AI is having a moment.');
    } finally {
      setLoading(false);
    }
  };

  const handleReplan = () => {
    setStep(0);
    setAnswers([]);
    setItinerary('');
  };

  const downloadItinerary = async () => {
    try {
      const jspdfModule = await import('jspdf');
      const jsPDF = jspdfModule.default;
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const x = 15;
      let y = 20;
      const lineHeight = 7;
      const watermarkWidth = 40;
      const watermarkHeight = (SolyoWatermark.height / SolyoWatermark.width) * watermarkWidth;
      const watermarkX = pageWidth - watermarkWidth - 10;
      const watermarkY = pageHeight - watermarkHeight - 10;

      try {
        pdf.addImage(SoyoWatermark, 'PNG', watermarkX, watermarkY, watermarkWidth, watermarkHeight);
      } catch (error) {
        console.error("Error adding watermark:", error);
      }

      const formattedText = itinerary.replace(/<br\/>/g, '\n');
      const lines = pdf.splitTextToSize(formattedText, pageWidth - 2 * x);

      pdf.setFontSize(12);
      pdf.text(`${user?.displayName?.split(' ')[0] || 'Your'}'s Itinerary!`, x, y);
      y += 15;

      lines.forEach(line => {
        if (y > pageHeight - 20) {
          pdf.addPage();
          try {
            pdf.addImage(SoyoWatermark, 'PNG', watermarkX, watermarkY, watermarkWidth, watermarkHeight);
          } catch (error) {
            console.error("Error adding watermark on new page:", error);
          }
          y = 20;
        }
        pdf.text(line, x, y);
        y += lineHeight;
      });

      pdf.save('solyo_itinerary.pdf');
      console.log('PDF generated!');
    } catch (error) {
      console.error('Error importing or using jspdf:', error);
    }
  };

  return (
    <div className="plan-container">
      <div className="input-panel">
        <h2>Plan your Itinerary</h2>
        <div className="chat-messages">
          {answers.map((answer, index) => (
            <div key={`user-${index}`} className="user-message">
              <p>{answer}</p>
            </div>
          ))}

          {step < questions.length && (
            <div className="bot-message">
              <p>{questions[step]}</p>
            </div>
          )}
        </div>
        {step < questions.length && (
          <div className="input-area">
            <input
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              placeholder="Type your answer here..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} disabled={!currentInput.trim()}>Send</button>
          </div>
        )}
        {step === questions.length && !loading && !itinerary && (
          <div className="action-buttons">
            {step > 0 && <button onClick={prevStep}>Previous</button>}
            <button onClick={handleGenerateItinerary} disabled={loading || answers.length < questions.length}>
              Generate Itinerary!
            </button>
          </div>
        )}
      </div>
      <div className="output-panel">
        <h2>{itinerary ? ` ${user?.displayName?.split(' ')[0] || 'Your'}'s Epic Travey Plan!` : 'Your Adventure Blueprint Awaits...'}</h2>
        <div className="itinerary-content">
          {loading && step === questions.length && (
            <div className="loading-indicator">
              Generating Itinerary <div className="loader"></div>
            </div>
          )}
          {itinerary && (
            <div className="itinerary-text" dangerouslySetInnerHTML={{ __html: itinerary }}></div>
          )}
          {error && (
            <div className="error-message">
              <p>Oops! Something went sideways: {error}</p>
            </div>
          )}
          {!itinerary && !loading && step === 0 && (
            <div className="placeholder-text">
              <p>Answer the cosmic queries on the left to unlock your personalized adventure!</p>
            </div>
          )}
        </div>
        {itinerary && (
          <div className="replan-button-container">
            <button className="replan-button" onClick={handleReplan}>Re-spark the Adventure!</button>
            <button className="download-button" onClick={downloadItinerary}>Download as PDF <span role="img" aria-label="download">⬇️</span></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Plan;