import { useForm } from "react-hook-form";
import { iniciarSesion } from "../../../api";
import "../../../style/styleForm.css";
import logo from "../../../assets/logoV2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row, Image, Alert } from "react-bootstrap";
import { BiLeftArrow, } from "react-icons/bi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import { useMutation } from "react-query";
export const UserLogin = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const {setUserAuth } = useContext(UserContext); //Borrar si no se quiere desloguear a usuario al ingresar al Login

	useEffect(() => {
		setUserAuth(false); //Borrar si no se quiere desloguear a usuario al ingresar al Login
	}, []);

	const mutationLogin = useMutation({
		mutationFn: iniciarSesion,
		onSuccess:()=>{
			setTimeout(()=>{
				navigate('/')
			},1000)
		}
		
	});

	const envioDatosLogin = (datosUsuario) => {
		mutationLogin.mutate({
			correo: datosUsuario.correo,
			password: datosUsuario.password,
		});
	};

	return (
		<>
			<header className='App-header'>
				<Container className='Container'>
					<form
						onSubmit={handleSubmit(envioDatosLogin)}
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
									className='Button-back'
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
							Inicia sesión
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

						{mutationLogin.isLoading ? (
							<p> Iniciando Sesión....</p>
						) : (
							<>
								{mutationLogin.isError ? (
									<Alert variant='danger'>¡No estás registrado!</Alert>
								) : null}

								{mutationLogin.isSuccess ? (
									<Alert variant='success'>
										¡Se accedió de forma correcta!
									</Alert>
								) : (
									""
								)}
							</>
						)}

						<div>
							<button className='Button' type='submit'>
								<span className='boxForm'>Iniciar sesión</span>
							</button>
						</div>
					</form>
				</Container>
			</header>
		</>
	);
};
