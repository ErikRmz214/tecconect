import React, { useState, useEffect } from "react";

function Files() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Get all projects when the page loads
  useEffect(() => {
    fetch("http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/proyects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleSubmit = () => {
    const membersArray = members.split(",").map((item) => item.trim());

    const projectData = {
      name: name,
      description: description,
      members: membersArray,
      degree: "Degree",
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
        setProjects((prevProjects) => [...prevProjects, data]);
        alert("Project created successfully!");
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        alert("Error creating the project.");
      });
  };

  const handleProjectPress = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Project Management</h1>
      <p style={styles.subtitle}>Easily register and manage your projects</p>

      <div style={styles.form}>
        <label style={styles.label}>Name:</label>
        <input
          style={styles.input}
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label style={styles.label}>Description:</label>
        <textarea
          style={{ ...styles.input, ...styles.textArea }}
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label style={styles.label}>Members:</label>
        <input
          style={styles.input}
          placeholder="Separate names with commas"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          Register Project
        </button>
      </div>

      <h2 style={styles.projectListTitle}>Created Projects</h2>
      <div style={styles.projectList}>
        {projects.map((project) => (
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
                  <strong>Description:</strong> {currentProject.description}
                </p>
                <p style={styles.modalText}>
                  <strong>Members:</strong> {currentProject.members.join(", ")}
                </p>
              </>
            )}
            <button style={styles.modalButton} onClick={() => setShowModal(false)}>
              Close
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

export default Files;
