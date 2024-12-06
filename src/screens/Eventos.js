import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegación
import { Puff } from 'react-loader-spinner'; // O cualquier otro componente disponible

function Eventos() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Usado para navegar entre vistas si es necesario

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLinkPress = (url) => {
    window.open(url, "_blank"); // Abre el enlace en una nueva pestaña
  };

  const renderItem = (item) => {
    const eventDate = new Date(item.date._seconds * 1000); // Convertir segundos a milisegundos
    return (
      <div style={styles.item} key={item.id}>
        <img src={require("../images/Solacyt.jpg")} alt="event image" style={styles.image} />
        <div style={styles.textContainer}>
          <h3 style={styles.title}>{item.name}</h3>
          <p style={styles.description}>{item.description}</p>
          <p style={styles.date}>Fecha: {eventDate.toLocaleDateString()}</p>
          <p 
            style={styles.link} 
            onClick={() => handleLinkPress("https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj1vb6674yKAxU7MNAFHfFUG2wQFnoECBEQAQ&url=https%3A%2F%2Fsolacyt.org%2F&usg=AOvVaw3d07o5IhCq0Eg_9fDaV_9g&opi=89978449")}
          >
            Más información
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={styles.loader}>
        <Puff type="Oval" color="#1E90FF" height={50} width={50} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={{ paddingBottom: "16px" }}>
        {events.map((item) => renderItem(item))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "16px",
    backgroundColor: "#f9f9f9",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "16px",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    marginRight: "16px",
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
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
};

export default Eventos;
