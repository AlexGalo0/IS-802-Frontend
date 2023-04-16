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
import { useState } from "react";
import { useForm } from "react-hook-form";

import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from "react-router";
import logo from "../../../assets/logoV2.png";
import { useMutation, useQuery } from "@tanstack/react-query";

import { obtenerCategorias, suscripcionACategoria, verCategorias } from "../../../api";

export const FormCategorias = () => {
	const navigate = useNavigate(); //Para redireccion

	const handleRedirection = () => {
		navigate("/");
	};
	const token = localStorage.getItem("token")
	/* Elementos de la categoria */
	const [valoresIniciales, setValoresIniciales] = useState({
		categorias: [],
	});

	const [suscripcionExitosa, setSuscripcionExitosa] = useState(false)

	const { data: categorias } = useQuery({
		queryKey: ["categorias"],
		queryFn: obtenerCategorias,
	});

	const { register, handleSubmit, reset } = useForm({
		defaultValues: valoresIniciales,
	});

	const {data:categoriasPorUsuario} = useQuery({
		queryKey:["categoriasDeUsuario"],
		queryFn:()=>verCategorias(token)
	})

	const mostrarCategorias =()=>{
	}

	const mutationSuscripcionCategoria = useMutation({
		mutationFn: (categorias) => suscripcionACategoria(categorias,token),
		onSuccess: () => {
			setSuscripcionExitosa(true)
			setTimeout(() => {
				handleRedirection()
				setSuscripcionExitosa(false)
			}, 2000);
		},
	});
	const enviarCategorias = (categorias) => {
		mutationSuscripcionCategoria.mutate(categorias);
	};

	return (
		<>
			<header className='App-header'>
				<Container className='Container'>
					<Form
						fluid='true'
						className='Form'
						onSubmit={handleSubmit(enviarCategorias)}
						style={{ position: "relative", width: "550px" }}
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
										marginTop: "-35px",
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
							Categorias:
						</h1>

						<Form.Group
							style={{ position: "relative", width: "490px" }}
							controlId='formBasicNombre'
						>
							{/* Categorias */}
							<form
								onSubmit={handleSubmit(enviarCategorias)}
								style={{
									display: "flex",
									justifyContent: "center",
									flexDirection: "column" /* , alignItems: 'initial' */,
								}}
							>
								<h4 className='py-3' style={{ color: "black" }}>
									Selecciona las categorias de las cuales te gustaria recibir
									publicidad:
								</h4>
								{categorias?.map((categoria) => (
									<div
										key={categoria.idCategoria.data}
										className='checkboxCate'
										style={{ width: "auto", marginLeft: "140px" }}
									>
										<input
											style={{ marginTop: "3px" }}
											className='yepCate'
											id={categoria.nombre}
											type='checkbox'
											value={categoria.nombre}
											{...register(`categorias`)}
										/>
										<label
											
											htmlFor={categoria.nombre}
											style={{ marginTop: "3px" }}
										></label>
										<p className='checkPCate'>{categoria.nombre}</p>
										<br />
									</div>
								))}
							</form>
						</Form.Group>
						{
							suscripcionExitosa ? <Alert variant="success">Suscripciones Completadas.</Alert> : ''
						}
						<button className='Button' type='submit'>
							<span className='boxForm' style={{ fontSize: "20px" }}>
								Continuar
							</span>
						</button>
						<button
							className='buttonAdmin'
							style={{ marginTop: "30px", marginBottom: "-10px" }}
							onClick={()=>{
								navigate("/")
							}}
						>
							¡No quiero publicidad!
						</button>
						
					</Form>
					<button onClick={mostrarCategorias}>
						Mostrar
						</button>
				</Container>
			</header>
		</>
	);
};
