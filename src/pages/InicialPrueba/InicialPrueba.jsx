import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./STYLE.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row, Image, Alert } from "react-bootstrap";

export const InicialPrueba = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const logout = () => {
    setUserAuth(false);
  };
  return (
    <>
      <header className="App-header">
        <Container className="ContainerIni">
          <form fluid="true" className="Form-Ini">
            <h1>Menú Inicial: </h1>
            {userAuth ? (
              <h3>¡Usted esta logueado!</h3>
            ) : (
              <h3>¡Usted no esta logueado!</h3>
            )}
            <button onClick={logout} className="Button-Login"><span class="box">Lagout</span></button>


            <nav className="secPagination">
              <ul className="ulPagination">
			  <a href="" className="aPagination">
                <li className="liPagination">
                  <Link to="/productos">Ver Productos</Link>
                </li>
				</a>
				<a href="" className="aPagination">
                <li className="liPagination">
                  <Link to="/registrarUsuario">Registrarme</Link>
                </li>
				</a>
				<a href="" className="aPagination">
                <li className="liPagination">
                  <Link to="/registrarProducto"> Registrar Producto</Link>
                </li>
				</a>
				<a href="" className="aPagination">
                <li className="liPagination">
                  <Link to="/login">Hacer Login</Link>
                </li>
				</a>
              </ul>
            </nav>
          </form>
        </Container>
      </header>
    </>
  );
};
