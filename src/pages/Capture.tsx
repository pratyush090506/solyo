import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaStop, FaLocationArrow, FaSave } from "react-icons/fa";

import { db, storage } from "../services/firebase";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytesResumable, getDownloadURL as storageGetDownloadURL } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";
import useMemoryStore from "../components/Store";
import type { Memory } from "../components/Store";
import "./Capture.css";

function Capture() {
  const [image, setImage] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const setCapturedMemory = useMemoryStore((state) => state.setCapturedMemory);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setImage(reader.result as string); 
    };
  
    if (file) {
      reader.readAsDataURL(file); 
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  const captureMemory = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation", error);
        }
      );
    }
  };

  const saveMemory = async () => {
    const localMemoryData: Memory = {
      note,
      location,
      timestamp: new Date().toISOString(),
      imageURL: image || null,
      audioURL: audioURL || null,
    };
  
    try {
      localStorage.setItem("capturedMemory", JSON.stringify(localMemoryData));
      setCapturedMemory(localMemoryData);

      const memoryData: Memory = {
        note,
        location,
        timestamp: serverTimestamp(),
        imageURL: null,
        audioURL: null,
      };

      if (image) {
        const res = await fetch(image);
        const blob = await res.blob();
        const imgRef = storageRef(storage, `images/${uuidv4()}`);
        const snap = await uploadBytesResumable(imgRef, blob);
        memoryData.imageURL = await storageGetDownloadURL(snap.ref);
      }

      if (audioURL) {
        const audioBlob = await fetch(audioURL).then((res) => res.blob());
        const audioRef = storageRef(storage, `audio/${uuidv4()}.webm`);
        const snap = await uploadBytesResumable(audioRef, audioBlob);
        memoryData.audioURL = await storageGetDownloadURL(snap.ref);
      }

      await addDoc(collection(db, "memories"), memoryData);
      console.log("Memory synced to Firebase!");
      navigate("/highlights");
    } catch (error) {
      console.error("Error saving memory:", error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setIsRecording(false);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
  };

  return (
    <div className="capture-container">
      <div className="capture-card">
        <div className="capture-left">
          <div className="sidebar-title">Capture Your Moments</div>

          <div className="upload-section">
            <div className="upload-box" {...getRootProps()}>
              <input {...getInputProps()} />
              <div style={{ position: "relative", display: "inline-block" }}>
                {image ? (
                  <img src={image} alt="Preview" className="image-preview" />
                ) : (
                  "Upload Image"
                )}
                {image && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                    }}
                    className="dlt-img"
                  ></button>
                )}
              </div>
            </div>

            <div className="note-box">
              <textarea
                placeholder="Your journey starts here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <div className="audio-controls">
                {!isRecording && !audioURL && (
                  <button onClick={startRecording}>
                    <FaMicrophone /> Record Audio
                  </button>
                )}
                {isRecording && (
                  <button onClick={stopRecording}>
                    <FaStop /> Stop Recording
                  </button>
                )}
                {audioURL && <audio src={audioURL} controls />}
              </div>

              <div className="button-row">
                <button onClick={captureMemory}>
                  <FaLocationArrow /> Capture Location
                </button>
              </div>

              <button onClick={saveMemory} className="save-memory-button">
                <FaSave /> Save Memory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Capture;
