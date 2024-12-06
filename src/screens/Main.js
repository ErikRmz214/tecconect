import React from "react";
import { Link } from "react-router-dom"; // Usando React Router para la navegación
import { Image } from "react-bootstrap"; // Usando react-bootstrap para la imagen
import { Container, Row, Col } from "react-bootstrap"; // Para un layout responsivo con react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap en tu proyecto

import logo from "../images/Logo.png";
import guapos from "../images/Guapos.png";

function Main() {
  return (
    <Container style={{ backgroundColor: "#fff", padding: "20px" }}>
      <Row className="justify-content-center">
        {/* Imagen en la parte superior */}
        <Col>
          <Link to="/main">
            <Image
              src={logo}
              alt="Logo"
              style={{
                width: "700px",
                height: "100px",
                marginBottom: "20px",
                marginTop: "40px",
              }}
              fluid
            />
          </Link>
        </Col>
      </Row>

      {/* Mensaje de bienvenida debajo de la imagen */}
      <Row className="justify-content-center">
        <Col>
          <h2 style={{ fontSize: "18px", textAlign: "center", marginBottom: "20px" }}>
            Welcome to TECCONECT!
          </h2>
        </Col>
      </Row>

      {/* Descripción del proyecto */}
      <Row className="justify-content-center">
        <Col>
          <p style={{ fontSize: "16px", textAlign: "center", marginBottom: "20px" }}>
            This project is designed to encourage student participation in Innovatec, with the goal of fostering innovation and developing technological solutions with social impact.
          </p>
        </Col>
      </Row>

      {/* Lema adicional */}
      <Row className="justify-content-center">
        <Col>
          <p style={{ fontSize: "16px", textAlign: "center", marginBottom: "20px" }}>
            We are students seeking innovation and change.
          </p>
        </Col>
      </Row>

      {/* Imagen debajo del texto */}
      <Row className="justify-content-center">
        <Col>
          <Image
            src={guapos}
            alt="Additional Image"
            style={{ width: "300px", height: "200px", marginTop: "20px" }}
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
