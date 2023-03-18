import "bootstrap/dist/css/bootstrap.min.css";
import {
	Col,
	Container,
	Form,
	Row,
	Image,
	Modal,
	Alert,
} from "react-bootstrap";
import "../../../style/styleForm.css";
import { useEffect, useRef, useState } from "react";
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
import { Contrato } from "./Contrato";
import { useNavigate } from "react-router";
import logo from "../../../assets/logoV2.png";

export const RegistroUsuario = () => {
	const navigate = useNavigate(); //Para redireccion
	const {
		register,
		formState: { errors, isSubmitSuccessful  },
		handleSubmit,
		getValues,
		setError,
		watch,
		reset,
	} = useForm();

	const [succesfullResponse, setSuccesfullResponse] = useState(false);
	const [existenAmbosDNI, setExistenAmbosDNI] = useState()
	const enviarInfo = async (data) => {
		if(!data.dniExtranjero && !data.dniHondurenio) {
			setExistenAmbosDNI(true)
			return ; 
		} else {
			setExistenAmbosDNI(false)
		}
		try {
			const response = await createUser(data);
			setTimeout(() => {
				navigate("/login");
			}, 2500);
			setSuccesfullResponse(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleRedirection = () => {
		navigate("/");
	};

	/* Manejo de Modal */
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	/* Para verificacion de los dos inputs de password */
	const password = useRef({});
	password.current = watch("password", "");

	// useEffect(() => {
	// 	reset();
	// }, [isSubmitSuccessful]);

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
										marginLeft: "2px",
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
										marginRight: '-8px'
									}}
								/>
							</Col>
						</Row>
						<h1 style={{ color: "#0d0d0d", textAlign: "left", 
								marginLeft: "10px" }}>
							Crea tu cuenta
						</h1>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicNombre'
						>
							<input
								name='text'
								className='inNombre'
								type='text'
								{...register("nombre", {
									required: true,
									maxLength: 40,
									minLength: 2,
									pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
								})}
							/>
							<Form.Label htmlFor='' className='user-label-regis'>
								<CiUser /> Nombre
							</Form.Label>
							{/* Manejo de Errores de nombre */}
							{errors.nombre?.type === "required" && (
								<p className='FontAlert'>¡El campo nombre es requerido!</p>
							)}
							{errors.nombre?.type === "maxLength" && (
								<p className='FontAlert'>¡Tienes demasiados caracteres!</p>
							)}
							{errors.nombre?.type === "minLength" && (
								<p className='FontAlert'>¡Tienes muy pocos caracteres!</p>
							)}
							{errors.nombre?.type === "pattern" && (
								<p className='FontAlert'>¡Tu nombre solo deben ser letras!</p>
							)}
						</Form.Group>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicApellido'
						>
							<input
								name='text'
								className='inNombre'
								type='text'
								{...register("apellido", {
									required: true,
									maxLength: 40,
									minLength: 3,
									pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
								})}
							/>
							<Form.Label htmlFor='' className='user-label-regis'>
								<CiUser /> Apellido
							</Form.Label>
							{/* Manejo de Errores de apellido */}
							{errors.apellido?.type === "required" && (
								<p className='FontAlert'>¡El campo apellido es requerido!</p>
							)}
							{errors.apellido?.type === "maxLength" && (
								<p className='FontAlert'>¡Tienes demasiados caracteres!</p>
							)}
							{errors.apellido?.type === "minLength" && (
								<p className='FontAlert'>¡Tienes muy pocos caracteres!</p>
							)}
							{errors.apellido?.type === "pattern" && (
								<p className='FontAlert'>¡Tu apellido solo deben ser letras!</p>
							)}
						</Form.Group>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicPhone'
						>
							<input
								name='text'
								className='inNombre'
								type='text'
								{...register("telefono", {
									required: true,
									maxLength: 9,
									pattern: /^\d{4}-\d{4}$/,
								})}
							/>
							<Form.Label htmlFor='' className='user-label-regis'>
								<IoMdPhonePortrait />
								Teléfono
							</Form.Label>
							{/* Manejo de Errores de Telefono */}
							{errors.telefono?.type === "required" && (
								<p className='FontAlert'>¡El campo teléfono es requerido!</p>
							)}
							{errors.telefono?.type === "maxLength" && (
								<p className='FontAlert'>¡Tienes demasiados números!</p>
							)}
							{errors.telefono?.type === "pattern" && (
								<p className='FontAlert'>
									El formato es el siguiente: XXXX-XXXX ¡Solo números!
								</p>
							)}
						</Form.Group>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicDate'
						>
							<input
								name='date'
								className='inNombre'
								type='date'
								{...register("fechaNacimiento", {
									required: true,
									validate: comprobarEdad,
								})}
							/>
							<Form.Label htmlFor='' className='user-label-regis'>
								<CiCalendarDate />
								Fecha de nacimiento
							</Form.Label>
							{/* Manejo de Errores de Nacimiento */}
							{errors.fechaNacimiento?.type === "required" && (
								<p className='FontAlert'>
									¡La fecha de nacimiento es requerida!
								</p>
							)}
							{errors.fechaNacimiento?.type === "validate" && (
								<p className='FontAlert'>¡Ingresa una fecha valida!</p>
							)}
						</Form.Group>

						{/* Solo mostrar un checkbox */}
						{!watch("esHondurenio") && (
							<Col md>
								<Form.Group
									className='mb-3'
									controlId='formBasicCheckboxHondurenio'
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Form.Check
										type='checkbox'
										style={{ marginTop: "10px" }}
										label='¿Eres Extranjero?'
										name='checkExtranjero'
										{...register("esExtranjero", {})}
									/>
								</Form.Group>
							</Col>
						)}

						{!watch("esExtranjero") && (
							<Col md style={{ marginBottom: "-10px" }}>
								<Form.Group
									className='mb-3'
									controlId='formBasicCheckboxExtranjero'
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Form.Check
										type='checkbox'
										label='¿Eres Hondureño?'
										name='checkHondurenio'
										{...register("esHondurenio")}
									/>
								</Form.Group>
							</Col>
						)}

						{watch("esHondurenio") && (
							<Col
								md
								style={{
									display: "grid",
									placeContent: "center",
								}}
							>
								<Form.Group
									style={{ position: "relative" }}
									controlId='formBasicDNI'
								>
									<input
										name='number'
										className='inNombre'
										type='text'
										{...register("dniHondurenio", {
											required: true,
											maxLength: 15,
											pattern: /^(0[1-9]|1[0-8])[0-9]{2}-[0-9]{4}-[0-9]{5}$/,
										})}
									/>
									<Form.Label htmlFor='' className='labelCheck'>
										<HiOutlineIdentification />
										DNI Hondureño
									</Form.Label>
								</Form.Group>
							</Col>
						)}

						{watch("esExtranjero") && (
							<Col
								md
								style={{
									display: "grid",
									placeContent: "center",
								}}
							>
								<Form.Group
									style={{ position: "relative" }}
									controlId='formBasicDNI'
								>
									<input
										name='number'
										className='inNombre'
										type='text'
										{...register("dniExtranjero", {
											required: true,
											maxLength: 20,
										})}
									/>
									<Form.Label htmlFor='' className='labelCheck'>
										<HiOutlineIdentification />
										DNI Extranjero
									</Form.Label>
								</Form.Group>
							</Col>
						)}

						{errors.dniExtranjero?.type === "required" && errors.dniHondurenio?.type==="required" (
							// <p className='FontAlert'>Necesitamos al menos un DNI!</p>
						)}

						{errors.dniExtranjero?.type === "maxLength" && (
							<p className='maxLength'>
								El DNI Extranjero no debe exceder 20 caracteres!
							</p>
						)}

						

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicEmail'
						>
							<input
								name='email'
								className='inNombre'
								type='email'
								{...register("correo", {
									required: true,
									maxLength: 50,
									pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
								})}
							/>
							<Form.Label htmlFor='' className='user-label-regis'>
								<MdOutlineAlternateEmail />
								Correo
							</Form.Label>
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

						<label htmlFor=''>
							La contraseña debe estar construida por minimo 8 caracteres, un
							signo especial , una mayuscula y un numero.
						</label>
						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicPassword'
						>
							<input
								name='password'
								className='inNombre'
								type='password'
								{...register("password", {
									required: true,
									minLength: 8,
									pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
								})}
							/>
							<Form.Label htmlFor='' className='user-label-regis'>
								<RiLockPasswordLine />
								Contraseña
							</Form.Label>

							{/* Manejo de Errores de Password */}
							{errors.password?.type === "required" && (
								<p className='FontAlert'>¡La contraseña es requerida!</p>
							)}
							{errors.password?.type === "minLength" && (
								<p className='FontAlert'>¡Tienes muy pocos caracteres!</p>
							)}
							{errors.password?.type === "pattern" && (
								<p className='FontAlert'>
									¡Debes tener por lo menos una mayúscula, un carácter especial
									y un número!{" "}
								</p>
							)}
						</Form.Group>
						{
							existenAmbosDNI ? <p>Debes enviar por lo menos un DNI</p> : ''
						}

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicConfirmPassword'
						>
							<input
								name='password'
								className='inNombre'
								type='password'
								{...register("confirmPassword", {
									required: true,
									min: 8,
									validate: (value) => value === password.current,
								})}
							/>
							<Form.Label htmlFor='' className='user-label-regis'>
								<RiLockPasswordLine />
								Confirmar contraseña
							</Form.Label>
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

						{errors.confirmPassword && <p>¡Las contraseñas no coinciden!</p>}
						<Form.Label className='FontMedium'>
							<GoLocation />
							Elige tu departamento
						</Form.Label>
						<Form.Select
							style={{
								border: "2px solid #365662",
								boxShadow: "0 0.4rem #94BFD1",
								borderRadius: "12px",
								height: "45px",
								width: '550px',
								margin: 'auto',
								marginBottom: '10px'
							}}
							px
							aria-label='Departamentos'
							{...register("departamentos", { required: true })}
						>
							<option value="" disabled selected hidden>Seleccione un departamento</option>
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

						<Row>
							<Col
								md
								style={{
									textAlign: "end",
									paddingRight: "0px",
									marginTop: "10px",
								}}
							>
								<Form.Group
									className='mb-3'
									controlId='formBasicCheckbox'
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Form.Check
										type='checkbox'
										label='Aceptas los'
										{...register("contrato", { required: true })}
									/>
									<button
										className='Button-Link'
										variant='link'
										onClick={handleShow}
										style={{ paddingTop: "4px" }}
									>
										<u>términos y condiciones</u>
									</button>
								</Form.Group>
							</Col>
						</Row>

						{errors.contrato?.type === "required" && (
							<p>¡Debes de aceptar todos los términos y condiciones!</p>
						)}
						{/* Modal de Terminos y Condiciones */}
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton style={{ border: "3px solid #75E8E5" }}>
								<Modal.Title style={{ textAlign: "center" }}>
									<h2>Términos y Condiciones de Marketplace504</h2>
								</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ border: "3px solid #75E8E5" }}>
								<Contrato />
							</Modal.Body>
							<Modal.Footer style={{ border: "3px solid #75E8E5" }}>
								<button className='Button-close' onClick={handleClose}>
									Cerrar
								</button>
							</Modal.Footer>
						</Modal>
						{succesfullResponse ? (
							<Alert variant='success'>
								Se creo de forma correcta su usuario
							</Alert>
						) : (
							""
						)}
						<button className='Button' type='submit'>
							<span className='boxForm'>Crear cuenta</span>
						</button>
					</Form>
				</Container>
			</header>
		</>
	);
};
