import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip, Modal } from "react-bootstrap";
import "./styles/stFoo.css";
// import { get, useForm } from "react-hook-form";
// import { FiMenu } from "react-icons/fi";
import { FaCopyright } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Contrato } from "../pages/RegistroUsuario/Components/Contrato";
import { Link } from "react-router-dom";

export const Footers = () => {
  /* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Inicia sesion
    </Tooltip>
  );

  /* Manejo de Modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <footer style={{position: "relative"}}>
        <div className="top-footer">
          <span className="letterLightFooter">
            Los principales distribuidores y grandes vendedores trabajan con{" "}
            <span style={{ color: "#153B4B" }}>Market</span>
            <span style={{ color: "#416b7a" }}>Place</span>504
          </span>
        </div>

        <div className="navbar-footer">
          <div
            style={{
              display: "flex",
              gap: "25px",
              fontSize: "larger",
              marginBottom: "5px",
            }}
          >
            <div>
              <button className="buttonFooter" onClick={handleShow}>
              Términos y condiciones
              </button>

              {/* Modal de Terminos y Condiciones */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header
                  closeButton
                  style={{ border: "3px solid #75E8E5" }}
                >
                  <Modal.Title style={{ textAlign: "center" }}>
                    <h2>Términos y Condiciones de Marketplace504</h2>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ border: "3px solid #75E8E5" }}>
                  <Contrato />
                </Modal.Body>
                <Modal.Footer style={{ border: "3px solid #75E8E5" }}>
                  <button className="Button-close" onClick={handleClose}>
                    Cerrar
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
            <div>
              
        <Link to='/construyendo'>
              <button className="buttonFooter">Sobre nosotros</button></Link>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaCopyright
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            2023 MarketPlace504.hn
          </div>
        </div>
      </footer>
    </>
  );
};
