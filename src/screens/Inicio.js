import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router para navegación
import '../styles/Inicio.css'; // Aquí debes definir el estilo en CSS

const Inicio = () => {
  const navigate = useNavigate(); // React Router para navegación

  // Deshabilitar el botón de regresar del navegador
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault(); // Previene la acción por defecto
      return event.returnValue = 'Are you sure you want to leave?'; // Mensaje personalizado
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="container">
      {/* Imagen */}
      <img 
        src="/images/Logo.png" // Utilizamos src para imágenes locales en la web
        alt="Logo"
        className="image"
      />
      
      {/* Texto descriptivo */}
      <p className="title">Descubre los proyectos vigentes e innovadores!</p>
      <p className="subtitle">Atrévete a ser único en TECNM</p>
      
      {/* Botones de Login y Registro */}
      <div className="button-container">
        <button 
          className="button" 
          onClick={() => navigate('/entrar')} // Navega a la pantalla de Login
        >
          Inicio
        </button>
        <button 
          className="button" 
          onClick={() => navigate('/registro')} // Navega a la pantalla de Registro
        >
          Registro
        </button>
      </div>

      {/* Texto para regresar a la pantalla Idioma */}
      <button 
        className="link" 
        onClick={() => navigate('/idioma')}
      >
        Regresar
      </button>
    </div>
  );
};

export default Inicio;
