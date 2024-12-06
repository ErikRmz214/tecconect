import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook

const Registration = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [selectedTecnologico, setSelectedTecnologico] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [tecnologicos, setTecnologicos] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchTecnologicos = async () => {
      try {
        const response = await fetch('http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/tecs');
        const data = await response.json();
        setTecnologicos(data);
      } catch (error) {
        setError('Failed to load the Tecnológicos list');
      }
    };

    fetchTecnologicos();
  }, []);

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!selectedTecnologico || !selectedDegree || !name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      return;
    }

    setError(null);

    try {
      const response = await fetch('http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/new-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          degree: selectedDegree,
          tec: selectedTecnologico,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Success', 'Successfully Registrationed');
        navigate('/login'); // Change navigation here
      } else {
        setError(data.message || 'There was an error Registrationing the account');
      }
    } catch (error) {
      setError('There was an error Registrationing the account');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registration Your Account</h1>
      {error && <p style={styles.error}>{error}</p>}

      <input
        type="text"
        style={styles.input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          style={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div style={styles.passwordContainer}>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
          {showConfirmPassword ? "Hide" : "Show"}
        </button>
      </div>

      <select
        style={styles.select}
        value={selectedTecnologico}
        onChange={(e) => {
          setSelectedTecnologico(e.target.value);
          setSelectedDegree(''); // Clear degree selection when changing Tecnológico
        }}
      >
        <option value="">Select a Tecnológico</option>
        {tecnologicos.map((tecnologico, index) => (
          <option key={index} value={tecnologico.name}>{tecnologico.name}</option>
        ))}
      </select>

      {selectedTecnologico && (
        <div>
          <h2 style={styles.subTitle}>Choose Your Degree</h2>
          <select
            style={styles.select}
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
          >
            <option value="">Select a Degree</option>
            {tecnologicos
              .find((tecnologico) => tecnologico.name === selectedTecnologico)?.degree?.map((degree, index) => (
                <option key={index} value={degree}>{degree}</option>
              )) || <option>No degrees available</option>}
          </select>
        </div>
      )}

      <div style={styles.buttonContainer}>
        <button onClick={handleRegistration} style={styles.button}>Registration</button>
      </div>

      <button onClick={() => navigate('/home')} style={styles.link}>Back</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    maxWidth: '450px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    borderWidth: '1px',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    borderColor: '#ccc',
    transition: 'border-color 0.3s',
  },
  select: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    borderWidth: '1px',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    borderColor: '#ccc',
    transition: 'border-color 0.3s',
  },
  subTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center',
  },
  link: {
    marginTop: '15px',
    color: '#007BFF',
    textDecoration: 'underline',
    fontSize: '16px',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '15px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    transition: 'background-color 0.3s',
  },
};

export default Registration;
