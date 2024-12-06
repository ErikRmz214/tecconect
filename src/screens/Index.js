import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import '../styles/Inicio.css'; // Define your styles in CSS here
import LogoImage from '../images/Logo.png';


const Inicio = () => {
  const navigate = useNavigate(); // React Router for navigation

  // Disable browser back button
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault(); // Prevent default action
      return event.returnValue = 'Are you sure you want to leave?'; // Custom message
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* Image */}
      <img 
        src={LogoImage} // Use src for local images in the web
        alt="Logo"
        style={styles.image}
      />
      
      {/* Descriptive text */}
      <p style={styles.title}>Discover current and innovative projects!</p>
      <p style={styles.subtitle}>Dare to be unique at TECNM</p>
      
      {/* Login and Register buttons */}
      <div style={styles.buttonContainer}>
        <button 
          style={styles.button} 
          onClick={() => navigate('/entrar')} // Navigate to the Login screen
        >
          Start
        </button>
        <button 
          style={styles.button} 
          onClick={() => navigate('/registro')} // Navigate to the Register screen
        >
          Register
        </button>
      </div>

      {/* Text to go back to the Language screen */}
      <button 
        style={styles.link} 
        onClick={() => navigate('/')}
      >
        Go back
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
