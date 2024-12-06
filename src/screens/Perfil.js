import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcons from "@mui/icons-material/AccountCircle"; // Asegúrate de tener esta dependencia instalada

function Perfil() {
  const [editable, setEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: "",
    correo: "",
    password: "",
    tecnologico: "",
    carrera: "",
  });
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (userId) {
        const response = await fetch(`https://app-tq3o5pftgq-uc.a.run.app/api/user/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }
        const data = await response.json();

        setUserInfo({
          nombre: data.user.name || '',
          correo: data.user.email || '',
          password: data.user.password || '',
          tecnologico: data.user.tec || '',
          carrera: data.user.degree[0] || '',
        });
      } else {
        throw new Error("No se encontró el ID de usuario.");
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      window.alert("Hubo un problema al recuperar los datos.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const validateInputs = () => {
    const { nombre, correo, password, tecnologico, carrera } = userInfo;

    const trimmedInputs = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      password: password.trim(),
      tecnologico: tecnologico.trim(),
      carrera: carrera.trim(),
    };

    if (!trimmedInputs.nombre) {
      window.alert("El nombre no puede estar vacío.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedInputs.correo || !emailRegex.test(trimmedInputs.correo)) {
      window.alert("Por favor, ingrese un correo electrónico válido.");
      return false;
    }

    if (!trimmedInputs.password || trimmedInputs.password.length < 6) {
      window.alert("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    if (!trimmedInputs.tecnologico) {
      window.alert("El tecnológico no puede estar vacío.");
      return false;
    }

    if (!trimmedInputs.carrera) {
      window.alert("La carrera no puede estar vacía.");
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
        const response = await fetch(`https://app-tq3o5pftgq-uc.a.run.app/api/edit-user/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: validatedInputs.nombre,
            email: validatedInputs.correo,
            password: validatedInputs.password,
            tec: validatedInputs.tecnologico,
            degree: [validatedInputs.carrera],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error de la API:", errorData);
          throw new Error(errorData.message || "Error al actualizar los datos del usuario.");
        }

        const data = await response.json();
        console.log("Respuesta de la API después de la actualización:", data);

        await fetchUserData();

        setEditable(false);

        window.alert("Cambios realizados con éxito.");
      } else {
        throw new Error("No se encontró el ID de usuario.");
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      window.alert(error.message || "Hubo un problema al guardar los datos.");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("userId");
    navigate("/entrar");
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

  return (
    <div style={styles.container}>
      <MaterialIcons style={styles.profileIcon} />
      
      <div style={styles.infoContainer}>
        <p style={styles.fieldLabel}>Nombre</p>
        <input
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.nombre}
          onChange={(e) => handleInputChange("nombre", e.target.value)}
          placeholder="Ingrese su nombre"
          disabled={!editable}
        />

        <p style={styles.fieldLabel}>Correo</p>
        <input
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.correo}
          onChange={(e) => handleInputChange("correo", e.target.value)}
          placeholder="Ingrese su correo"
          type="email"
          disabled={!editable}
        />

        <p style={styles.fieldLabel}>Tecnológico</p>
        <input
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.tecnologico}
          onChange={(e) => handleInputChange("tecnologico", e.target.value)}
          placeholder="Ingrese su tecnológico"
          disabled={!editable}
        />

        <p style={styles.fieldLabel}>Carrera</p>
        <input
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.carrera}
          onChange={(e) => handleInputChange("carrera", e.target.value)}
          placeholder="Ingrese su carrera"
          disabled={!editable}
        />

        <p style={styles.fieldLabel}>Contraseña</p>
        <input
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Ingrese su contraseña"
          type="password"
          disabled={!editable}
        />
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={toggleEditable}>
          {editable ? "Guardar cambios" : "Editar perfil"}
        </button>
        <button style={styles.button} onClick={cerrarSesion}>
          Cerrar sesión
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

export default Perfil;
