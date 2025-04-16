// src/pages/Home.tsx

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
    <Navbar />
    <main className="p-6">
      {`Welcome to Waya`}
    </main>
    <Footer />
  </div>
  )
}

export default Home
