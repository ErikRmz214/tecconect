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
    const integrantsArray = integrantes.split(",").map((item) => item.trim()); // Convertir a array

    const projectData = {
      name: nombre,
      description: descripcion,
      integrants: integrantsArray,
      degree: "Grado", // Agregar aquí el grado si es necesario
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
        console.log("Proyecto creado:", data);
        setProyectos((prevProyectos) => [...prevProyectos, data]); // Agregar el proyecto a la lista
        alert("Proyecto creado con éxito!");
      })
      .catch((error) => {
        console.error("Error al crear proyecto:", error);
        alert("Error al crear el proyecto.");
      });
  };

  const handleProjectPress = (project) => {
    setCurrentProject(project);
    setShowModal(true); // Mostrar la ventana modal con los detalles del proyecto
  };

  const renderProjectButton = (project) => (
    <button style={styles.projectButton} onClick={() => handleProjectPress(project)}>
      {project.name}
    </button>
  );

  return (
    <div style={styles.container}>
      {/* Formulario */}
      <label style={styles.label}>Nombre:</label>
      <input
        style={styles.input}
        placeholder="Escribe el nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <label style={styles.label}>Descripción:</label>
      <textarea
        style={{ ...styles.input, ...styles.textArea }}
        placeholder="Escribe la descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <label style={styles.label}>Integrantes:</label>
      <input
        style={styles.input}
        placeholder="Escribe los nombres de los integrantes"
        value={integrantes}
        onChange={(e) => setIntegrantes(e.target.value)}
      />

      <button style={styles.button} onClick={handleSubmit}>
        Enviar
      </button>

      {/* Mostrar proyectos */}
      <h3 style={styles.projectListTitle}>Proyectos creados:</h3>
      <div>
        {proyectos.map((project) => renderProjectButton(project))}
      </div>

      {/* Modal para mostrar detalles del proyecto */}
      {showModal && (
        <div style={styles.modalContainer}>
          <div style={styles.modalContent}>
            {currentProject && (
              <>
                <h4 style={styles.modalTitle}>{currentProject.name}</h4>
                <p>{`Descripción: ${currentProject.description}`}</p>
                <p>{`Integrantes: ${currentProject.integrants.join(", ")}`}</p>
              </>
            )}
            <button
              style={styles.modalButton}
              onClick={() => setShowModal(false)}
            >
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
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    borderWidth: "1px",
    borderColor: "#ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    width: "100%",
  },
  textArea: {
    height: "100px",
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000080",
    padding: "15px",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  projectListTitle: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  projectButton: {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
    marginVertical: "5px",
    cursor: "pointer",
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
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  modalButton: {
    backgroundColor: "#000080",
    padding: "10px",
    marginTop: "20px",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Archivos;
