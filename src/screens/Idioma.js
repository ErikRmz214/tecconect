import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate para la navegación

const Idioma = () => {
  const navigate = useNavigate(); // useNavigate para navegar en React Router

  const handleLanguageSelect = (language) => {
    console.log(`Idioma seleccionado: ${language}`);
    if (language === 'es') {
      navigate('/inicio', { state: { language } });  // Navega a "Inicio" si el idioma es español
    } else if (language === 'en') {
      navigate('/index', { state: { language } });  // Navega a "Index" si el idioma es inglés
    }
  };

  return (
    <div style={styles.container}>
      <img
        src={require('../images/Logo.png')}  // Asegúrate de que la ruta sea correcta
        alt="Logo"
        style={styles.image}
      />
      
      <p style={styles.languageText}>Selecciona un idioma</p>

      <div style={styles.buttonsContainer}>
        <button
          style={styles.button}
          onClick={() => handleLanguageSelect('es')}  // Pasa 'es' al navegar
        >
          Español
        </button>
        
        <button
          style={styles.button}
          onClick={() => handleLanguageSelect('en')}  // Pasa 'en' al navegar
        >
          English
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  languageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000080',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
};

export default Idioma;
