import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Capture from "./pages/Capture";
import Highlights from "./pages/Highlights";
import Plan from "./pages/Plan";
import { auth } from "./services/firebase";
import { User } from "firebase/auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <BrowserRouter>
      <h1 style={{ display: "none" }}>
        Solyo – Capture & Reflect on Travel Memories
      </h1>
      {user && <Navbar />}
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route
            path="/capture"
            element={user ? <Capture /> : <Navigate to="/" />}
          />
          <Route
            path="/highlights"
            element={user ? <Highlights /> : <Navigate to="/" />}
          />
          <Route path="/plan" element={user ? <Plan /> : <Navigate to="/" />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      {user && <Footer />}
    </BrowserRouter>
  );
}

export default App;
