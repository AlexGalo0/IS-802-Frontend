import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
export const InicialPrueba = () => {
	const { userAuth, setUserAuth } = useContext(UserContext);
	const logout = () => {
		setUserAuth(false);
	};
	return (
		<>
			<h1>Menú Inicial: </h1>
			{userAuth ? (
				<h3>Usted esta logueado!</h3>
			) : (
				<h3>Usted no esta logueado</h3>
			)}
			<button onClick={logout}>Logout</button>
			<nav>
				<ul>
					<li>
						<Link to='/productos'>Ver Productos</Link>
					</li>
					<li>
						<Link to='/registrarUsuario'>Registrarme</Link>
					</li>
					<li>
						<Link to='/registrarProducto'> Registrar Producto</Link>
					</li>
					<li>
						<Link to='/login'>Hacer Login</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};
