import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LogoImage from './images/Logo.png'; // Ajusta la ruta según la ubicación de tu imagen


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

// Estilos en línea integrados
const styles = {
  navbar: {
    backgroundColor: '#343a40',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ff9800',
  },
  menuToggle: {
    fontSize: '1.5rem',
    color: 'white',
    cursor: 'pointer',
    display: 'none', // Se oculta por defecto
  },
  navbarLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    margin: 0,
    padding: 0,
  },
  navbarLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'color 0.3s ease',
  },
  navbarLinkHover: {
    color: '#ff9800',
  },
  activeLink: {
    borderBottom: '2px solid #ff9800',
  },
  navbarLinksMobile: {
    flexDirection: 'column',
    backgroundColor: '#343a40',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    padding: '1rem',
    display: 'none',
  },
  showMenu: {
    display: 'flex',
  },
  // Responsividad
  '@media (max-width: 768px)': {
    menuToggle: {
      display: 'block', // Se muestra en pantallas pequeñas
    },
    navbarLinks: {
      display: 'none', // Se ocultan los enlaces en pantallas pequeñas
    },
    navbarLinksMobile: {
      display: 'flex', // Se muestran los enlaces cuando el menú está abierto
    },
  },
};

// Navbar componente base
function Navbar({ links, logo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav style={styles.navbar}>
      <span style={styles.logo}>{logo}</span>
      <span style={styles.menuToggle} onClick={toggleMenu}>
        ☰
      </span>
      <ul
        style={{
          ...styles.navbarLinks,
          ...(menuOpen ? styles.showMenu : {}),
          ...(menuOpen ? styles.navbarLinksMobile : {}),
        }}
      >
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              style={styles.navbarLink}
              className={({ isActive }) =>
                isActive ? styles.activeLink : undefined
              }
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Navbar en Español
function NavbarEs() {
  const links = [
    { to: '/principal', label: 'Principal' },
    { to: '/eventos', label: 'Eventos' },
    { to: '/archivos', label: 'Archivos' },
    { to: '/ganadores', label: 'Ganadores' },
    { to: '/perfil', label: 'Perfil' },
  ];
  return <Navbar links={links} logo={<img src={LogoImage} alt="TECCONECT Logo" className="logo-image" />} />;
}


// Navbar en Inglés
function NavbarEn() {
  const links = [
    { to: '/main', label: 'Main' },
    { to: '/events', label: 'Events' },
    { to: '/files', label: 'Files' },
    { to: '/winners', label: 'Winners' },
    { to: '/profile', label: 'Profile' },
  ];
  return <Navbar links={links} logo={<img src={LogoImage} alt="TECCONECT Logo" className="logo-image" />} />;
}


// Navegación condicional
function Navigation() {
  const location = useLocation();
  const spanishRoutes = ['/principal', '/eventos', '/archivos', '/perfil', '/ganadores'];
  const englishRoutes = ['/main', '/events', '/files', '/profile', '/winners'];

  if (spanishRoutes.includes(location.pathname)) {
    return <NavbarEs />;
  }

  if (englishRoutes.includes(location.pathname)) {
    return <NavbarEn />;
  }

  return null;
}

// Componente principal de la aplicación
export default function App() {
  return (
    <Router>
      <div>
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
