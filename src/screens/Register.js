import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [selectedTechnological, setSelectedTechnological] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [technologicals, setTechnologicals] = useState([]);
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  useEffect(() => {
    const fetchTechnologicals = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/node-firebase-example-fd01e/us-central1/app/api/tecs');
        if (!response.ok) {
          throw new Error('Failed to fetch technologicals');
        }
        const data = await response.json();
        setTechnologicals(data);
      } catch (error) {
        setError('Could not load the list of Technologicals');
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologicals();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!selectedTechnological || !selectedCareer || !name || !email || !password) {
      setError('Please complete all fields');
      return;
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Verificación de la longitud mínima de la contraseña
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
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
          degree: selectedCareer,
          tec: selectedTechnological,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Successfully registered');
        navigate('/login');
      } else {
        setError(data.message || 'There was an error registering the account');
      }
    } catch (error) {
      setError('There was an error registering the account');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register Your Account</h2>
      {error && <p style={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={styles.input}
      />

      <select
        value={selectedTechnological}
        onChange={(e) => {
          setSelectedTechnological(e.target.value);
          setSelectedCareer('');
        }}
        style={styles.input}
      >
        <option value="">Select a Technological</option>
        {technologicals.map((technological, index) => (
          <option key={index} value={technological.name}>
            {technological.name}
          </option>
        ))}
      </select>

      {selectedTechnological && (
        <div>
          <h3>Choose your career</h3>
          {technologicals
            .find((technological) => technological.name === selectedTechnological)
            ?.degree?.map((career, index) => (
              <button
                key={index}
                onClick={() => setSelectedCareer(career)}
                style={{
                  ...styles.careerOption,
                  ...(selectedCareer === career ? styles.selectedCareer : {}),
                }}
              >
                {career}
              </button>
            )) || <p>No careers available</p>}
        </div>
      )}

      {loading && <p>Loading...</p>}

      <div style={styles.buttonContainer}>
        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>
      </div>

      <button onClick={() => navigate('/')} style={styles.link}>
        Go back
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderWidth: '1px',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#000080',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  link: {
    marginTop: '20px',
    color: 'blue',
    textDecoration: 'underline',
  },
  careerOption: {
    padding: '10px',
    borderWidth: '1px',
    borderRadius: '5px',
    marginBottom: '5px',
    cursor: 'pointer',
  },
  selectedCareer: {
    backgroundColor: '#cce5ff',
  },
};

export default Registration;
