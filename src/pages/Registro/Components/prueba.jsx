import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas, Form, Image, Container, Row, Col } from "react-bootstrap";
import "../styles/prueba.css";
import { useRef, useState } from "react";
import { get, useForm } from "react-hook-form";
import { FiMenu } from "react-icons/fi";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import { comprobarEdad } from "../helpers";
import { createUser } from "../../../api";
import { Contrato } from "./UI";
import { useNavigate } from "react-router";
import primera from "../styles/1.png";
import logo from "../styles/logo.png";

export const PaginaPrincipal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <body className="body">
        <div className="top-header">
          <div className="top-header-right">
            <a href="">Facebook</a>
            <a href="">Instagram</a>
            <a href="">Twitter</a>
          </div>
        </div>

        <div className="navbar">
          <Image src={logo} className="image-logo" />
          <div className="buscador-div">
            <Form.Control
              className="buscador"
              type="text"
              style={{ paddingLeft: "8px", paddingRight: "8px" }}
            />
            <button className="button-buscar">
              <BiSearchAlt style={{ fontSize: "25" }} />
              Buscar
            </button>
          </div>

          <div className="botonLogin">
            <button
              className="button-login"
              style={{ color: "#f7f7f7", fontSize: "larger" }}
            >
              Inicia sesion o registrate{" "}
            </button>
          </div>
          <div className="cuenta">
            <BiUser />
          </div>
        </div>


        <div className="div-principal">
            <div style={{border: '1px solid black', width: '15%', height: '51px', display:'flex'}}> {/* Boton categorias */}
                <div className="section-header"><button onClick={handleShow} className="button-category">
                <FiMenu style={{ fontSize: "25", marginRight: "10px" }} />
                Categorias
              </button>

              <Offcanvas show={show} onHide={handleClose} className="canvas">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    <h2>Elija las categorias que desea ver</h2>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="Categoria 1"
                      label="Categoria 1"
                      className="check"
                    />
                    <Form.Check
                      type="switch"
                      label="Categoria 2"
                      id="Categoria 2"
                      className="check"
                    />
                    <Form.Check
                      type="switch"
                      id="Categoria 3"
                      label="Categoria 3"
                      className="check"
                    />
                    <Form.Check
                      type="switch"
                      label="Categoria 4"
                      id="Categoria 4"
                      className="check"
                    />
                    <Form.Check
                      type="switch"
                      id="Categoria 5"
                      label="Categoria 5"
                      className="check"
                    />
                    <Form.Check
                      type="switch"
                      label="Categoria 6"
                      id="Categoria 6"
                      className="check"
                    />
                  </Form>
                </Offcanvas.Body>
                <button className="button-buscar">
                  <BiSearchAlt style={{ fontSize: "25" }} />
                  Aplicar
                </button>
              </Offcanvas></div>
              <div className="section-lastProduct-tittle" style={{marginTop: '51px'}}><p>¡Productos nuevos!</p></div>{/* Titulo de nuevos productos */}
              <div className="section-lastProduct" style={{marginTop: '98px'}}><p>Hola</p></div> {/* Imagenes de productos */}
            </div>
            <div style={{width:'100%', border: '1px solid black'}}> 
                 <div style={{ height: '700px', width: '100%', border: '1px solid black'}}><Image src={primera} className="image" /></div>{/* Carrusel */}
                 <div className="div-imagenes"> {/* Primera linea de imagenes */}
                    <div style={{ height: '500px', width: '527px', border: '1px solid black'}}> <Image src={primera} className="image" /></div> 
                    <div style={{ height: '500px', width: '527px', border: '1px solid black'}}></div>
                    <div style={{ height: '500px', width: '527px', border: '1px solid black'}}></div>
                 </div>

                <div style={{ height: '250px', width: '100%', border: '1px solid black'}}></div>{/* Apartado de promociones */}

                 <div className="div-imagenes">{/* Segunda linea de imagenes */}
                    <div style={{ height: '500px', width: '527px', border: '1px solid black'}}> <Image src={primera} className="image" /></div> 
                    <div style={{ height: '500px', width: '527px', border: '1px solid black'}}></div>
                    <div style={{ height: '500px', width: '527px', border: '1px solid black'}}></div>
                 </div>

                 <div className="div-imagenes">{/* Tercera linea de imagenes */}
                    <div style={{ height: '500px', width: '527px', border: '1px solid black'}}> <Image src={primera} className="image" /></div> 
                    <div style={{ height: '500px', width: '527px', border: '1px solid black'}}></div>
                    <div style={{ height: '500px', width: '527px', border: '1px solid black'}}></div>
                 </div>
                 
                 <div style={{ height: '94px', width: '100%', border: '1px solid black'}}></div>{/* Apartado de pagination */}
            </div>
        </div>


        <footer>
          <div className="top-header-xd"></div>

          <div className="navbar-xd"></div>
        </footer>

        
      </body>
    </>
  );
};
