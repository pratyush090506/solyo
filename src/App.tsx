import { BrowserRouter, Routes , Route , Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import { auth } from './services/firebase'
import { User } from 'firebase/auth'

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
    return () => unsubscribe();
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {user ? <Navigate to = "/home" /> : <Login/>}/>
        <Route path = '/home' element = {user ? <Home /> :<Navigate to = '/' /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
