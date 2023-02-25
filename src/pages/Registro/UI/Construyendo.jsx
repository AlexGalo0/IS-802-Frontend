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
import "../Style.css"
import whmcs from './whmcs.svg';


export const Construyendo = () => {
  return (
    <>
    <header className="App-header">
    <h2 style={{ color: "#59362E"}}>Construyendo... </h2>
    <img src={whmcs} className="App-logo" alt="logo" />
    <Button
        variant="primary"
        type="submit"
        style={{
          background: "#A67356",
          border: "#F2E8DF",
          boxShadow: "5px 5px 1px 1px rgba(32,32,32,0.3)",
        }}
      >
        Regresar
      </Button>
    </header>
    </>
  )
}
