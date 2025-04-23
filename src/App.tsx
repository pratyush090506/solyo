import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Capture from "./pages/Capture";
import Highlights from "./pages/Highlights";
import Plan from "./pages/Plan";
import Profile from "./pages/Profile";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

import { auth } from "./services/firebase";
import type { User } from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setAuthChecked(true);
    });

    const timer = setTimeout(() => setShowSplash(false), 2000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  if (showSplash || !authChecked) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <h1 style={{ display: "none" }}>
        Solyo – Capture & Reflect on Travel Memories
      </h1>

      {user && <Navbar />}

      <div className="page">
        <Routes>
          {/* only redirect at the root path */}
          <Route
            path="/"
            element={user ? <Navigate to="/home" replace /> : <Login />}
          />

          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/" replace />}
          />
          <Route
            path="/capture"
            element={user ? <Capture /> : <Navigate to="/" replace />}
          />
          <Route
            path="/highlights"
            element={user ? <Highlights /> : <Navigate to="/" replace />}
          />
          <Route
            path="/plan"
            element={user ? <Plan /> : <Navigate to="/" replace />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/" replace />}
          />

          <Route
            path="*"
            element={user ? <Navigate to="/home" replace /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>

      {user && <Footer />}
    </BrowserRouter>
  );
}

export default App;
