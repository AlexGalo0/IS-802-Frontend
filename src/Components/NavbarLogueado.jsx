import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Image,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import "./styles/stNav.css";
// import { get, useForm } from "react-hook-form";
// import { FiMenu } from "react-icons/fi";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import logo from "../assets/logo.png";
import { BsFacebook, BsInstagram, BsDiscord } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaBoxes, FaStar, FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { FiltroPalabrasClave } from "../pages/Principal/Components/Filtros/FiltroPalabrasClave";

export const NavbarsLogueado = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const pruebaDesloguear = () => {
    setUserAuth(false);
  };

  /* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Perfil
    </Tooltip>
  );

  const renderTooltipLike = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Lista de favoritos
    </Tooltip>
  );

  const renderTooltipMessaje = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Mensajeria
    </Tooltip>
  );

  /* Elentos del perfil */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* Funcion para que las pantallas aparezcan al inicio */
	function scrollToTop() {
		window.scrollTo(0, 0);
	  }

  return (
    <>
      <div className="top-header">
        <div>
          <span className="letterHeader">
            ¿Ya sigues nuestras redes sociales?
          </span>
        </div>

        <div>
          <span className="letterLightHeader">
            Si quieres mantenerte informado de todas las novedades y
            promociones, no olvides visitar nuestras redes sociales.......
          </span>
        </div>

        <div>
          <ul className="ulRedes">
            <Link
              to="https://www.facebook.com/"
              style={{ textDecoration: "none" }}
            >
              <li className="liRedes">
                <span className="redes">
                  <BsFacebook className="i" />
                </span>
                <span className="titulo">Facebook</span>
              </li>
            </Link>
            {/* <li className="liRedes">
              <span className="redes">
                <BsTwitter className="i" />
              </span>
              <span className="titulo">twitter</span>
            </li> */}
            <Link
              to="https://www.instagram.com/"
              style={{ textDecoration: "none" }}
            >
              <li className="liRedes">
                <span className="redes">
                  <BsInstagram className="i" />
                </span>
                <span className="titulo">instagram</span>
              </li>
            </Link>
            <Link to="https://discord.com/" style={{ textDecoration: "none" }}>
              <li className="liRedes">
                <span className="redes">
                  <BsDiscord className="i" />
                </span>
                <span className="titulo">discord</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>

      {/* Navbar */}
      <div className="navbar">
        <Image src={logo} className="image-logo" />
        <div className="buscador-div2" /* style={{display:"none"}} */>
          {/* <Form.Control className="buscador" type="text"  />
          <button className="btnBuscar">
            <BiSearchAlt className="iconBuscar" />
            <span className="textBuscar">Buscar</span>
          </button> */}
        </div>

        <div style={{ display: "flex", margin: "auto" }}>
          <Link to="/registrarProducto" style={{ textDecoration: "none" }}>
            <button className="btnregis" style={{ width: "250px" }}>
              <span className="textBuscar" onClick={() => { scrollToTop()}}>Agregar producto </span>
            </button>
          </Link>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltipMessaje}
          >
            <Link to="/construyendo">
              <button className="button-cuenta" onClick={() => { scrollToTop()}}>
                <AiOutlineMessage />
              </button>
            </Link>
          </OverlayTrigger>

          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltipLike}
          >
            <Link to="/favoritos">
              <button className="button-cuenta" onClick={() => { scrollToTop()}}>
                <AiOutlineHeart />
              </button>
            </Link>
          </OverlayTrigger>

          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <button className="button-cuenta" onClick={() => { scrollToTop(), handleShow()}}>
              <BiUser />
            </button>

            {/* <Offcanvas show={show} onHide={handleClose} className="canvas">
                <Form className="formCategory">
                  <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>
                      <p
                        style={{
                          color: "#f7f7f7",
                          textAlign: "left",
                          marginLeft: "-5px",
                          marginRight: "10px",
                          fontSize: "26px",
                          fontWeight: "400",
                          marginBottom: "-55px",
                          marginTop: "-20px",
                        }}
                      >
                        Categorias a mostrar:
                      </p>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  </Form>
              </Offcanvas> */}

            {/* <Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                  Opciones
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='d-flex flex-column'>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <h3>Hola, Alex</h3>

                  <Nav.Link href="#action1"> Mis productos</Nav.Link>
                  <Nav.Link href="#action2"><FaBoxes /> Productos favoritos</Nav.Link>
                  <Nav.Link href="#action3"><FaStar /> Mi calificacion</Nav.Link>
                </Nav>

                <Nav>
                  <Nav.Link href="#action4"><MdLogout /> Cerrar sesión</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas> */}
          </OverlayTrigger>

          {
            <Offcanvas
              show={show}
              onHide={handleClose}
              className="canvas"
              placement="end"
              bsPrefix="offcanvas"
            >
              <Form className="formCategory">
                <Offcanvas.Header closeButton closeVariant="white">
                  <Offcanvas.Title>
                    <p
                      style={{
                        color: "#f7f7f7",
                        textAlign: "left",
                        marginLeft: "-5px",
                        marginRight: "10px",
                        fontSize: "26px",
                        fontWeight: "400",
                        marginBottom: "-55px",
                        marginTop: "-20px",
                      }}
                    >
                      Perfil de usuario:
                    </p>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div style={{gap: '10px', display: 'flex', flexDirection: 'column'}}>
                    <Link to="/misProductos" style={{ textDecoration: "none" }}>
                      <button className="buttonCerrarSesion">
                        Mis productos
                      </button>
                    </Link>

                    <button
                      onClick={pruebaDesloguear}
                      className="buttonCerrarSesion"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </Offcanvas.Body>
              </Form>
            </Offcanvas>
          }
        </div>
      </div>
    </>
  );
};