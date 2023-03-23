import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget } from "./CloudinaryUploadWidget";
import "../../../style/styleForm.css";
import logo from "../../../assets/logoV2.png";
import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";
import { MdDriveFileRenameOutline, MdOutlineDescription } from "react-icons/md";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BsCalendarDay } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";
import {
	Col,
	Container,
	Form,
	Row,
	Image,
	FormGroup,
	FormLabel,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { enviarProductos } from "../../../api";
import { useNavigate } from "react-router";

export const RegistroProducto = () => {


	const [departamentos,setDepartamentos]=useState([])
	const navigate = useNavigate(); //Para redireccion
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const [urls, setURLS] = useState([]);
	const [imagenesVacias, setImagenesVacias] = useState(false);
	const [succesfullResponse, setSuccesfullResponse] = useState(false);

	useEffect(() => {
		fetch("http://localhost:4000/departamentos")
			.then((response) => response.json())
			.then((departamentos) => {
				setDepartamentos(departamentos);
			});
	}, []);

	/* 

	*/

	const enviarProducto = async (productInfo) => {
		console.log(productInfo);
		productInfo.imagenes = urls;
		if (productInfo.imagenes.length === 0) {
			setImagenesVacias(true);
			return;
		}

		try {
			const response = await enviarProductos(productInfo);
			setSuccesfullResponse(true);

			setTimeout(() => {
				navigate("/");
			}, 1500);
		} catch (error) {
			console.log(error);
		}
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
				<Container className='Container'>
					<Form
						fluid='true'
						className='Form'
						onSubmit={(e) => {
							e.preventDefault();
						}}
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
									style={{
										marginTop: "-45px",
										paddingTop: "1px",
										marginLeft: "-10px",
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
										marginRight: "-18px",
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
									pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{4,50}$/,
									required: true,
								})}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<MdDriveFileRenameOutline />
								Nombre
							</Form.Label>
							{errors.nombreProducto?.type === "pattern" && (
								<p className='FontAlert'>
									¡El nombre del producto no es válido!
								</p>
							)}
							{errors.nombreProducto?.type === "required" && (
								<p className='FontAlert'>
									¡Debes ingresar un nombre de producto!
								</p>
							)}
						</Form.Group>

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicNombre'
						>
							<input
								type='text'
								name='number'
								className='inNombre'
								{...register("Precio", {
									// pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{4,50}$/,
									required: true,
								})}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<MdDriveFileRenameOutline />
								Precio
							</Form.Label>

							{errors.Precio?.type === "required" && (
								<p className='FontAlert'>
									¡Debes ingresar un precio de producto!
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
								{...register("descripcion", { required: true, minLength: 10 })}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<MdOutlineDescription />
								Descripcion
							</Form.Label>
							{errors.descripcion?.type === "required" && (
								<p className='FontAlert'>
									¡Debes ingresar una descripción al producto!
								</p>
							)}
							{errors.descripcion?.type === "minLength" && (
								<p className='FontAlert'>¡Debe tener mínimo 10 caracteres!</p>
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
									pattern: /^[0-9][0-9]*$/,
									min: 1,
								})}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<FaSortAmountDownAlt />
								Cantidad del producto
							</Form.Label>
						</Form.Group>
						{errors.cantidad?.type === "pattern" && (
							<p className='FontAlert'>¡Solo debes ingresar números!</p>
						)}
						{errors.cantidad?.type === "required" && (
							<p className='FontAlert'>¡Debes ingresar la cantidad!</p>
						)}
						{errors.cantidad?.type === "min" && (
							<p className='FontAlert'>¡Debe ser mínimo 1!</p>
						)}

						<Form.Group
							className='mb-3, letterMedium'
							controlId='formBasicCategorias'
						>
							<Form.Label className='letterMedium' htmlFor=''>
								<GoLocation />
								Departamento de venta:{" "}
							</Form.Label>
							<Form.Select
								style={{
									border: "2px solid #365662",
									boxShadow: "0 0.4rem #94BFD1",
									borderRadius: "12px",
									height: "45px",
									width: "550px",
									margin: "auto",
									marginBottom: "10px",
								}}
								aria-label='Departamentos'
								{...register("dptoVenta", { required: true })}
							>
								<option value='' disabled selected hidden>
									Seleccione un departamento
								</option>
								{
									departamentos.map((departamento)=>(
										<option value={departamento.id_dpto}>{departamento.nombre}</option>
									))
								}
							
							</Form.Select>
						</Form.Group>

						{errors.dptoVenta?.type === "required" && (
							<p className='FontAlert'>¡Debes seleccionar un departamento!</p>
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
								style={{
									border: "2px solid #365662",
									boxShadow: "0 0.4rem #94BFD1",
									borderRadius: "12px",
									height: "45px",
									width: "550px",
									margin: "auto",
									marginBottom: "10px",
								}}
								aria-label='categorias'
								{...register("idCategoria", { required: true })}
							>
								<option value='' disabled selected hidden>
									Seleccione una categoria
								</option>
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
							<p className='FontAlert'>
								¡Debes seleccionar una categoría a la que el producto pertenece!
							</p>
						)}
						<CloudinaryUploadWidget recibirURL={recibirURL} />
						{imagenesVacias ? (
						<p className='font-cloud'>¡Debes enviar por lo menos una imagen!</p>
					) : (
						""
					)}

					{succesfullResponse ? (
						<Alert variant='success' style={{marginTop: '20px'}}>
							Se registro el producto exitosamente
						</Alert>
					) : (
						""
					)}
						<div>
							<button
								className='Button'
								type='submit'
								onClick={handleSubmit(enviarProducto)}
							>
								<span className='boxForm'>Enviar producto</span>
							</button>
						</div>
					</Form>

					{/* <div className="conWhite"></div> */}

					
				</Container>
			</header>
		</>
	);
};
