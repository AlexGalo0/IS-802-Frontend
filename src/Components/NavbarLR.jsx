import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "./styles/stNav.css";
// import { get, useForm } from "react-hook-form";
// import { FiMenu } from "react-icons/fi";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import logo from "../assets/logo.png";
import { BsFacebook, BsInstagram, BsDiscord } from "react-icons/bs";

export const NavbarsLR = () => {
  /* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Inicia sesion
    </Tooltip>
  );


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
            <li className="liRedes">
              <span className="redes">
                <BsFacebook className="i" />
              </span>
              <span className="titulo">Facebook</span>
            </li>
            {/* <li className="liRedes">
              <span className="redes">
                <BsTwitter className="i" />
              </span>
              <span className="titulo">twitter</span>
            </li> */}
            <li className="liRedes">
              <span className="redes">
                <BsInstagram className="i" />
              </span>
              <span className="titulo">instagram</span>
            </li>
            <li className="liRedes">
              <span className="redes">
                <BsDiscord className="i" />
              </span>
              <span className="titulo">discord</span>
            </li>
          </ul>
        </div>
      </div>

            {/* Navbar */}
      <div className="navbar">
        <Image src={logo} className="image-logo" />
        <div className="buscador-div">
          <Form.Control className="buscador" type="text" />
          <button className="btnBuscar">
            <BiSearchAlt className="iconBuscar" />
            <span className="textBuscar">Buscar</span>
          </button>
        </div>

        <div>
          <button className="regis">Inicia sesion</button>
          <button className="regis">Registrate</button>
        </div>
        <div>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <button className="button-cuenta">
              <BiUser />
            </button>
          </OverlayTrigger>
        </div>
      </div>
    </>
  );
};
