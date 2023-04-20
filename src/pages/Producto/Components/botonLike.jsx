import { useState } from "react";
import "./Boton.css";
import { AiFillHeart } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Boton() {
  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
  }

  /* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
  const renderTooltipButtomLike = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Agregar a lista de favoritos
    </Tooltip>
  );

  return (
    <div className="like">
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltipButtomLike}
      >
        <button className={active ? "active" : ""} onClick={handleClick}>
          {active ? (
            <AiFillHeart className="heart" />
          ) : (
            <AiFillHeart className="heart" />
          )}
        </button>
      </OverlayTrigger>
    </div>
  );
}