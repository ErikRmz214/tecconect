import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para la navegación en React
import '../styles/Inicio.css'; // Asegúrate de tener el archivo CSS para los estilos

const Inicio = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Deshabilitar la acción de regresar en dispositivos móviles
    const handleBackButton = (event) => {
      event.preventDefault();
    };

    window.addEventListener('popstate', handleBackButton);

    return () => window.removeEventListener('popstate', handleBackButton);
  }, []);

  return (
    <div className="container">
      {/* Imagen */}
      <img 
        src={require('../images/Logo.png')} // Asegúrate de que la ruta sea correcta
        alt="Logo"
        className="image" 
      />
      
      {/* Texto descriptivo */}
      <p className="title">Discover the current and innovative projects!</p>
      <p className="subtitle">Dare to be unique at TECNM</p>
      
      {/* Botones de Login y Register */}
      <div className="button-container">
        <button 
          className="button" 
          onClick={() => navigate('/login')} // Navegar a la pantalla Login
        >
          Login
        </button>
        <button 
          className="button" 
          onClick={() => navigate('/register')} // Navegar a la pantalla Register
        >
          Register
        </button>
      </div>

      {/* Texto para regresar a la pantalla Idioma */}
      <button 
        className="link" 
        onClick={() => navigate('/idioma')} 
      >
        Back
      </button>
    </div>
  );
};

export default Inicio;
