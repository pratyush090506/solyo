import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import '../index.css'

function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      navigate('/home');
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">Waya</h1>
        <p className="subtitle">Capture memories that last forever 🌍</p>
        <button className="google-btn" onClick={handleGoogleSignIn}>
          <FcGoogle size={24} style={{ marginRight: '0.5rem' }} />
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login;

