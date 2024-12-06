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
    <div style={styles.container}>
      {/* Imagen */}
      <img 
        src="../images/Logo.png" // Utilizamos src para imágenes locales en la web
        alt="Logo"
        style={styles.image}
      />
      
      {/* Texto descriptivo */}
      <p style={styles.title}>Descubre los proyectos vigentes e innovadores!</p>
      <p style={styles.subtitle}>Atrévete a ser único en TECNM</p>
      
      {/* Botones de Login y Registro */}
      <div style={styles.buttonContainer}>
        <button 
          style={styles.button} 
          onClick={() => navigate('/entrar')} // Navega a la pantalla de Login
        >
          Inicio
        </button>
        <button 
          style={styles.button} 
          onClick={() => navigate('/registro')} // Navega a la pantalla de Registro
        >
          Registro
        </button>
      </div>

      {/* Texto para regresar a la pantalla Idioma */}
      <button 
        style={styles.link} 
        onClick={() => navigate('/idioma')}
      >
        Regresar
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f8f8f8',
    height: '100vh',
    textAlign: 'center',
  },
  image: {
    width: '200px',
    height: 'auto',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 'normal',
    color: '#666',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  button: {
    backgroundColor: '#000080',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '250px',
    margin: '0 auto',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  link: {
    backgroundColor: 'transparent',
    color: '#000080',
    fontSize: '16px',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default Inicio;
