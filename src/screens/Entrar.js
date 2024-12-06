import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambio a useNavigate en lugar de useHistory
import "../styles/Entrar.css"; // Agrega tu archivo CSS para los estilos

function Entrar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const navigate = useNavigate(); // Usar useNavigate para la navegación en React Router v6

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://app-tq3o5pftgq-uc.a.run.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert("Inicio de sesión exitoso.");

        // Guardar el ID de usuario en localStorage
        localStorage.setItem('userId', data.user.id.toString());

        // Navegar a la pantalla Principal pasando el usuario
        navigate("/principal", { state: { user: data.user } });
      } else {
        alert(data.message || "Credenciales inválidas.");
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Iniciar sesión</h1>

      <input
        type="email"
        className="input"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          className="input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      <button
        className={`button ${loading ? "button-disabled" : ""}`}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>

      <div className="link">
        <button onClick={() => navigate("/inicio")} className="link-text">
          Regresar
        </button>
      </div>
    </div>
  );
}

export default Entrar;
