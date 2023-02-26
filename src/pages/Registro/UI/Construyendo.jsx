import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import "../style.css"
import whmcs from './whmcs.svg';


export const Construyendo = () => {
  return (
    <>
    <header className="App-header">
    <h1 style={{ color: "#FFF"}}>Construyendo... </h1>
    <img src={whmcs} className="App-logo" alt="logo" />
    <Button
        variant="secondary"
        type="submit"
        className="Buttom"
      >
        Regresar
      </Button>
    </header>
    </>
  )
}
