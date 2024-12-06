import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, ScrollView } from "react";
import ConfettiCannon from "react-confetti"; // Asegúrate de tener esta dependencia instalada

// Importar la imagen local
import LocalImage from "../images/Ganador.jpg";

function Winners() {
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        // Simulando una respuesta de API
        const data = {
          event: "2024-12-01",
          name: "Innovative Project",
          integrants: ["Juan Pérez", "María García", "Luis Gómez"],
        };
        setWinner(data);
      } catch (error) {
        window.alert("Error: Could not load winner information.");
        console.error("Error loading winner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWinner();
  }, []);

  if (loading) {
    return (
      <div style={styles.loader}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </div>
    );
  }

  if (!winner) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>No winner information found.</h1>
      </div>
    );
  }

  const eventDate = new Date(winner.event).toLocaleDateString();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <h1 style={styles.title}>Winners</h1>
      <img
        style={styles.image}
        src={LocalImage}
        alt="Winner"
      />
      <p style={styles.description}>Event: {eventDate}</p>
      <p style={styles.description}>Project Name: {winner.name}</p>
      <p style={styles.description}>Team Members:</p>
      {winner.integrants.map((integrant, index) => (
        <p key={index} style={styles.integrant}>
          - {integrant}
        </p>
      ))}
      <ConfettiCannon
        numberOfPieces={200}
        recycle={false}
        gravity={0.05}
      />
    </ScrollView>
  );
}

const styles = {
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  image: {
    width: 300,  // Imagen más grande
    height: 300, // Imagen más grande
    marginBottom: 20, // Espaciado en la parte inferior
    objectFit: "contain", // Asegura que la imagen se ajuste dentro de sus dimensiones
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },
  integrant: {
    fontSize: 14,
    textAlign: "center",
    color: "#444",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
};

export default Winners;
