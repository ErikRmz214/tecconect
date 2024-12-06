import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.png"; // Importación de la imagen
import Guapos from "../images/Guapos.png"; // Importación de la imagen

function Principal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#fff' }}>
      {/* Imagen en la parte superior */}
      <Link to="/principal">
        <img
          src={Logo} // Usamos la importación de la imagen
          alt="Logo"
          style={{ width: '700px', height: '100px', marginBottom: '20px', marginTop: '40px', objectFit: 'contain' }}
        />
      </Link>

      {/* Mensaje de bienvenida debajo de la imagen */}
      <p style={{ fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}>
        ¡Bienvenido a TECCONECT!
      </p>

      {/* Descripción del proyecto */}
      <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px' }}>
        Este proyecto está diseñado para fomentar la participación de los estudiantes en Innovatec, con el objetivo de incentivar la innovación y el desarrollo de soluciones tecnológicas con impacto social.
      </p>
      
      {/* Lema adicional */}
      <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px' }}>
        Somos estudiantes que buscan la innovación y el cambio.
      </p>

      {/* Imagen debajo del texto */}
      <img
        src={Guapos} // Usamos la importación de la imagen
        alt="Imagen de Guapos"
        style={{ width: '300px', height: '200px', marginTop: '20px', objectFit: 'contain' }}
      />
    </div>
  );
}

export default Principal;
