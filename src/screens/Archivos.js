import React, { useState, useEffect } from "react";

function Archivos() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [integrantes, setIntegrantes] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Obtener todos los proyectos al cargar la pantalla
  useEffect(() => {
    fetch("http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/proyects")
      .then((response) => response.json())
      .then((data) => setProyectos(data))
      .catch((error) => console.error("Error al obtener proyectos:", error));
  }, []);

  const handleSubmit = () => {
    const integrantsArray = integrantes.split(",").map((item) => item.trim());

    const projectData = {
      name: nombre,
      description: descripcion,
      integrants: integrantsArray,
      degree: "Grado",
    };

    fetch("http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/new-proyect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
        setProyectos((prevProyectos) => [...prevProyectos, data]);
        alert("Proyecto creado con éxito!");
      })
      .catch((error) => {
        console.error("Error al crear proyecto:", error);
        alert("Error al crear el proyecto.");
      });
  };

  const handleProjectPress = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Proyectos</h1>
      <p style={styles.subtitle}>Registra y gestiona tus proyectos fácilmente</p>

      <div style={styles.form}>
        <label style={styles.label}>Nombre:</label>
        <input
          style={styles.input}
          placeholder="Nombre del proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label style={styles.label}>Descripción:</label>
        <textarea
          style={{ ...styles.input, ...styles.textArea }}
          placeholder="Descripción del proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <label style={styles.label}>Integrantes:</label>
        <input
          style={styles.input}
          placeholder="Separar nombres por comas"
          value={integrantes}
          onChange={(e) => setIntegrantes(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          Registrar Proyecto
        </button>
      </div>

      <h2 style={styles.projectListTitle}>Proyectos Creados</h2>
      <div style={styles.projectList}>
        {proyectos.map((project) => (
          <button
            key={project.name}
            style={styles.projectButton}
            onClick={() => handleProjectPress(project)}
          >
            {project.name}
          </button>
        ))}
      </div>

      {showModal && (
        <div style={styles.modalContainer}>
          <div style={styles.modalContent}>
            {currentProject && (
              <>
                <h3 style={styles.modalTitle}>{currentProject.name}</h3>
                <p style={styles.modalText}>
                  <strong>Descripción:</strong> {currentProject.description}
                </p>
                <p style={styles.modalText}>
                  <strong>Integrantes:</strong> {currentProject.integrants.join(", ")}
                </p>
              </>
            )}
            <button style={styles.modalButton} onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
  },
  form: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  },
  textArea: {
    height: "80px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  projectListTitle: {
    fontSize: "20px",
    color: "#333",
    textAlign: "center",
    marginTop: "40px",
  },
  projectList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    margin: "20px auto",
    maxWidth: "800px",
  },
  projectButton: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "4px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  projectButtonHover: {
    backgroundColor: "#f0f0f0",
  },
  modalContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
  modalTitle: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "10px",
  },
  modalText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  modalButton: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Archivos;
