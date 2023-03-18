import "bootstrap/dist/css/bootstrap.min.css";
import {
  Tooltip,
} from "react-bootstrap";
import "./styles/stFoo.css";
// import { get, useForm } from "react-hook-form";
// import { FiMenu } from "react-icons/fi";
import { FaCopyright } from "react-icons/fa";

export const Footers = () => {
  /* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Inicia sesion
    </Tooltip>
  );


  return (
    <>
      <footer>
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
                <button className="buttonFooter">Terminos y condiciones</button>
              </div>
              <div>
                <button className="buttonFooter">Sobre nosotros</button>
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
