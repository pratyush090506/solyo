import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaStop, FaPlay } from "react-icons/fa";
import { FaCamera, FaSave } from "react-icons/fa";
import { db, storage } from "../services/firebase";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytesResumable, getDownloadURL as storageGetDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import useMemoryStore from '../components/Store';
import "./Capture.css";

function Capture() {
  const [image, setImage] = useState(null);
  const [note, setNote] = useState("");
  const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  const setCapturedMemory = useMemoryStore((state) => state.setCapturedMemory);

  const onDrop = (acceptedFiles) => {
    setImage(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
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
    console.log("Saving Memory...", { image, note, audioURL, location });
    try {
      const memoryData = {
        note: note,
        location: location,
        timestamp: serverTimestamp(),
      };

      let imageURL = null;
      if (image) {
        const imageStorageRef = storageRef(storage, `images/${uuidv4()}`);
        const snapshot = await uploadBytesResumable(imageStorageRef, image);
        imageURL = await storageGetDownloadURL(snapshot.ref);
        memoryData.imageURL = imageURL;
      }

      let audioStorageURL = null;
      if (audioURL) {
        const audioBlob = await fetch(audioURL).then(res => res.blob());
        const audioStorageRef = storageRef(storage, `audio/${uuidv4()}.webm`);
        const snapshot = await uploadBytesResumable(audioStorageRef, audioBlob);
        audioStorageURL = await storageGetDownloadURL(snapshot.ref);
        memoryData.audioURL = audioStorageURL;
      }

      const memoriesCollection = collection(db, 'memories');
      await addDoc(memoriesCollection, memoryData);
      console.log("Memory saved to Firebase!");

      // Save the captured data to the store
      setCapturedMemory({
        imageURL: imageURL || null,
        note: note,
        audioURL: audioStorageURL || null,
        location: location || null,
      });

      console.log("Captured Memory in Store before navigation:", useMemoryStore.getState().capturedMemory);
      navigate("/highlights");

    } catch (error) {
      console.error("Error saving memory to Firebase:", error);
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
                color="black"
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
                {audioURL && (
                  <audio src={audioURL} controls />
                )}
              </div>
              <button onClick={saveMemory} className="save-memory-button">
                <FaSave /> Save Memory
              </button>
              <div className="button-row">
                <button onClick={captureMemory}>
                  <FaCamera /> Capture Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Capture;