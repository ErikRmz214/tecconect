import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        alert("Login successful.");
        localStorage.setItem("userId", data.user.id.toString());
        navigate("/home", { state: { user: data.user } });
      } else {
        alert(data.message || "Invalid credentials.");
      }
    } catch (error) {
      alert("Could not connect to the server. Check the console for more details.");
      console.error("Login error:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome</h1>
        <p style={styles.subtitle}>Enter your credentials to continue</p>

        <input
          type="email"
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            style={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🔒"}
          </button>
        </div>

        <button
          style={loading ? styles.buttonDisabled : styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <div style={styles.link}>
          <button onClick={() => navigate("/start")} style={styles.linkText}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f7fc",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "400px",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#777777",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #cccccc",
    fontSize: "16px",
    outline: "none",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0066cc",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#cccccc",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    border: "none",
    cursor: "not-allowed",
  },
  link: {
    marginTop: "20px",
  },
  linkText: {
    backgroundColor: "transparent",
    color: "#0066cc",
    fontSize: "14px",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default Login;
