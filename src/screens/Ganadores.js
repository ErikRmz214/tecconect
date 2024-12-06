import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material"; // Usamos CircularProgress de Material-UI para el indicador de carga

function Ganadores() {
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        // Simula una respuesta de la API
        const data = {
          event: "2024-12-01", // Formato de fecha correcto
          name: "Proyecto Innovador",
          integrants: ["Juan Pérez", "María García", "Luis Gómez"],
        };
        setWinner(data);
      } catch (error) {
        alert("No se pudo cargar la información del ganador.");
        console.error("Error al cargar el ganador:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWinner();
  }, []);

  if (loading) {
    return (
      <div style={styles.loader}>
        <CircularProgress size={50} color="primary" />
      </div>
    );
  }

  if (!winner) {
    return (
      <div style={styles.container}>
        <h2>No se encontró información del ganador.</h2>
      </div>
    );
  }

  const eventDate = new Date(winner.event).toLocaleDateString("es-ES"); // Verificación de la fecha

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ganadores</h2>
      <img
        style={styles.image}
        src={require("../images/Ganador.jpg")} // Usamos la imagen local
        alt="Imagen del ganador" // Añadido para accesibilidad
      />
      <p style={styles.description}>Evento: {eventDate}</p>
      <p style={styles.description}>Nombre del Proyecto: {winner.name}</p>
      <p style={styles.description}>Integrantes:</p>
      {winner.integrants.map((integrant, index) => (
        <p key={index} style={styles.integrant}>
          - {integrant}
        </p>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  image: {
    width: "300px", // Imagen más grande
    height: "300px", // Imagen más grande
    marginBottom: "20px", // Se mantiene el margen inferior para separación
    objectFit: "contain", // Ajuste de la imagen con el tamaño disponible
  },
  description: {
    fontSize: "16px",
    textAlign: "center",
    color: "#666",
    marginBottom: "10px",
  },
  integrant: {
    fontSize: "14px",
    textAlign: "center",
    color: "#444",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
};

export default Ganadores;
