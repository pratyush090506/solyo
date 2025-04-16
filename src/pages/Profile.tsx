import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
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