import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget } from "./CloudinaryUploadWidget";
import "../../../style/styleForm.css";
import logo from "../../../assets/logoV2.png";
import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";
import { MdDriveFileRenameOutline, MdOutlineDescription } from "react-icons/md";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";
import { Col, Container, Form, Row, Image } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import {
	obtenerDepartamentos,
	obtenerCategorias,
	crearProducto,
} from "../../../api";
export const RegistroProducto = () => {
	const navigate = useNavigate(); //Para redireccion
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm(); //Para react-hook-form

	//Para React Query

	const { data: categorias } = useQuery({
		queryKey: ["categorias"],
		queryFn: obtenerCategorias,
	});
	const { data: departamentos } = useQuery({
		queryKey: ["departamentos"],
		queryFn: obtenerDepartamentos,
	});
	const mutationRegistrarProducto = useMutation({
		mutationFn: crearProducto,
		onSuccess: () => {}, //Agregar en el body funcion cuando funcione correctamente
		onError: () => {},
	});

	const [urls, setURLS] = useState([]);
	const [imagenesVacias, setImagenesVacias] = useState(false);

	const recibirURL = (url) => {
		setURLS(url);
	};
	const handleRedirection = () => {
		navigate("/");
	};

	/* Funcion onSubmit */
	const enviarProducto = (productInfo) => {
		productInfo.imagenes = urls;
		mutationRegistrarProducto.mutate({
			...productInfo
			/* 
				Devoler el JWT al registrar el producto.
			*/
		});
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
									pattern:
										/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s!@#$%^&*()-_+={}[\]|;:'",.<>/?]{4,50}$/,
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
								Descripción
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
								<option value='' hidden>
									Seleccione un departamento
								</option>
								{departamentos?.map((departamento) => (
									<option
										value={departamento.id_dpto}
										key={departamento.id_dpto}
									>
										{departamento.nombre}
									</option>
								))}
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
								Categoría:{" "}
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
								<option value='' hidden>
									Seleccione una categoría
								</option>
								{categorias?.map((categoria) => (
									<option
										key={categoria.idCategoria.data}
										value={categoria.nombre}
									>
										{categoria.nombre}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{errors.idCategoria?.type === "required" && (
							<p className='FontAlert'>
								¡Debes seleccionar una categoría a la que el producto pertenece!
							</p>
						)}
						<CloudinaryUploadWidget recibirURL={recibirURL} />
						{imagenesVacias ? (
							<p className='font-cloud'>
								¡Debes enviar por lo menos una imagen!
							</p>
						) : (
							""
						)}

						{mutationRegistrarProducto.isLoading ? (
							<p> Registrando Producto....</p>
						) : null}

						{mutationRegistrarProducto.isSuccess ? (
							<Alert variant='success'>¡Producto Añadido!</Alert>
						) : null}
						{mutationRegistrarProducto.isError ? (
							<Alert variant='danger'>
								Hubo un problema. Intenta de nuevo.
							</Alert>
						) : null}
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
