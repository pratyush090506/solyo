import React, { useState } from 'react';
import axios from 'axios';
import './Plan.css'; 

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const questions = [
  "What is your origin city?",
  "What country would you like to visit?",
  "Which city in that country are you interested in?",
  "What is the main purpose of your trip (e.g., vacation, business, adventure)?",
  "How many travelers will there be?",
  "Are you looking for an adventure or a peaceful retreat?",
  "What is your budget (e.g., budget-friendly, mid-range, luxe)?",
];

function Plan() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]); 
  const [currentInput, setCurrentInput] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    return `Plan an itinerary for a trip from ${originCity} to ${destinationCity}, ${destinationCountry} for ${travelers} travelers. The purpose of the trip is ${purpose}. It should be a ${retreatType} retreat with a ${budget} budget. Please provide a detailed day-by-day plan with suggestions for activities, accommodation, and food, considering the origin city if relevant for travel.`;
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
        setError('Failed to generate itinerary');
      }
    } catch (err) {
      console.error('Error generating itinerary:', err);
      setError('Error communicating with Gemini AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container centered">
      <h2>Plan Your Itinerary</h2>
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

        {loading && step === questions.length && (
          <div className="loading-indicator">
            Generating Itinerary <div className="loader"></div>
          </div>
        )}

        {itinerary && (
          <div className="bot-message itinerary" dangerouslySetInnerHTML={{ __html: itinerary }}>
            <h3>Generated Itinerary:</h3>
            <button onClick={() => { setStep(0); setAnswers([]); setItinerary(''); }}>Plan Again</button>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
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
            Generate Itinerary
          </button>
        </div>
      )}
    </div>
  );
}

export default Plan;