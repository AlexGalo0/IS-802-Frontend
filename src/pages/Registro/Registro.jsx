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
	Accordion
} from "react-bootstrap";
import "./style.css";
import { get, useForm } from "react-hook-form";
import { CiUser, CiCalendarDate } from "react-icons/ci";
import { IoMdPhonePortrait } from "react-icons/io";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import { comprobarEdad } from "./helpers/comprobarEdad";
import { createUser } from "../../api/sendRequest.api";
import { useRef } from "react";

export const Registro = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
		setError,
		watch
	} = useForm();
	const password = useRef({})
	password.current = watch("password","")

	const enviarInfo = async (data) => {
		try {
			console.log(data);
			// const response = await createUser(data);
			// console.log(response);
		} catch (error) {
			// console.log(error);
		}
	};

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
							<Col md>
								<h2>Logo</h2>
							</Col>
							<Col md>
								<Button
									className='Buttom-back'
									variant='secondary'
									type='submit'
								>
									Atras
								</Button>
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
										{...register("nombres", { required: true, maxLength: 40 , min:3 , pattern:/^[a-zA-Z]+$/})}
									/>

									{errors.nombre?.type === "required" && (
										<p className='FontAlert'>El campo Nombre es requerido!</p>
									)}
									{errors.nombre?.type === "maxLength" && (
										<p className='FontAlert'>
											Tienes demasiados caracteres!
										</p>
									)}
									{errors.nombre?.type === "min" && (
										<p className='FontAlert'>Tienes muy pocos caracteres!</p>
									)}
									{errors.nombre?.type === "pattern" && (
										<p className='FontAlert'>Tu nombre solo deben ser caracteres!</p>
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
										{...register("apellido", { required: true, maxLength: 10, min:3 , pattern:/^[a-zA-Z]+$/ })}
									/>
									{errors.apellido?.type === "required" && (
										<p className='FontAlert'>El campo apellido es requerido</p>
									)}
									{errors.apellido?.type === "maxLength" && (
										<p className='FontAlert'>
											Tienes demasiados caracteres
										</p> /* Añadir otro comentario  */
									)}
									{errors.apellido?.type === "min" && (
										<p className='FontAlert'>Tienes muy pocos caracteres!</p>
									)}
									{errors.apellido?.type === "pattern" && (
										<p className='FontAlert'>Tu apellido solo deben ser caracteres!</p>
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
										Telefono
									</Form.Label>
									<Form.Control
										className='Input'
										type='text'
										placeholder='Ingrese su telefono celular'
										{...register("telefono", {
											required: true,
											maxLength: 9,
											pattern: /[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/,
										})}
									/>
									{errors.telefono?.type === "required" && (
										<p className='FontAlert'>El campo Telefono es requerido</p>
									)}
									{errors.telefono?.type === "maxLength" && (
										<p className='FontAlert'>
											Tienes demasiados numeros.
										</p> /* Añadir otro comentario  */
									)}
									{errors.telefono?.type === "pattern" && (
										<p className='FontAlert'>
											El formato es el siguiente : XXXX-XXXX 
										</p> /* Añadir otro comentario  */
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
										placeholder='Ingrese su Fecha de nacimiento'
										{...register("fechaNacimiento", { required: true })}
									/>
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
									pattern:
									/^(0[1-9]|1[0-8])\d{2}-\d{4}-\d{5}/
								})}
							/>
							{errors.dni?.type === "required" && (
								<p className='FontAlert'>El campo DNI es requerido</p>
							)}
							{errors.dni?.type === "maxLength" && (
								<p className='FontAlert'>
									Tienes demasiados caracteres
								</p> /* Añadir otro comentario  */
							)}
							{errors.dni?.type === "pattern" && (
								<p className='FontAlert'>
									El formato es el siguiente : XXXX-XXXX-XXXXX
								</p> /* Añadir otro comentario  */
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
								placeholder='Ingrese su correo electronico'
								{...register("correo", { required: true, maxLength: 50 , pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
							})}
							/>
							{errors.correo?.type === "required" && (
								<p className='FontAlert'>El campo Correo es requerido</p>
							)}
							{errors.correo?.type === "pattern" && (
								<p className='FontAlert'>Debes ingresar un correo valido.</p>
							)}

							<Form.Text className='text-muted, FontLight'>
								Nunca compartiremos tu correo electronico!
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
										
										{...register("password", { required: true, minLength: 8})}
									/>
								</Form.Group>
								{errors.password?.type === "required" && (
									<p className='FontAlert'>El campo password es requerido</p>
								)}
								{errors.password?.type === "minLength" && (
									<p className='FontAlert'>
										Tienes muy pocos caracteres
									</p> /* Añadir otro comentario  */
								)}
							</Col>

							<Col md>
								<Form.Group
									className='mb-3, FontMedium'
									controlId='formBasicConfirmPassword'
								>
									<Form.Label>
										<RiLockPasswordLine />
										Confirmar Contraseña
									</Form.Label>
									<Form.Control
										className='Input'
										type='password'
										placeholder='Ingrese su Contraseña'
										{...register("confirmPassword", { required: true ,min:8, validate:(value)=>value===password.current})}
										
									/>
								</Form.Group>
								{errors.confirmPassword?.type === "required" && (
									<p className='FontAlert'>El campo password es requerido</p>
								)}
								{errors.confirmPassword?.type === "maxLength" && (
									<p className='FontAlert'>
										Tienes demasiados caracteres
									</p> 
								)}
								{
									errors.confirmPassword && <p>Las contraseñas no coinciden</p>
								}
								{errors.confirmPassword?.type === "min" && (
									<p className='FontAlert'>
										Tienes muy pocos caracteres
									</p> 
								)}
								
								
							</Col>
						</Row>
						<Form.Label className='FontMedium'>
							<GoLocation />
							Elige tu departamento
						</Form.Label>
						<Form.Select
							className='Input'
							aria-label='Departamentos'
							{...register("departamentos", { required: true })}
						>
							<option placeholder='Ingrese su nombre'></option>
							<option value='1'>Atlantida</option>
							<option value='2'>Colon</option>
							<option value='3'>Comayagua</option>
							<option value='4'>Copan</option>
							<option value='5'>Cortes</option>
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
							<p className='FontAlert'>El campo departamentos es requerido</p>
						)}

						<Form.Group
							className='mb-3, FontMedium'
							controlId='formBasicCheckbox'
						>
							<Form.Check
								type='checkbox'
								label='Echa un vistazo a los terminos y condiciones'
								{...register("contrato",{required:true})}
							/>	 
							</Form.Group>							
							
								{errors.contrato?.type === "required" && (
					   <p>Debes de aceptar todos los terminos y condiciones</p>
				   )}
				  
						<Button className='Buttom' variant='secondary' type='submit'>
							Crear cuenta
						</Button>
					</Form>
				</Container>
			</header>
		</>
	);
};
