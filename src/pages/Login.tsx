import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Login to Waya</h2>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
}

export default Login;
