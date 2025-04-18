import React from 'react';
import './Home.css'; // Import the CSS file

// Import your assets
import HeroImage from '../assets/hero1.png';
import IconJournal from '../assets/hero1.png';
import IconVoice from '../assets/hero1.png';
import IconLocationShare from '../assets/hero1.png';
import Showcase1 from '../assets/hero1.png';
import Showcase2 from '../assets/hero1.png';
import Showcase3 from '../assets/hero1.png';

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
              <a href="#download" className="cta-button">Start Capturing Your Memories</a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature">
              <img src={IconJournal} alt="Introspective Capture Icon" />
              <h3>Introspective Capture</h3>
              <p>Document your thoughts and feelings alongside your photos, creating a richer memory.</p>
            </div>
            <div className="feature">
              <img src={IconVoice} alt="Rich Media Pairing Icon" />
              <h3>Rich Media Pairing</h3>
              <p>Enhance your photos with text notes or immersive voice reflections for deeper context.</p>
            </div>
            <div className="feature">
              <img src={IconLocationShare} alt="Location & Sharing Icon" />
              <h3>Location & Sharing</h3>
              <p>Pinpoint where you captured each moment and share your stories with a community that understands.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="why-solyo" className="why-solyo-section">
        <div className="container">
          <h2>Why Soyo?</h2>
          <div className="why-solyo-content">
            <p>Soyo is more than just a photo app. It's designed for the mindful traveler who wants to preserve not just the sights, but the emotions and reflections that make those moments truly special. Unlike fleeting social media posts, Soyo helps you build a personal and lasting travel journal...</p>
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
          <h2>Visual Storytelling Showcase</h2>
          <div className="showcase-grid">
            <div className="showcase-item">
              <img src={Showcase1} alt="Soyo Memory 1" />
              <p className="caption">A quiet moment of reflection by the ancient ruins...</p>
            </div>
            <div className="showcase-item">
              <img src={Showcase2} alt="Soyo Memory 2" />
              <p className="caption">The vibrant energy of the bustling marketplace, captured in a snapshot and a voice note.</p>
            </div>
            <div className="showcase-item">
              <img src={Showcase3} alt="Soyo Memory 3" />
              <p className="caption">Gazing at the breathtaking sunset, a feeling I'll never forget.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="download-section">
        <div className="container">
          <h2>Start Capturing Your Memories Today</h2>
          <p>Download Soyo and begin your journey of mindful travel documentation.</p>
          <div className="download-buttons">
            <a href="#" className="app-store-btn">Download on App Store</a>
            <a href="#" className="google-play-btn">Get it on Google Play</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;