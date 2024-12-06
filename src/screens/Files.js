import React, { useState, useEffect } from "react";
import "../styles/Files.css";
function Files() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Fetch all projects when the screen loads
  useEffect(() => {
    fetch("https://app-tq3o5pftgq-uc.a.run.app/api/proyects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleSubmit = () => {
    const membersArray = members.split(",").map((item) => item.trim()); // Convert to array

    const projectData = {
      name: name,
      description: description,
      integrants: membersArray,
      degree: "Degree", // Add degree here if necessary
    };

    fetch("https://app-tq3o5pftgq-uc.a.run.app/api/new-proyect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Project created:", data);
        setProjects((prevProjects) => [...prevProjects, data]); // Add the project to the list
        alert("Project created successfully!");
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        alert("Error creating the project.");
      });
  };

  const handleProjectPress = (project) => {
    setCurrentProject(project);
    setShowModal(true); // Show the modal window with the project details
  };

  return (
    <div className="container">
      {/* Form */}
      <label className="label">Name:</label>
      <input
        className="input"
        placeholder="Enter the name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="label">Description:</label>
      <textarea
        className="input text-area"
        placeholder="Enter the description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="label">Members:</label>
      <input
        className="input"
        placeholder="Enter the names of the members"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
      />

      <button className="button" onClick={handleSubmit}>
        Submit
      </button>

      {/* Display projects */}
      <h2 className="project-list-title">Created Projects:</h2>
      <ul>
        {projects.map((item) => (
          <li key={item.id}>
            <button className="project-button" onClick={() => handleProjectPress(item)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Modal to show project details */}
      {showModal && currentProject && (
        <div className="modal-container">
          <div className="modal-content">
            <h3 className="modal-title">{currentProject.name}</h3>
            <p>{`Description: ${currentProject.description}`}</p>
            <p>{`Members: ${currentProject.integrants.join(", ")}`}</p>
            <button className="modal-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Files;
