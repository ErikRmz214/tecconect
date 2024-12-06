import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Confetti from 'react-confetti'; // Import the confetti library

function Winners() {
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  // Confetti configuration
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        const data = {
          event: "2024-12-01", // Event date
          name: "Innovative Project",
          integrants: ["Juan Pérez", "María García", "Luis Gómez"],
        };
        setWinner(data);
      } catch (error) {
        alert("Unable to load winner information.");
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
        <CircularProgress size={50} color="primary" />
      </div>
    );
  }

  if (!winner) {
    return (
      <div style={styles.container}>
        <h2>No winner information found.</h2>
      </div>
    );
  }

  const eventDate = new Date(winner.event).toLocaleDateString("en-US");

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Winners</h2>
      {winner && <Confetti width={windowWidth} height={windowHeight} />}
      <img
        style={styles.image}
        src={require("../images/Winner.jpg")}
        alt="Winner image"
      />
      <p style={styles.description}>Event: {eventDate}</p>
      <p style={styles.description}>Project Name: {winner.name}</p>
      <p style={styles.description}>Team Members:</p>
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
    fontFamily: "'Roboto', sans-serif",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  image: {
    width: "300px",
    height: "300px",
    marginBottom: "20px",
    objectFit: "contain",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  description: {
    fontSize: "18px",
    textAlign: "center",
    color: "#444",
    marginBottom: "10px",
    fontWeight: "500",
  },
  integrant: {
    fontSize: "16px",
    textAlign: "center",
    color: "#666",
    marginBottom: "5px",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
};

export default Winners;
