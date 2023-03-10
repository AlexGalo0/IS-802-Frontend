import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget } from "./Components/CloudinaryUploadWidget";
import "./styles/styleRegistroProductos.css";
import logo from "../../assets/logoV2.png";
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
	const [imagenesVacias, setImagenesVacias] = useState(false);
	const [succesfullResponse, setSuccesfullResponse] = useState(false);
	const enviarProducto = async (productInfo) => {
		productInfo.imagenes = urls;
		if (productInfo.imagenes.length === 0) {
			setImagenesVacias(true);
			return;
		}

		try {
			const response = await enviarProductos(productInfo);
			setSuccesfullResponse(true);
			setTimeout(() => {
				navigate("/productos");
			}, 1500);
		} catch (error) {
			console.log(response);
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
							<input
								type='text'
								name='text'
								className='inNombre'
								{...register("nombreProducto", {
									pattern: /^[a-zA-Z????????????????????????0-9\s]{4,50}$/,
									required: true,
								})}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<MdDriveFileRenameOutline />
								Nombre
							</Form.Label>
							{errors.nombreProducto?.type === "pattern" && (
								<p className="FontAlert">??El nombre del producto no es v??lido!</p>
							)}
							{errors.nombreProducto?.type === "required" && (
								<p className="FontAlert">??Debes ingresar un nombre de producto!</p>
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
									// pattern: /^[a-zA-Z????????????????????????0-9\s]{4,50}$/,
									required: true,
								})}
							/>
							<Form.Label htmlFor='' className='user-label'>
								<MdDriveFileRenameOutline />
								Precio
							</Form.Label>

							{errors.Precio?.type === "required" && (
								<p className="FontAlert">??Debes ingresar un precio de producto!</p>
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
								<p className="FontAlert">??Debes ingresar una descripci??n al producto!</p>
							)}
							{errors.descripcion?.type === "minLength" && (
								<p className="FontAlert">??Debe tener m??nimo 10 caracteres!</p>
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
							<p className="FontAlert">??Solo debes ingresar n??meros!</p>
						)}
						{errors.cantidad?.type === "required" && (
							<p className="FontAlert">??Debes ingresar la cantidad!</p>
						)}
						{errors.cantidad?.type === "min" && <p className="FontAlert">??Debe ser m??nimo 1!</p>}

						<Form.Group
							style={{ position: "relative" }}
							controlId='formBasicLimitDays'
						>
							{" "}
							<Form.Label htmlFor='' className='user-label'>
								<BsCalendarDay /> Dias en existencia
							</Form.Label>
							<input
								name='text'
								className='inNombre'
								type='text'
								{...register("limite_dias", {
									required: true,
									max: 30,
									pattern: /^(0?[1-9]|[1-9][0-9]|100)$/,
									min: 1,
								})}
							/>
							{" "}
							
							{errors.limite_dias?.type === "pattern" && (
								<p className="FontAlert">??Solo debes ingresar n??meros!</p>
							)}
							{errors.limite_dias?.type === "required" && (
								<p className="FontAlert">
									??Debes ingresar el l??mite de d??as disponibles para la venta, 30 d??as es el m??ximo!
								</p>
							)}
							{errors.limite_dias?.type === "max" && (
								<p className="FontAlert">??El valor m??ximo de d??as es 30!</p>
							)}
							{errors.limite_dias?.type === "min" && (
								<p className="FontAlert">??El valor m??nimo de d??as es 1!</p>
							)}
						</Form.Group>

						<Form.Group
							className='mb-3, letterMedium'
							controlId='formBasicCategorias'
						>
							<Form.Label className='letterMedium' htmlFor=''>
								<GoLocation />
								Departamento de venta:{" "}
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
								<option value='1'>Atl??ntida</option>
								<option value='2'>Col??n</option>
								<option value='3'>Comayagua</option>
								<option value='4'>Cop??n</option>
								<option value='5'>Cort??s</option>
								<option value='6'>Choluteca</option>
								<option value='7'>El Para??so</option>
								<option value='8'>Francisco Moraz??n</option>
								<option value='9'>Gracias a Dios</option>
								<option value='10'>Intibuc??</option>
								<option value='11'>Islas de la Bah??a</option>
								<option value='12'>La Paz</option>
								<option value='13'>Lempira</option>
								<option value='14'>Ocotepeque</option>
								<option value='15'>Olancho</option>
								<option value='16'>Santa B??rbara</option>
								<option value='17'>Valle</option>
								<option value='18'>Yoro</option>
							</Form.Select>
						</Form.Group>

						{errors.dptoVenta?.type === "required" && (
							<p className="FontAlert">??Debes seleccionar un departamento!</p>
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
								<option value='Veh??culos'>Veh??culos</option>
								<option value='Hogar'>Hogar</option>
								<option value='Futuros padres'>Futuros Padres</option>
								<option value='Mascotas'>Mascotas</option>
								<option value='Electr??nica'>Electr??nica</option>
								<option value='Servicios'>Servicios</option>
								<option value='Negocios'>Negocios</option>
								<option value='Empleos'>Empleos</option>
							</Form.Select>
						</Form.Group>

						{errors.idCategoria?.type === "required" && (
							<p className="FontAlert">
								??Debes seleccionar una categor??a a la que el producto pertenece!
							</p>
						)}
					</Form>
					<div
						className='Form-Buttons'
						style={{ display: "grip", placeContent: "center"}}
					>
						<CloudinaryUploadWidget recibirURL={recibirURL} />

						{imagenesVacias ? <p className="font-cloud">??Debes enviar por lo menos una imagen!</p> : ""}
						{succesfullResponse ? (
							<Alert variant='success'>
								Se registro el producto exitosamente
							</Alert>
						) : (
							""
						)}
						<div>
							<button
								className='Button-Product'
								type='submit'
								onClick={handleSubmit(enviarProducto)}
							>
								<span class="box">Enviar producto</span>
							</button>
						</div>
					</div>
				</Container>
			</header>
		</>
	);
};
