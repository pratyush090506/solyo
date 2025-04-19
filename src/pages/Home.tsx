import React from 'react';
import './Home.css'; // Import the CSS file

// Import your assets
import HeroImage from '../assets/hero1.png';
import Showcase1 from '../assets/hero.png';
import Showcase2 from '../assets/hero2.png';
import Showcase3 from '../assets/hero3.png';
import { FaCamera, FaLocationArrow, FaMicrophone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { color } from 'framer-motion';
const Home: React.FC = () => {
  return (
    <div className="home-page-content"> {/* Changed class name to avoid conflicts */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <img src={HeroImage} alt="Inspiring Travel Moment" />
            <div className="hero-text">
              <h1>Capture Your Journey, Inside and Out.</h1>
              <p className="subheadline">Relive the feelings behind the photos. Pair your cherished travel moments with personal notes, voice reflections, and location pins.</p>
              <Link to = '/capture' className="cta-button">Start Capturing Your Memories </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <h2 style={{color: "white"}}>Key Features</h2>
          <div className="features-grid" style={{color: "white"}}>
            <div className="feature">
              <FaCamera size={50} color="black" />
              <h3>Introspective Capture</h3>
              <p style={{color: "black"}}>Document your thoughts and feelings alongside your photos, creating a richer memory.</p>
            </div>
            <div className="feature">
              <FaMicrophone size={50} color='black' />
              <h3>Rich Media Pairing</h3>
              <p style={{color: "black"}}>Enhance your photos with text notes or immersive voice reflections for deeper context.</p>
            </div>
            <div className="feature">
              <FaLocationArrow size={50} color='black'/>
              <h3>Location & Sharing</h3>
              <p style={{color: "black"}}>Pinpoint where you captured each moment and share your stories with a community that understands.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="why-solyo" className="why-solyo-section">
        <div className="container">
          <h2 style = {{color: "white"}}>Why Solyo?</h2>
          <div className="why-solyo-content">
            <p>Solyo is more than just a photo app. It's designed for the mindful traveler who wants to preserve not just the sights, but the emotions and reflections that make those moments truly special. Unlike fleeting social media posts, Soyo helps you build a personal and lasting travel journal...</p>
            <ul>
              <li>Emphasizes personal reflection and deeper meaning.</li>
              <li>Creates a truly personal and rich travel journal.</li>
              <li>Connects you with a community that values authentic travel stories.</li>
              <li>Offers integrated interactive itinerary planning.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="showcase" className="showcase-section">
        <div className="container">
          <h2 style={{color: "white"}}>Visual Storytelling Showcase</h2>
          <div className="showcase-grid">
            <div className="showcase-item">
              <img src={Showcase1} alt="Soyo Memory 1" />
              <p className="caption">Their is a fresh and magical vibe 38000 ft above amidst the clouds watching the sun rise.</p>
            </div>
            <div className="showcase-item">
              <img src={Showcase2} alt="Soyo Memory 2" />
              <p className="caption">When I see a sun-kissed escalator, I feel I could also get a pic like that 😅</p>
            </div>
            <div className="showcase-item">
              <img src={Showcase3} alt="Soyo Memory 3" />
              <p className="caption">The fog in the air around feels like a punch of thrill and generates an excitement for a journey filled with craziness!</p>
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="download-section">
        <div className="container">
          <h2 style={{color: "white"}}>Try Solyo Now</h2>
          <h3>Download Soyo and begin your journey of mindful travel documentation.</h3>
        </div>
      </section>
    </div>
  );
};

export default Home;
