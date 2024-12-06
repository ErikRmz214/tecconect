import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FaCalendar, FaFolder, FaHome, FaTrophy, FaUser } from 'react-icons/fa';

// Importar pantallas
import Inicio from './screens/Inicio';
import Idioma from './screens/Idioma';
import Entrar from './screens/Entrar';
import Registro from './screens/Registro';
import Eventos from './screens/Eventos';
import Archivos from './screens/Archivos';
import Principal from './screens/Principal';
import Ganadores from './screens/Ganadores';
import Perfil from './screens/Perfil';

import Index from './screens/Index';
import Login from './screens/Login';
import Register from './screens/Register';
import Main from './screens/Main';
import Events from './screens/Events';
import Files from './screens/Files';
import Winners from './screens/Winners';
import Profile from './screens/Profile';

const TabNavigator = ({ language }) => {
  const labels = language === 'es'
    ? { events: 'Eventos', files: 'Archivos', main: 'Principal', winners: 'Ganadores', profile: 'Perfil' }
    : { events: 'Events', files: 'Files', main: 'Main', winners: 'Winners', profile: 'Profile' };

  return (
    <div className="tab-navigator">
      <nav>
        <ul>
          <li><FaCalendar /> {labels.events}</li>
          <li><FaFolder /> {labels.files}</li>
          <li><FaHome /> {labels.main}</li>
          <li><FaTrophy /> {labels.winners}</li>
          <li><FaUser /> {labels.profile}</li>
        </ul>
      </nav>
    </div>
  );
};

export default function App() {
  const [language, setLanguage] = useState('es'); // Estado para controlar el idioma

  const handleLanguageChange = (lang) => setLanguage(lang);

  return (
    <Router>
      <Routes>
        {/* Ruta de inicio */}
        <Route path="/" element={<Navigate to="/idioma" />} />

        {/* Ruta de selección de idioma */}
        <Route path="/idioma" element={<Idioma onLanguageChange={handleLanguageChange} />} />

        {/* Rutas dinámicas basadas en el idioma */}
        {language === 'es' ? (
          <>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/entrar" element={<Entrar />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/archivos" element={<Archivos />} />
            <Route path="/principal" element={<TabNavigator language="es" />} />
            <Route path="/ganadores" element={<Ganadores />} />
            <Route path="/perfil" element={<Perfil />} />
          </>
        ) : (
          <>
            <Route path="/index" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/files" element={<Files />} />
            <Route path="/main" element={<TabNavigator language="en" />} />
            <Route path="/winners" element={<Winners />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
