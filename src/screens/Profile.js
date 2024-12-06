import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcons from "@mui/icons-material/AccountCircle"; // Ensure this dependency is installed

function Profile() {
  const [editable, setEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    institute: "",
    degree: "",
  });
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (userId) {
        const response = await fetch(
          `http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Error retrieving user data.");
        }
        const data = await response.json();

        setUserInfo({
          name: data.user.name || "",
          email: data.user.email || "",
          password: data.user.password || "",
          institute: data.user.tec || "",
          degree: data.user.degree[0] || "",
        });
      } else {
        throw new Error("User ID not found.");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      window.alert("There was an issue retrieving the data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const validateInputs = () => {
    const { name, email, password, institute, degree } = userInfo;

    const trimmedInputs = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      institute: institute.trim(),
      degree: degree.trim(),
    };

    if (!trimmedInputs.name) {
      window.alert("Name cannot be empty.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedInputs.email || !emailRegex.test(trimmedInputs.email)) {
      window.alert("Please enter a valid email address.");
      return false;
    }

    if (!trimmedInputs.password || trimmedInputs.password.length < 6) {
      window.alert("Password must be at least 6 characters.");
      return false;
    }

    if (!trimmedInputs.institute) {
      window.alert("Institute cannot be empty.");
      return false;
    }

    if (!trimmedInputs.degree) {
      window.alert("Degree cannot be empty.");
      return false;
    }

    return trimmedInputs;
  };

  const handleSaveChanges = async () => {
    const validatedInputs = validateInputs();
    if (!validatedInputs) return;

    try {
      const userId = localStorage.getItem("userId");

      if (userId) {
        const response = await fetch(
          `http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/edit-user/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: validatedInputs.name,
              email: validatedInputs.email,
              password: validatedInputs.password,
              tec: validatedInputs.institute,
              degree: [validatedInputs.degree],
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(
            errorData.message || "Error updating user data."
          );
        }

        const data = await response.json();
        console.log("API response after update:", data);

        await fetchUserData();

        setEditable(false);

        window.alert("Changes saved successfully.");
      } else {
        throw new Error("User ID not found.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      window.alert(error.message || "There was a problem saving the data.");
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const toggleEditable = () => {
    if (editable) {
      handleSaveChanges();
    } else {
      setEditable(true);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const mergeStyles = (baseStyle, conditionalStyle) => ({
    ...baseStyle,
    ...(conditionalStyle || {}),
  });

  return (
    <div style={styles.container}>
      <MaterialIcons style={styles.profileIcon} />

      <div style={styles.infoContainer}>
        <p style={styles.fieldLabel}>Name</p>
        <input
          style={mergeStyles(
            styles.infoText,
            editable ? styles.editableField : null
          )}
          value={userInfo.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter your name"
          disabled={!editable}
        />

        <p style={styles.fieldLabel}>Email</p>
        <input
          style={mergeStyles(
            styles.infoText,
            editable ? styles.editableField : null
          )}
          value={userInfo.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter your email"
          type="email"
          disabled={!editable}
        />

        <p style={styles.fieldLabel}>Institute</p>
        <input
          style={mergeStyles(
            styles.infoText,
            editable ? styles.editableField : null
          )}
          value={userInfo.institute}
          onChange={(e) => handleInputChange("institute", e.target.value)}
          placeholder="Enter your institute"
          disabled={!editable}
        />

        <p style={styles.fieldLabel}>Degree</p>
        <input
          style={mergeStyles(
            styles.infoText,
            editable ? styles.editableField : null
          )}
          value={userInfo.degree}
          onChange={(e) => handleInputChange("degree", e.target.value)}
          placeholder="Enter your degree"
          disabled={!editable}
        />

        <p style={styles.fieldLabel}>Password</p>
        <input
          style={mergeStyles(
            styles.infoText,
            editable ? styles.editableField : null
          )}
          value={userInfo.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Enter your password"
          type="password"
          disabled={!editable}
        />
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={toggleEditable}>
          {editable ? "Save changes" : "Edit profile"}
        </button>
        <button style={styles.button} onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  profileIcon: {
    fontSize: "100px",
    marginBottom: "20px",
  },
  infoContainer: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: "20px",
  },
  fieldLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  infoText: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
  },
  editableField: {
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "400px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Profile;
