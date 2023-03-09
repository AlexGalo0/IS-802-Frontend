import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget } from "./Components/CloudinaryUploadWidget";
import "./styles/styleRegistroProductos.css";
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
import { enviarProductos } from "../../api/sendRequest.api";
import { useNavigate } from "react-router";

export const RegistroProducto = () => {
	const navigate = useNavigate(); //Para redireccion
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const [urls, setURLS] = useState([]);
	const [imagenesVacias,setImagenesVacias] = useState(false)
	const enviarProducto = async (productInfo) => {
		
		productInfo.imagenes = urls;
		if (productInfo.imagenes.length===0) {
			setImagenesVacias(true)
			return;
		}
		console.log('Esto no deberia ejecutarse');
		const response = await enviarProductos(productInfo);
		console.log(response);
	};
	const recibirURL = (url) => {
		
		setURLS(url);
	};
	const handleRedirection = () => {
		navigate("/");
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
									onClick={handleRedirection}
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
							<Form.Label htmlFor='' className='user-label'>
								<MdDriveFileRenameOutline />
								Nombre
							</Form.Label>
							<input
								type='text'
								name='text'
								className='inNombre'
								{...register("nombreProducto", {
									pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{4,50}$/,
									required: true,
								})}
							/>
							{errors.nombreProducto?.type === "pattern" && (
								<p>El nombre del producto no es válido</p>
							)}
							{errors.nombreProducto?.type === "required" && (
								<p>Debes ingresar un nombre de producto</p>
							)}
						</Form.Group>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicNombre'
						>
							<Form.Label htmlFor='' className='user-label'>
								<MdDriveFileRenameOutline />
								Precio
							</Form.Label>
							<input
								type='text'
								name='number'
								className='inNombre'
								{...register("Precio", {
									// pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{4,50}$/,
									// required: true,
								})}
							/>
							{/* {errors.nombreProducto?.type === "pattern" && (
								<p>El nombre del producto no es válido</p>
							)}
							{errors.nombreProducto?.type === "required" && (
								<p>Debes ingresar un nombre de producto</p>
							)} */}
						</Form.Group>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicDescripcion'
						>
							<Form.Label htmlFor='' className='user-label'>
								<MdOutlineDescription />
								Descripcion
							</Form.Label>
							<input
								type='text'
								name='text'
								className='inNombre'
								{...register("descripcion", { required: true, minLength: 10 })}
							/>
							{errors.descripcion?.type === "required" && (
								<p>Debes ingresar una descripcion al producto.</p>
							)}
							{errors.descripcion?.type === "minLength" && (
								<p>Debe tener minimo 10 caracteres.</p>
							)}
						</Form.Group>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicCantProduct'
						>
							<input
								name='text'
								className='inNombre'
								type='text'
								{...register("cantidad", {
									required: true,
									pattern: /^[1-9][0-9]*$/,
									min: 1,
								})}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<FaSortAmountDownAlt />
								Cantidad del Producto
							</Form.Label>
						</Form.Group>
						{errors.cantidad?.type === "pattern" && (
							<p>Solo debes ingresar números</p>
						)}
						{errors.cantidad?.type === "required" && (
							<p>Debes ingresar la cantidad</p>
						)}
						{errors.cantidad?.type === "min" && <p>Debe ser minimo 1</p>}

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicLimitDays'
						>
							{" "}
							<Form.Label htmlFor='' className='user-label'>
								<BsCalendarDay /> Limite de Dias
							</Form.Label>
							<input
								name='text'
								className='inNombre'
								type='text'
								{...register("limite_dias", {
									required: true,
									max: 30,
									pattern: /^(?:[1-9]|[1-2][0-9]|30)$/,
									min: 1,
								})}
							/>
							{errors.limite_dias?.type === "pattern" && (
								<p>Solo debes ingresar números</p>
							)}
							{errors.limite_dias?.type === "required" && (
								<p>
									Debes ingresar el limite de dias disponibles para la venta, 30
									días es el máximo
								</p>
							)}
							{errors.limite_dias?.type === "max" && (
								<p>El valor maximo de dias es 30.</p>
							)}
							{errors.limite_dias?.type === "min" && (
								<p>El valor minimo de dias es 1.</p>
							)}
						</Form.Group>

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

						{errors.dptoVenta?.type === "required" && (
							<p>Debes seleccionar un departamento.</p>
						)}

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
								<option value='Futuros padres'>Futuros Padres</option>
								<option value='Mascotas'>Mascotas</option>
								<option value='Electrónica'>Electrónica</option>
								<option value='Servicios'>Servicios</option>
								<option value='Negocios'>Negocios</option>
								<option value='Empleos'>Empleos</option>
							</Form.Select>
						</Form.Group>

						{errors.idCategoria?.type === "required" && (
							<p>
								Debes seleccionar una categoria a la que el producto pertenece.
							</p>
						)}
					</Form>
					<div
						className='Form-Buttons'
						style={{ display: "grip", placeContent: "center" }}
					>
						<CloudinaryUploadWidget recibirURL={recibirURL} />
							{
								imagenesVacias ? <p>
								Debes enviar por lo menos una imagen.
							</p> : ''
							}
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
