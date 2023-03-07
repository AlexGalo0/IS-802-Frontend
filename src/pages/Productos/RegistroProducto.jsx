import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget } from "./Components/CloudinaryUploadWidget";
import "./styles/styleRegistroProductos.css"
import logo from "../../assets/logo.png";
import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";
import { MdDriveFileRenameOutline, MdOutlineDescription } from "react-icons/md";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BsCalendarDay } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Col,
	Container,
	Form,
	Row,
	Image,
	FormGroup,
	FormLabel,
} from "react-bootstrap";
import { useState } from "react";
import { enviarProductos } from "../../../api";

export const RegistroProducto = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const [urls, setURLS] = useState([]);
	const enviarProducto = async (productInfo) => {
		productInfo.imagenes = urls
		const response = await enviarProductos(productInfo)
		console.log(response);
	};
	const recibirURL = (url) => {
		/* Validar cuantas URLs vienen */
		setURLS(url);
	};
	return (
		<>
			<header className='App-header'>
				<Container className='ContainerProduct'>
					<Form fluid='true' className='Form-Product'>
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
							Registra tu producto
						</h1>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicNombre'
						>
							<input
								type='text'
								name='text'
								className='inNombre'
								{...register("nombreProducto", {
									pattern: /^[a-zA-Z\sáéíóúñÁÉÍÓÚÑ]+$/g,
									required: true,
									max: 100,
								})}
							/>
							{errors.nombreProducto?.type === "pattern" && (
								<p>Mensaje de Error</p>
							)}
							{errors.nombreProducto?.type === "required" && (
								<p>Mensaje de Error</p>
							)}
							{errors.nombreProducto?.type === "max" && <p>Mensaje de Error</p>}
							<Form.Label htmlFor='' className='user-label'>
								<MdDriveFileRenameOutline />
								Nombre
							</Form.Label>
							{errors.nombreProducto?.type === "required" && (
								<p className='FontAlert'>¡El campo nombre es requerido!</p>
							)}
							{errors.nombreProducto?.type === "pattern" && (
								<p className='FontAlert'>
									¡No debes ingresar caracteres especiales ni numeros!!
								</p>
							)}
							{errors.nombreProducto?.type === "min" && (
								<p className='FontAlert'>
									Debes ingresar menos de 100 caracteres{" "}
								</p>
							)}
						</Form.Group>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicDescripcion'
						>
							<input
								type='text'
								name='text'
								className='inNombre'
								{...register("descripcion", { required: true, max: 150 })}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<MdOutlineDescription />
								Descripcion
							</Form.Label>
						</Form.Group>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicCantProduct'
						>
							<input
								name='text'
								className='inNombre'
								type='number'
								min='1'
								pattern='^[0-9]+'
								{...register("cantidad", { required: true })}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<FaSortAmountDownAlt />
								Cantidad del Producto
							</Form.Label>
						</Form.Group>
						{errors.cantidad?.type === "pattern" && <p>Mensaje de Error</p>}
						{errors.cantidad?.type === "required" && <p>Mensaje de Error</p>}

						{errors.cantidad?.type === "min" && <p>Mensaje de Error</p>}

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicLimitDays'
						>
							<input
								name='text'
								className='inNombre'
								type='number'
								min='1'
								pattern='^[0-9]+'
								{...register("limite_dias", { required: true })}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<BsCalendarDay /> Limite de Dias
							</Form.Label>
						</Form.Group>
						{errors.limite_dias?.type === "pattern" && <p>Mensaje de Error</p>}
						{errors.limite_dias?.type === "required" && <p>Mensaje de Error</p>}

						<Form.Group
							className='mb-3, letterMedium'
							controlId='formBasicCategorias'
						>
							<Form.Label className='letterMedium' htmlFor=''>
								<GoLocation />
								Departamento de Venta:{" "}
							</Form.Label>
							<Form.Select
								className='input'
								style={{
									border: "2px solid #E211CC",
									boxShadow: "0 0.4rem #dfd9d9",
									borderRadius: "12px",
									height: "45px",
								}}
								aria-label='Departamentos'
								{...register("dptoVenta", { required: true })}
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
						</Form.Group>

						{errors.dptoVenta?.type === "required" && <p>Mensaje de Error</p>}

						<Form.Group
							className='mb-3, letterMedium'
							controlId='formBasicCategorias'
						>
							<Form.Label className='letterMedium' htmlFor=''>
								<BiCategoryAlt />
								Categoria:{" "}
							</Form.Label>
							<Form.Select
								className='input'
								style={{
									border: "2px solid #E211CC",
									boxShadow: "0 0.4rem #dfd9d9",
									borderRadius: "12px",
									height: "45px",
								}}
								aria-label='categorias'
								{...register("idCategoria", { required: true })}
							>
								<option placeholder='Seleccione una Categoria'></option>
								<option value='Inmuebles'>Inmuebles</option>
								<option value='Vehículos'>Vehículos</option>
								<option value='Hogar'>Hogar</option>
								<option value='Futuros padres'>Futuros Paders</option>
								<option value='Mascotas'>Mascotas</option>
								<option value='Electrónica'>Electrónica</option>
								<option value='Servicios'>Servicios</option>
								<option value='Negocios'>Negocios</option>
								<option value='Empleos'>Empleos</option>
							</Form.Select>
						</Form.Group>

						{errors.idCategoria?.type === "required" && <p>Mensaje de Error</p>}
                


					</Form>
					<div
						className='Form-Buttons'
						style={{ display: "grip", placeContent: "center" }}
					>
						<CloudinaryUploadWidget recibirURL={recibirURL} />

						<div>
							<button
								className='Button-Product'
								type='submit'
								onClick={handleSubmit(enviarProducto)}
							>
								Enviar Producto
							</button>
						</div>
					</div>
				</Container>
			</header>
		</>
	);
};
