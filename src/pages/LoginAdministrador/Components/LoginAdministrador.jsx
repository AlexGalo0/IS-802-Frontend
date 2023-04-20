import { useForm } from "react-hook-form";
import { iniciarSesionAdmin } from "../../../api";
import "../Style/LoginAdministrador.css";
import logo from "../../../assets/logoV2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row, Image, Alert } from "react-bootstrap";
import { BiLeftArrow } from "react-icons/bi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {  useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AdminContext } from "../../../context";

export const LoginAdministrador = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const { setAdminAuth } = useContext(AdminContext);

	const [succesfullResponse, setSuccesfullResponse] = useState(false);
	const [requestError, setRequestError] = useState(false);
	
	const enviarDatosLogin = async (userData) => {
		try {
			const response = await iniciarSesionAdmin(userData);
			setRequestError(false);
			setSuccesfullResponse(true);
			setAdminAuth(true);

			setTimeout(() => {
				navigate("/admin/crudCategorias");
			}, 1500);
		} catch (error) {
			console.log(error);
			setSuccesfullResponse(false);
			setRequestError(true);
		}
	};
	const handleRedirection = () => {
		navigate(-1);
	};

	return (
		<>
			<header className='App-header'>
				<Container className='Container'>
					<form
						onSubmit={handleSubmit(enviarDatosLogin)}
						fluid='true'
						className='Form'
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
									className='Button-backProductLogin'
									type='submit'
									onClick={handleRedirection}
									style={{
										marginTop: "-45px",
										paddingTop: "1px",
										marginLeft: "-10px",
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
										marginRight: "-20px",
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
							Administrador
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
						{requestError ? (
							<Alert variant='danger' style={{ margin: "auto" }}>
								¡No eres un administrador registrado!
							</Alert>
						) : (
							""
						)}
						{succesfullResponse ? (
							<Alert variant='success' style={{ margin: "auto" }}>
								¡Se accedió de forma correcta!
							</Alert>
						) : (
							""
						)}

						<div>
							<button className='Button-Login' type='submit'>
								<span className='boxLogin'>Iniciar sesión</span>
							</button>
						</div>
					</form>
				</Container>
			</header>
		</>
	);
};
