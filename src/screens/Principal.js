import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importar imágenes
import LogoImage from '../images/Logo.png';
import '../styles/Principal.css'; // Importar el archivo CSS

function Principal() {
  const navigate = useNavigate();

  return (
    <div className="principal-container">
      {/* Botón con Logo */}
      <button onClick={() => navigate('/principal')} className="logo-button">
        <img src={LogoImage} alt="TECCONECT Logo" className="logo-image" />
      </button>

      {/* Mensaje de bienvenida */}
      <h1 className="welcome-title">¡Bienvenido a TECCONECT!</h1>

      {/* Descripción del proyecto */}
      <p className="description-text">
        Este proyecto está diseñado para fomentar la participación de los estudiantes en *Innovatec*,
        incentivando la innovación y el desarrollo de soluciones tecnológicas con impacto social.
      </p>

      {/* Eslogan adicional */}
      <p className="slogan-text">Somos estudiantes que buscan la innovación y el cambio.</p>
    </div>
  );
}

export default Principal;
