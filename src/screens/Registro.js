import React, { useState, useEffect } from 'react';

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [selectedTecnologico, setSelectedTecnologico] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState('');
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
        setError('No se pudo cargar la lista de Tecnológicos');
      }
    };

    fetchTecnologicos();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!selectedTecnologico || !selectedCarrera || !name || !email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('El correo electrónico no es válido');
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
          degree: selectedCarrera,
          tec: selectedTecnologico,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Éxito', 'Registrado con éxito');
        navigation.navigate('Entrar');
      } else {
        setError(data.message || 'Hubo un error al registrar la cuenta');
      }
    } catch (error) {
      setError('Hubo un error al registrar la cuenta');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registra tu cuenta</h1>
      {error && <p style={styles.error}>{error}</p>}

      <input
        type="text"
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div style={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>
      <div style={styles.passwordContainer}>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          style={styles.input}
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
          {showConfirmPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      <select
        style={styles.input}
        value={selectedTecnologico}
        onChange={(e) => {
          setSelectedTecnologico(e.target.value);
          setSelectedCarrera(''); // Limpiar la selección de carrera al cambiar de tecnológico
        }}
      >
        <option value="">Selecciona un Tecnológico</option>
        {tecnologicos.map((tecnologico, index) => (
          <option key={index} value={tecnologico.name}>{tecnologico.name}</option>
        ))}
      </select>

      {selectedTecnologico && (
        <div>
          <h2 style={styles.subTitle}>Elige tu carrera</h2>
          {tecnologicos
            .find((tecnologico) => tecnologico.name === selectedTecnologico)?.degree?.map((carrera, index) => (
              <button
                key={index}
                onClick={() => setSelectedCarrera(carrera)}
                style={{
                  ...styles.carreraOption,
                  ...(selectedCarrera === carrera ? styles.selectedCarrera : {}),
                }}
              >
                {carrera}
              </button>
            )) || <p>No hay carreras disponibles</p>}
        </div>
      )}

      <div style={styles.buttonContainer}>
        <button onClick={handleRegister} style={styles.button}>Registrar</button>
      </div>

      <button onClick={() => navigation.navigate('Inicio')} style={styles.link}>
        Regresar
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderWidth: '1px',
    borderRadius: '5px',
  },
  subTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  carreraOption: {
    padding: '10px',
    borderWidth: '1px',
    borderRadius: '5px',
    marginBottom: '5px',
  },
  selectedCarrera: {
    backgroundColor: '#cce5ff',
  },
  buttonContainer: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  link: {
    marginTop: '20px',
    color: 'blue',
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
  },
};

export default Registro;
