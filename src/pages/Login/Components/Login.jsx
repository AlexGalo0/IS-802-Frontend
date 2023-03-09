import { useForm } from "react-hook-form";
import { iniciarSesion } from "../../../api";
import "../styles/styleRegistroProductos.css";
import logo from "../../../assets/logoV2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row, Image , Alert } from "react-bootstrap";
import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [succesfullResponse, setSuccesfullResponse] = useState(false);
	const [requestError, setRequestError] = useState(false);

	const enviarDatosLogin = async (userData) => {
		
		try {
			const response = await iniciarSesion(userData);
			setRequestError(false)
			setSuccesfullResponse(true)
			
		} catch (error) {
			console.log(error);
			setSuccesfullResponse(false)
			setRequestError(true);
		}
	};

	return (
		<>
			<header className='App-header'>
				<Container className='ContainerProduct'>
					<form
						onSubmit={handleSubmit(enviarDatosLogin)}
						fluid='true'
						className='Form-Product'
					>
						<Row>
							<Col
								md
								style={{
									display: "flex",
									height: "50px",
									justifyContent: "space-between",
									alignItems: "center",
									paddingTop: "40px",
									paddingBottom: "10px",
								}}
							>
								<button
									className='Button-backProduct'
									type='submit'
									style={{
										marginTop: "-45px",
										paddingTop: "1px",
										marginLeft: "10px",
									}}
								>
									<BiLeftArrow />
								</button>
								<Image
									src={logo}
									style={{
										width: "110px",
										paddingRight: "10px",
										paddingTop: "20px",
									}}
								/>
							</Col>
						</Row>
						<h1
							style={{
								color: "#0d0d0d",
								textAlign: "left",
								marginLeft: "10px",
							}}
						>
							Inicia sesion
						</h1>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicNombre'
						>
							<input
								type='text'
								name='text'
								className='inNombre'
								{...register("correo", {
									required: true,
									maxLength: 50,
									pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
								})}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<MdOutlineAlternateEmail />
								Correo
							</Form.Label>
						</Form.Group>
						{errors.correo?.type === "required" && (
							<p className='FontAlert'>¡El campo correo es requerido!</p>
						)}
						{errors.correo?.type === "pattern" && (
							<p className='FontAlert'>¡Debes ingresar un correo valido!</p>
						)}

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicNombre'
						>
							<input
								type='password'
								name='password'
								className='inNombre'
								{...register("password", {
									required: true,
								})}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<RiLockPasswordLine />
								Contraseña
							</Form.Label>
						</Form.Group>
						{errors.password?.type === "required" && (
							<p className='FontAlert'>¡La contraseña es requerida!</p>
						)}
{
  requestError  ? <Alert variant="danger">No existe el usuario en la BDD</Alert> :''
}
{
  succesfullResponse ? <Alert variant="success">Se accedio de forma correcta</Alert> :''
}
						<div>
							<button className='Button-Login' type='submit'>
								Iniciar Sesion
							</button>
						</div>

						<ul style={{ paddingTop: "20px" }}>
							<Link to='/productos'>Ver Productos</Link>
						</ul>

						<ul style={{ paddingTop: "20px" }}>
							<Link to='/registrarProducto'>Registrar Producto</Link>
						</ul>

						<ul style={{ paddingTop: "20px" }}>
							<Link to='/registrarUsuario'>Registrar Usuario</Link>
						</ul>
					</form>
				</Container>
			</header>
		</>
	);
};
