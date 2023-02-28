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
	Modal,
} from "react-bootstrap";
import "../styles/style.css";
import { useRef, useState } from "react";
import { get, useForm } from "react-hook-form";
import { CiUser, CiCalendarDate } from "react-icons/ci";
import { IoMdPhonePortrait } from "react-icons/io";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import { BiLeftArrow } from "react-icons/bi";
import { comprobarEdad } from "../helpers";
import { createUser } from "../../../api";
import { Contrato } from "./UI";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";

export const Registro = () => {
	const navigate = useNavigate(); //Para redireccion
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
		setError,
		watch,
	} = useForm();
	

	const {isLoading,data:usuario,isError,error} = useQuery({
			queryKey:["registroUsuario"],
			queryFn:createUser
	})

	

	const enviarInfo = async (data) => {
		try {
			const response = await createUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleRedirection =()=>{
		navigate('/construyendo')
	}

	
	/* Manejo de Modal */
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	/* Para verificacion de los dos inputs de password */
	const password = useRef({});
	password.current = watch("password", "");

	return (
		<>
			<header className='App-header'>
				<Container className='Container'>
					<Form
						fluid='true'
						className='Form'
						onSubmit={handleSubmit(enviarInfo)}
					>
						<Row>
							<Col md style={{ display: "flex", paddingLeft: "0px" }}>
								<Button
									className='Buttom-back'
									variant='secondary'
									type='submit'
									onClick={handleRedirection}
								>
									<BiLeftArrow />
									Atrás
								</Button>
							</Col>
							<Col md style={{ paddingRight: "0px", textAlign: "end" }}>
								<h2>Logo</h2>
							</Col>
						</Row>
						<h1 style={{ color: "#0d0d0d", margin: "15px 0px auto" }}>
							Crea tu cuenta de: 504Marketplace
						</h1>

						<Row>
							<Col md>
								<Form.Group
									className='mb-3, FontMedium'
									controlId='formBasicNombre'
								>
									<Form.Label>
										<CiUser /> Nombre
									</Form.Label>
									<Form.Control
										className='Input'
										type='text'
										placeholder='Ingrese su nombre'
										{...register("nombre", {
											required: true,
											maxLength: 40,
											min: 3,
											pattern: /^[a-zA-Z]+$/,
										})}
									/>
									{/* Manejo de Errores de nombre */}
									{errors.nombre?.type === "required" && (
										<p className='FontAlert'>¡El campo nombre es requerido!</p>
									)}
									{errors.nombre?.type === "maxLength" && (
										<p className='FontAlert'>¡Tienes demasiados caracteres!</p>
									)}
									{errors.nombre?.type === "min" && (
										<p className='FontAlert'>¡Tienes muy pocos caracteres!</p>
									)}
									{errors.nombre?.type === "pattern" && (
										<p className='FontAlert'>
											¡Tu nombre solo deben ser caracteres!
										</p>
									)}
								</Form.Group>
							</Col>
							<Col md>
								<Form.Group
									className='mb-3, FontMedium'
									controlId='formBasicApellido'
								>
									<Form.Label>
										<CiUser /> Apellido
									</Form.Label>
									<Form.Control
										className='Input'
										type='text'
										placeholder='Ingrese su apellido'
										{...register("apellido", {
											required: true,
											maxLength: 10,
											min: 3,
											pattern: /^[a-zA-Z]+$/,
										})}
									/>
									{/* Manejo de Errores de apellido */}
									{errors.apellido?.type === "required" && (
										<p className='FontAlert'>
											¡El campo apellido es requerido!
										</p>
									)}
									{errors.apellido?.type === "maxLength" && (
										<p className='FontAlert'>¡Tienes demasiados caracteres!</p>
									)}
									{errors.apellido?.type === "min" && (
										<p className='FontAlert'>¡Tienes muy pocos caracteres!</p>
									)}
									{errors.apellido?.type === "pattern" && (
										<p className='FontAlert'>
											¡Tu apellido solo deben ser caracteres!
										</p>
									)}
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col md>
								<Form.Group
									className='mb-3, FontMedium'
									controlId='formBasicPhone'
								>
									<Form.Label>
										<IoMdPhonePortrait />
										Teléfono
									</Form.Label>
									<Form.Control
										className='Input'
										type='text'
										placeholder='Ingrese su teléfono celular'
										{...register("telefono", {
											required: true,
											maxLength: 9,
											pattern: /^\d{4}-\d{4}$/,
										})}
									/>
									{/* Manejo de Errores de Telefono */}
									{errors.telefono?.type === "required" && (
										<p className='FontAlert'>
											¡El campo teléfono es requerido!
										</p>
									)}
									{errors.telefono?.type === "maxLength" && (
										<p className='FontAlert'>¡Tienes demasiados números!</p>
									)}
									{errors.telefono?.type === "pattern" && (
										<p className='FontAlert'>
											El formato es el siguiente: XXXX-XXXX , solo números!
										</p>
									)}
								</Form.Group>
							</Col>
							<Col md>
								<Form.Group
									className='mb-3, FontMedium'
									controlId='formBasicDate'
								>
									<Form.Label>
										<CiCalendarDate />
										Fecha de nacimiento
									</Form.Label>
									<Form.Control
										className='Input'
										type='date'
										placeholder='Ingrese su fecha de nacimiento'
										{...register("fechaNacimiento", { required: true , validate:comprobarEdad })}
									/>
									{/* Manejo de Errores de Nacimiento */}
									{errors.fechaNacimiento?.type === "required" && (
										<p className='FontAlert'>
											¡La fecha de nacimiento es requerida!
										</p>
									)}
									{errors.fechaNacimiento?.type === "validate" && (
										<p className='FontAlert'>
											¡Debes ser mayor de 18!
										</p>
									)}
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className='mb-3, FontMedium' controlId='formBasicDNI'>
							<Form.Label>
								<HiOutlineIdentification />
								DNI
							</Form.Label>
							<Form.Control
								className='Input'
								type='text'
								placeholder='Ingrese su DNI'
								{...register("dni", {
									required: true,
									maxLength: 15,
									pattern: /^(0[1-9]|1[0-8])\d{2}-\d{4}-\d{5}/,
								})}
							/>
							{/* Manejo de Errores de DNI */}
							{errors.dni?.type === "required" && (
								<p className='FontAlert'>¡El campo DNI es requerido!</p>
							)}
							{errors.dni?.type === "maxLength" && (
								<p className='FontAlert'>¡Tienes demasiados caracteres!</p>
							)}
							{errors.dni?.type === "pattern" && (
								<p className='FontAlert'>
									El formato es el siguiente : XXXX-XXXX-XXXXX
								</p>
							)}
						</Form.Group>

						<Form.Group className='mb-3, FontMedium' controlId='formBasicEmail'>
							<Form.Label>
								<MdOutlineAlternateEmail />
								Correo
							</Form.Label>
							<Form.Control
								className='Input'
								type='email'
								placeholder='Ingrese su correo electrónico'
								{...register("correo", {
									required: true,
									maxLength: 50,
									pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
								})}
							/>
							{errors.correo?.type === "required" && (
								<p className='FontAlert'>¡El campo correo es requerido!</p>
							)}
							{errors.correo?.type === "pattern" && (
								<p className='FontAlert'>¡Debes ingresar un correo valido!</p>
							)}

							<Form.Text className='text-muted, FontLight'>
								¡Nunca compartiremos tu correo electrónico!
							</Form.Text>
						</Form.Group>

						<Row>
							<Col md>
								<Form.Group
									className='mb-3, FontMedium'
									controlId='formBasicPassword'
								>
									<Form.Label>
										<RiLockPasswordLine />
										Contraseña
									</Form.Label>
									<Form.Control
										className='Input'
										type='password'
										placeholder='Ingrese su contraseña'
										{...register("password", { required: true, minLength: 8  , pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/
									})}
									/>
									{/* Manejo de Errores de Password */}
									{errors.password?.type === "required" && (
										<p className='FontAlert'>¡La contraseña es requerida!</p>
									)}
									{errors.password?.type === "minLength" && (
										<p className='FontAlert'>¡Tienes muy pocos caracteres!</p>
									)}
									{errors.password?.type === "pattern" && (
										<p className='FontAlert'>Debes tener por lo menos una mayuscula , caracter y numero</p>
									)}
								</Form.Group>
							</Col>

							<Col md>
								<Form.Group
									className='mb-3, FontMedium'
									controlId='formBasicConfirmPassword'
								>
									<Form.Label>
										<RiLockPasswordLine />
										Confirmar contraseña
									</Form.Label>
									<Form.Control
										className='Input'
										type='password'
										placeholder='Ingrese su contraseña'
										{...register("confirmPassword", {
											required: true,
											min: 8,
											validate: (value) => value === password.current,
										})}
									/>
									{/* Manejo de Errores de Confirmacion de Contraseña */}
									{errors.confirmPassword?.type === "required" && (
										<p className='FontAlert'>¡la contraseña es requerida!</p>
									)}
									{errors.confirmPassword?.type === "maxLength" && (
										<p className='FontAlert'>¡Tiene demasiados caracteres!</p>
									)}
									{errors.confirmPassword?.type === "min" && (
										<p className='FontAlert'>¡Tiene muy pocos caracteres!</p>
									)}
								</Form.Group>
							</Col>
						</Row>
						{errors.confirmPassword && <p>¡Las contraseñas no coinciden!</p>}
						<Form.Label className='FontMedium'>
							<GoLocation />
							Elige tu departamento
						</Form.Label>
						<Form.Select
							className='Input'
							aria-label='Departamentos'
							{...register("departamentos", { required: true })}
						>
							<option placeholder='Seleccione un departamento'></option>
							<option value='1'>Atlántida</option>
							<option value='2'>Colón</option>
							<option value='3'>Comayagua</option>
							<option value='4'>Copán</option>
							<option value='5'>Cortés</option>
							<option value='6'>Choluteca</option>
							<option value='7'>El Paraíso</option>
							<option value='8'>Francisco Morazán</option>
							<option value='9'>Gracias a Dios</option>
							<option value='10'>Intibucá</option>
							<option value='11'>Islas de la Bahía</option>
							<option value='12'>La Paz</option>
							<option value='13'>Lempira</option>
							<option value='14'>Ocotepeque</option>
							<option value='15'>Olancho</option>
							<option value='16'>Santa Bárbara</option>
							<option value='17'>Valle</option>
							<option value='18'>Yoro</option>
						</Form.Select>
						{errors.departamentos?.type === "required" && (
							<p className='FontAlert'>¡El campo departamentos es requerido!</p>
						)}

						<Row style={{ marginLeft: "-70px" }}>
							<Col md style={{ textAlign: "end", paddingRight: "0px" }}>
								<Form.Group
									className='mb-3, FontMedium'
									controlId='formBasicCheckbox'
									style={{ paddingRight: "1px" }}
								>
									<Form.Check
										type='checkbox'
										label='Aceptas los'
										{...register("contrato", { required: true })}
									/>
								</Form.Group>
							</Col>
							<Col md style={{ display: "flex", paddingLeft: "0px" }}>
								<Button
									className='Buttom-Link'
									variant='link'
									onClick={handleShow}
								>
									términos y condiciones
								</Button>
							</Col>
						</Row>

						{errors.contrato?.type === "required" && (
							<p>¡Debes de aceptar todos los términos y condiciones!</p>
						)}
						{/* Modal de Terminos y Condiciones */}
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton style={{ border: "3px solid #E211CC" }}>
								<Modal.Title style={{ textAlign: "center" }}>
									<h2>Términos y Condiciones de 504Marketplace</h2>
								</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ border: "3px solid #E211CC" }}>
								<Contrato />
							</Modal.Body>
							<Modal.Footer style={{ border: "3px solid #E211CC" }}>
								<Button
									className='Buttom-close'
									variant='secondary'
									onClick={handleClose}
								>
									Cerrar
								</Button>
							</Modal.Footer>
						</Modal>

						<Button className='Buttom' variant='secondary' type='submit'>
							Crear cuenta
						</Button>
					</Form>
				</Container>
			</header>
		</>
	);
};
