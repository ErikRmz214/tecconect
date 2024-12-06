import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import images
import LogoImage from '../images/Logo.png';
import '../styles/Principal.css'; // Importa el archivo CSS

function Principal() {
  const navigate = useNavigate();

  return (
    <div className="principal-container">
      {/* Logo Image */}
      <button onClick={() => navigate('/principal')} className="logo-button">
        <img src={LogoImage} alt="TECCONECT Logo" className="logo-image" />
      </button>

      {/* Welcome Message */}
      <h1 className="welcome-title">¡Bienvenido a TECCONECT!</h1>

      {/* Project Description */}
      <p className="description-text">
        Este proyecto está diseñado para fomentar la participación de los estudiantes en Innovatec,
        con el objetivo de incentivar la innovación y el desarrollo de soluciones tecnológicas con
        impacto social.
      </p>

      {/* Additional Slogan */}
      <p className="slogan-text">Somos estudiantes que buscan la innovación y el cambio.</p>

      {/* Additional Image */}
      <img src={LogoImage} alt="TECCONECT Team" className="team-image" />
    </div>
  );
}

export default Principal;
