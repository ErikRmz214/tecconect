import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate para la navegación

const Idioma = () => {
  const navigate = useNavigate(); // useNavigate para navegar en React Router

  const handleLanguageSelect = (language) => {
    console.log(`Idioma seleccionado: ${language}`);
    if (language === "es") {
      navigate("/inicio", { state: { language } }); // Navega a "Inicio" si el idioma es español
    } else if (language === "en") {
      navigate("/index", { state: { language } }); // Navega a "Index" si el idioma es inglés
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <img
          src={require("../images/Logo.png")} // Asegúrate de que la ruta sea correcta
          alt="Logo"
          style={styles.image}
        />

        <p style={styles.languageText}>Selecciona un idioma</p>

        <div style={styles.buttonsContainer}>
          <button
            style={styles.button}
            onClick={() => handleLanguageSelect("es")} // Pasa 'es' al navegar
          >
            Español
          </button>

          <button
            style={styles.button}
            onClick={() => handleLanguageSelect("en")} // Pasa 'en' al navegar
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f5",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    width: "400px",
    textAlign: "center",
  },
  image: {
    width: "80%",
    height: "auto",
    marginBottom: "20px",
  },
  languageText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "30px",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },
  button: {
    backgroundColor: "#000080",
    color: "#ffffff",
    padding: "15px",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default Idioma;
