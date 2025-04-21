import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import Logo from '../assets/solyo.svg';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navy">
      <div className="logo-area">
        <Link to="/">
          <img src={Logo} style={{ height: '3.5rem' }} alt="logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <div className={`tabs ${menuOpen ? 'active' : ''}`}>
        <Link
          to="/capture"
          className={location.pathname === '/capture' ? 'active' : ''}
        >
          Capture
        </Link>
        <Link
          to="/plan"
          className={location.pathname === '/plan' ? 'active' : ''}
        >
          Plan Itinerary
        </Link>
        <Link
          to="/highlights"
          className={location.pathname === '/highlights' ? 'active' : ''}
        >
          Highlights
        </Link>
      </div>

      <div className="profile-icon">
        <Link to="/profile">
          <FaUserCircle size={30} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
