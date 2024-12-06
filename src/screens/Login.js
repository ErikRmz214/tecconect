import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap"; // Usando Alert de react-bootstrap para las alertas

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
  const navigate = useNavigate(); // Para la navegación en React Router

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
  
    setLoading(true);
    setErrorMessage(""); // Limpiar cualquier mensaje de error anterior
  
    try {
      // Cambiar la URL para usar la función de Firebase localmente
      const response = await fetch("http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem("userId", data.user.id);
        navigate("/main", { state: { user: data.user } });
      } else {
        setErrorMessage(data.message || "Invalid credentials.");
      }
    } catch (error) {
      setErrorMessage("Could not connect to the server.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Deshabilitar la función de retroceso del navegador (si es necesario)
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      return false; // Bloquea el botón de retroceso
    };
    window.addEventListener("beforeunload", handleBackButton);

    return () => {
      window.removeEventListener("beforeunload", handleBackButton);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Log In</h1>

      <input
        style={styles.input}
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <button
        style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
        onClick={handleLogin}
        disabled={loading} // Deshabilitar el botón mientras se carga
      >
        {loading ? "Loading..." : "Log In"}
      </button>

      {/* Texto personalizado para regresar */}
      <button onClick={() => navigate("/index")} style={styles.link}>
        <span style={styles.linkText}>Go back</span>
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    height: "100vh",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    height: "50px",
    borderColor: "#ccc",
    borderWidth: "1px",
    borderRadius: "5px",
    marginBottom: "15px",
    paddingLeft: "10px",
  },
  button: {
    width: "100%",
    height: "50px",
    backgroundColor: "#000080", // Cambiar el color del botón aquí
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  buttonDisabled: {
    backgroundColor: "#ccc", // Color del botón deshabilitado
  },
  buttonText: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
  },
  link: {
    marginTop: "20px",
    cursor: "pointer",
  },
  linkText: {
    color: "#007BFF",
    textDecoration: "underline",
    fontSize: "16px",
  },
};

export default Login;
