import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Entrar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert("Inicio de sesión exitoso.");
        localStorage.setItem('userId', data.user.id.toString());
        navigate("/principal", { state: { user: data.user } });
      } else {
        alert(data.message || "Credenciales inválidas.");
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor. Revisa la consola para más detalles.");
      console.error("Error al iniciar sesión:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Iniciar sesión</h1>

      <input
        type="email"
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? "text" : "password"}
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={styles.eyeIcon}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      <button
        style={loading ? styles.buttonDisabled : styles.button}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>

      <div style={styles.link}>
        <button onClick={() => navigate("/inicio")} style={styles.linkText}>
          Regresar
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f8f8f8',
    height: '100vh',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  },
  input: {
    width: '80%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#000080',
  },
  passwordContainer: {
    position: 'relative',
    width: '80%',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    color: '#000080',
    fontSize: '16px',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#000080',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '80%',
    marginTop: '20px',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'not-allowed',
    width: '80%',
    marginTop: '20px',
  },
  link: {
    marginTop: '20px',
  },
  linkText: {
    backgroundColor: 'transparent',
    color: '#000080',
    fontSize: '16px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default Entrar;
