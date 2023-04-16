import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Image, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import "./styles/stNav.css";
// import { get, useForm } from "react-hook-form";
// import { FiMenu } from "react-icons/fi";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import logo from "../assets/logo.png";
import { BsFacebook, BsInstagram, BsDiscord } from "react-icons/bs";
import { Link } from "react-router-dom";

import { useState } from "react";

export const NavbarsLR = () => {
  /* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Perfil
    </Tooltip>
  );

  /* Funcion para que las pantallas aparezcan al inicio */
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  const handleReiniciarBorrar = () => {
    handleCloseBorrarModal();
  };

  const [showBorrarModal, setShowBorrarModal] = useState(false);
  const handleShowBorrarModal = () => setShowBorrarModal(true);
  const handleCloseBorrarModal = () => setShowBorrarModal(false);

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
        <Link to="/">
          <Image src={logo} className="image-logo" />
        </Link>
        <div /* className="buscador-div" */>
          {/* <Form.Control className="buscador" type="text" />
          <button className="btnBuscar">
            <BiSearchAlt className="iconBuscar" />
            <span className="textBuscar">Buscar</span>
          </button> */}
        </div>

        <div style={{ marginLeft: "-100px", display: "flex", margin: "auto" }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="btnregis" style={{ width: "300px" }}>
              {" "}
              <span
                className="textBuscar"
                onClick={() => {
                  scrollToTop();
                }}
              >
                Inicia sesión
              </span>
            </button>
          </Link>
        </div>

        <div style={{ marginLeft: "-100px", display: "flex", margin: "auto" }}>
          <Link to="/registrarUsuario" style={{ textDecoration: "none" }}>
            <button
              className="btnregis"
              onClick={() => {
                scrollToTop();
              }}
              style={{ width: "300px" }}
            >
              Registrate
            </button>
          </Link>
        </div>
        <div /* className="trampa" */>
          {/* <Form.Control className="buscador" type="text" />
          <button className="btnBuscar">
            <BiSearchAlt className="iconBuscar" />
            <span className="textBuscar">Buscar</span>
          </button> */}
        </div>
        <div>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <button
              className="button-cuenta"
              onClick={() => {
                handleShowBorrarModal(true);
              }}
            >
              <BiUser />
            </button>
          </OverlayTrigger>
        </div>
      </div>

      <Modal
        show={showBorrarModal}
        onHide={handleCloseBorrarModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title
            style={{ fontSize: "25px", margin: "auto" }}
          >{`¡Debes iniciar sesión!`}</Modal.Title>
        </Modal.Header>

        {/* {mostrarAlert ? (
					<Alert variant='success'>¡Categoría eliminada!</Alert>
				) : (
					""
				)} */}
        <Modal.Footer style={{ margin: "auto", display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{display: 'flex', gap: '10px'}}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button
              className="buttonGuardar" /* 
						disabled={disableButton} */
            >
              Iniciar sesión
            </button>
          </Link>
          <Link to="/registrarUsuario" style={{ textDecoration: "none" }}>
            <button
              className="buttonGuardar"
              onClick={() => {
                scrollToTop();
              }}
            >
              ¡No tengo una cuenta!
            </button>
          </Link>
          </div>
          <button className="buttonAdmin" onClick={handleReiniciarBorrar}>
          ¡Despues!
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
