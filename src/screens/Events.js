import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Puff } from 'react-loader-spinner'; // Loader component

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLinkPress = (url) => {
    window.open(url, "_blank");
  };

  const renderItem = (item) => {
    const eventDate = new Date(item.date._seconds * 1000); // Convert seconds to milliseconds
    return (
      <div style={styles.card} key={item.id}>
        <img src={require("../images/Solacyt.jpg")} alt="event" style={styles.image} />
        <div style={styles.content}>
          <h3 style={styles.title}>{item.name}</h3>
          <p style={styles.description}>{item.description}</p>
          <p style={styles.date}>
            <strong>Date:</strong> {eventDate.toLocaleDateString()}
          </p>
          <button
            style={styles.button}
            onClick={() =>
              handleLinkPress("https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj1vb6674yKAxU7MNAFHfFUG2wQFnoECBEQAQ&url=https%3A%2F%2Fsolacyt.org%2F&usg=AOvVaw3d07o5IhCq0Eg_9fDaV_9g&opi=89978449")
            }
          >
            More Information
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={styles.loader}>
        <Puff type="Oval" color="#007BFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Available Events</h1>
      <div style={styles.list}>{events.map((item) => renderItem(item))}</div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardHover: {
    transform: "scale(1.02)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  date: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "15px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export default Events;
