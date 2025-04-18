import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
<<<<<<< HEAD:src/pages/Profile.tsx
import { auth } from '../services/firebase'

function Profile(){
    const navigate = useNavigate()
    const user = auth.currentUser

    const handleSignOut = async()=>{
        await signOut(auth)
        navigate('/')
    }

    return(
        <div className="Profile">
            <div className="profile-card">
                <img src={user?.photoURL||'https://via.placeholder.com/150'} alt = "Profile" className = "profile-avatar"/>
                <h2>{user?.displayName}</h2>
                <h2>{user?.email}</h2>
                <button onClick = {handleSignOut}>Logout</button>
            </div>
        </div>
    )
}
export default Profile
=======
import { auth } from "../services/firebase";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  console.log('user picture:',user?.photoURL)

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <div className="profile-avatar-container">
            <img 
            src={user?.photoURL || 'https://via.placeholder.com/150'} 
            className = "profile-avatar"
            alt="profile"
            loading="lazy" />

        </div>
        <h2 className="profile-name">{user?.displayName}</h2>
        <p className="profile-email">{user?.email}</p>
        <button className="profile-logout-btn" onClick={handleSignOut}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default Profile;
>>>>>>> 28eb06f (Added Logo & Improved Profile Page):waya_ver0/src/pages/Profile.tsx
