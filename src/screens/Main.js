import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import images
import LogoImage from '../images/Logo.png';
import '../styles/Principal.css'; // Import the CSS file

function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      {/* Button with Logo */}
      <button onClick={() => navigate('/main')} className="logo-button">
        <img src={LogoImage} alt="TECCONECT Logo" className="logo-image" />
      </button>

      {/* Welcome message */}
      <h1 className="welcome-title">Welcome to TECCONECT!</h1>

      {/* Project description */}
      <p className="description-text">
        This project is designed to encourage student participation in *Innovatec*, 
        promoting innovation and the development of technological solutions with social impact.
      </p>

      {/* Additional slogan */}
      <p className="slogan-text">We are students seeking innovation and change.</p>

      {/* Additional image */}
      <img src={LogoImage} alt="TECCONECT Team" className="team-image" />
    </div>
  );
}

export default Main;
