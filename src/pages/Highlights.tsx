import React, { useEffect, useState } from "react";
import useMemoryStore from "../components/Store";
import "./Highlights.css";

const Highlights: React.FC = () => {
  const { capturedMemory } = useMemoryStore();
  const [memory, setMemory] = useState(capturedMemory);

  useEffect(() => {
    if (!capturedMemory) {
      const storedMemory = localStorage.getItem("capturedMemory");
      if (storedMemory) {
        setMemory(JSON.parse(storedMemory));
      }
    } else {
      setMemory(capturedMemory);
    }
  }, [capturedMemory]);

  return (
    <div className="highlights-container">
      <h2 style={{ color: "white" }}>Your Highlighted Memory</h2>
      {memory ? (
        <div className="memory-card">
          {memory.imageURL && (
            <img src={memory.imageURL} alt="Captured" className="highlight-image" />
          )}

          <div className="memory-content">
            {memory.note && <p className="highlight-note">📝 {memory.note}</p>}

            {memory.audioURL && (
              <div className="audio-wrapper">
                <audio src={memory.audioURL} controls />
              </div>
            )}

            {memory.location && (
              <p className="highlight-location">
                📍 {memory.location.lat.toFixed(4)}, {memory.location.lon.toFixed(4)}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="no-memory">No recent memories captured.</p>
      )}
    </div>
  );
};

export default Highlights;
