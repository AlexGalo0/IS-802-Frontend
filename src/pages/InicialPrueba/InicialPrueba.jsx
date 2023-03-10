import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./STYLE.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row, Image, Alert } from "react-bootstrap";

export const InicialPrueba = () => {
	const { userAuth, setUserAuth } = useContext(UserContext);

	const logout = () => {
		/* Desloguear al Usuario */
		setUserAuth(false);
	};
	return (
		<>
			<header className='App-header'>
				<Container className='ContainerIni'>
					<h1 style={{margin:'auto', paddingBottom:'10px'}}>Menú Inicial: </h1>
					{userAuth === true || userAuth === "true" ? (
						<h3 style={{margin:'auto'}}>¡Usted esta logueado!</h3>
					) : (
						<h3 style={{margin:'auto'}}>¡Usted no esta logueado!</h3>
					)}
					<button onClick={logout} className='Button-Login'>
						<span class='box'>Cerrar sesión</span>
					</button>
					<nav className='secPagination'>
						<ul className='ulPagination'>
							<li className='liPagination'>
								<Link style={{textDecoration:'none' , border:'1px solid #e211cc' , color:'white', padding:'10px'}} to='/productos'>Ver Productos</Link>
							</li>

							<li className='liPagination'>
								<Link style={{textDecoration:'none' , border:'1px solid #e211cc' , color:'white', padding:'10px'}} to='/registrarUsuario'>Registrarme</Link>
							</li>

							<li className='liPagination'>
								<Link style={{textDecoration:'none' , border:'1px solid #e211cc' , color:'white', padding:'10px'}} to='/registrarProducto'> Registrar Producto</Link>
							</li>

							<li className='liPagination'>
								<Link style={{textDecoration:'none' , border:'1px solid #e211cc' , color:'white', padding:'10px'}} to='/login'>Hacer Login</Link>
							</li>
						</ul>
					</nav>
				</Container>
			</header>
		</>
	);
};
