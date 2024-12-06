import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner"; // Reemplazamos ActivityIndicator por Oval

function EventItem({ event }) {
  const eventDate = new Date(event.date._seconds * 1000);
  
  return (
    <div style={styles.item}>
      <img
        src={require("../images/Solacyt.jpg")}
        alt={event.name}
        style={styles.image}
      />
      <div style={styles.textContainer}>
        <h2 style={styles.title}>{event.name}</h2>
        <p style={styles.description}>{event.description}</p>
        <p style={styles.date}>Date: {eventDate.toLocaleDateString()}</p>
        <p
          style={styles.link}
          onClick={() =>
            window.open(
              "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj1vb6674yKAxU7MNAFHfFUG2wQFnoECBEQAQ&url=https%3A%2F%2Fsolacyt.org%2F&usg=AOvVaw3d07o5IhCq0Eg_9fDaV_9g&opi=89978449",
              "_blank"
            )
          }
        >
          More information
        </p>
      </div>
    </div>
  );
}

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://app-tq3o5pftgq-uc.a.run.app/api/events");
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

  if (loading) {
    return (
      <div style={styles.loader}>
        <Oval type="Oval" color="#1E90FF" height={50} width={50} /> {/* Usamos Oval aquí */}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  description: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "4px",
  },
  date: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "8px",
  },
  link: {
    fontSize: "14px",
    color: "#1E90FF",
    textDecoration: "underline",
    cursor: "pointer",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    height: "100vh",
  },
};

export default Events;
