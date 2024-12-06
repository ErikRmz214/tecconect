import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap"; // Usando react-bootstrap para alertas
import { FaUserCircle } from "react-icons/fa"; // Icono de perfil usando react-icons
import { useNavigate } from "react-router-dom"; // Para manejar la navegación
import '../styles/Profile.css'

function Profile() {
  const [editable, setEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    institution: "",
    degree: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (userId) {
        const response = await fetch(`https://app-tq3o5pftgq-uc.a.run.app/api/user/${userId}`);
        if (!response.ok) {
          throw new Error("Error fetching user data.");
        }
        const data = await response.json();

        setUserInfo({
          name: data.user.name || '',
          email: data.user.email || '',
          password: data.user.password || '',
          institution: data.user.tec || '',
          degree: data.user.degree[0] || '',
        });
      } else {
        throw new Error("User ID not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrorMessage("There was a problem retrieving the data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const validateInputs = () => {
    const { name, email, password, institution, degree } = userInfo;
    
    // Trim inputs
    const trimmedInputs = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      institution: institution.trim(),
      degree: degree.trim()
    };

    // Validation checks
    if (!trimmedInputs.name) {
      setErrorMessage("Name cannot be empty.");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedInputs.email || !emailRegex.test(trimmedInputs.email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }

    // Password validation
    if (!trimmedInputs.password || trimmedInputs.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return false;
    }

    if (!trimmedInputs.institution) {
      setErrorMessage("Institution cannot be empty.");
      return false;
    }

    if (!trimmedInputs.degree) {
      setErrorMessage("Degree cannot be empty.");
      return false;
    }

    return trimmedInputs;
  };

  const handleSaveChanges = async () => {
    // Validate inputs
    const validatedInputs = validateInputs();
    if (!validatedInputs) return;

    try {
      const userId = localStorage.getItem("userId");

      if (userId) {
        const response = await fetch(`https://app-tq3o5pftgq-uc.a.run.app/api/edit-user/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: validatedInputs.name,
            email: validatedInputs.email,
            password: validatedInputs.password,
            tec: validatedInputs.institution,
            degree: [validatedInputs.degree],
          }),
        });

        // Check if response is successful
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error:", errorData);
          throw new Error(errorData.message || "Error updating user data.");
        }

        const data = await response.json();
        console.log("API response after update:", data);

        // Reload updated data
        await fetchUserData();
        
        // Disable edit mode
        setEditable(false);
        
        // Show success message
        setErrorMessage("Changes saved successfully.");
      } else {
        throw new Error("User ID not found.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setErrorMessage(error.message || "There was a problem saving the data.");
    }
  };

  const signOut = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const toggleEditable = () => {
    if (editable) {
      // If in edit mode, try to save changes
      handleSaveChanges();
    } else {
      // If not in edit mode, activate editing
      setEditable(true);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  return (
    <div className="profile-container">
      <FaUserCircle className="profile-icon" size={150} color="#000080" />

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}  {/* Error alert */}

      <div className="info-container">
        <label className="field-label">Name</label>
        <input
          type="text"
          className={`info-text ${editable && "editable-field"}`}
          value={userInfo.name}
          disabled={!editable}  // Cambié de editable a disabled
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter your name"
        />

        <label className="field-label">Email</label>
        <input
          type="email"
          className={`info-text ${editable && "editable-field"}`}
          value={userInfo.email}
          disabled={!editable}  // Cambié de editable a disabled
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter your email"
        />

        <label className="field-label">Institution</label>
        <input
          type="text"
          className={`info-text ${editable && "editable-field"}`}
          value={userInfo.institution}
          disabled={!editable}  // Cambié de editable a disabled
          onChange={(e) => handleInputChange("institution", e.target.value)}
          placeholder="Enter your institution"
        />

        <label className="field-label">Degree</label>
        <input
          type="text"
          className={`info-text ${editable && "editable-field"}`}
          value={userInfo.degree}
          disabled={!editable}  // Cambié de editable a disabled
          onChange={(e) => handleInputChange("degree", e.target.value)}
          placeholder="Enter your degree"
        />

        <label className="field-label">Password</label>
        <input
          type="password"
          className={`info-text ${editable && "editable-field"}`}
          value={userInfo.password}
          disabled={!editable}  // Cambié de editable a disabled
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      <button className="edit-button" onClick={toggleEditable}>
        {editable ? "Save" : "Edit"}
      </button>

      <button className="sign-out-button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
