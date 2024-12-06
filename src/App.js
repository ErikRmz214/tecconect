import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Importar las pantallas originales (Español)
import Inicio from './screens/Inicio';
import Idioma from './screens/Idioma';
import Entrar from './screens/Entrar';
import Registro from './screens/Registro';
import Eventos from './screens/Eventos';
import Archivos from './screens/Archivos';
import Principal from './screens/Principal';
import Ganadores from './screens/Ganadores';
import Perfil from './screens/Perfil';

// Importar las pantallas en inglés
import Index from './screens/Index';
import Login from './screens/Login';
import Register from './screens/Register';
import Main from './screens/Main';
import Events from './screens/Events';
import Files from './screens/Files';
import Winners from './screens/Winners';
import Profile from './screens/Profile';

// Estilos en línea
const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  navbar: {
    backgroundColor: '#282c34',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  navbarLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    padding: 0,
    margin: 0,
  },
  navbarLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

// Barra de navegación en español
function NavbarEs() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarLinks}>
        <li><Link to="/principal" style={styles.navbarLink}>Principal</Link></li>
        <li><Link to="/eventos" style={styles.navbarLink}>Eventos</Link></li>
        <li><Link to="/archivos" style={styles.navbarLink}>Archivos</Link></li>
        <li><Link to="/perfil" style={styles.navbarLink}>Perfil</Link></li>
      </ul>
    </nav>
  );
}

// Barra de navegación en inglés
function NavbarEn() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarLinks}>
        <li><Link to="/main" style={styles.navbarLink}>Main</Link></li>
        <li><Link to="/events" style={styles.navbarLink}>Events</Link></li>
        <li><Link to="/files" style={styles.navbarLink}>Files</Link></li>
        <li><Link to="/profile" style={styles.navbarLink}>Profile</Link></li>
      </ul>
    </nav>
  );
}

// Componente para manejar las barras de navegación condicionales
function Navigation() {
  const location = useLocation();

  // Rutas para mostrar la barra en español
  const spanishRoutes = ['/principal', '/eventos', '/archivos', '/perfil'];
  // Rutas para mostrar la barra en inglés
  const englishRoutes = ['/main', '/events', '/files', '/profile'];

  if (spanishRoutes.includes(location.pathname)) {
    return <NavbarEs />;
  }

  if (englishRoutes.includes(location.pathname)) {
    return <NavbarEn />;
  }

  return null; // No mostrar barra de navegación
}

// Componente principal de la aplicación
export default function App() {
  return (
    <Router>
      <div style={styles.app}>
        {/* Barra de navegación condicional */}
        <Navigation />

        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<Idioma />} />
          {/* Español */}
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/entrar" element={<Entrar />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/archivos" element={<Archivos />} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/ganadores" element={<Ganadores />} />
          <Route path="/perfil" element={<Perfil />} />
          {/* Inglés */}
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/files" element={<Files />} />
          <Route path="/main" element={<Main />} />
          <Route path="/winners" element={<Winners />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}