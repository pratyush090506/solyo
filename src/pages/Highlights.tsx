import React from 'react';
import useMemoryStore from '../components/Store';
import "./Highlights.css"; // Assuming you have a Highlights.css file

function Highlights() {
  const capturedMemory = useMemoryStore((state) => state.capturedMemory);
  console.log("Captured Memory in Highlights on render:", capturedMemory);

  return (
    <div className="highlights-container">
      <h2>Your Precious Moments</h2>
      {capturedMemory && (
        <div className="memory-item">
          {capturedMemory.imageURL && (
            <img src={capturedMemory.imageURL} alt="Captured Image" className="highlight-image" />
          )}
          {capturedMemory.note && (
            <p className="highlight-note">Note: {capturedMemory.note}</p>
          )}
          {capturedMemory.audioURL && (
            <audio src={capturedMemory.audioURL} controls className="highlight-audio" />
          )}
          {capturedMemory.location && capturedMemory.location.lat && capturedMemory.location.lon && (
            <p className="highlight-location">
              Location: Latitude: {capturedMemory.location.lat}, Longitude: {capturedMemory.location.lon}
            </p>
          )}
        </div>
      )}
      {!capturedMemory && (
        <p>No recent memories captured.</p>
      )}
    </div>
  );
}

export default Highlights;