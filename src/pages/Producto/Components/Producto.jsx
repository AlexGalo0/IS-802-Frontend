import "../Style/product.css";
import { BiLeftArrow } from "react-icons/bi";
import { MdOutlineInsertComment } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Container,
	Form,
	Image,
	Carousel,
	Table,
	OverlayTrigger,
	Tooltip,
	Alert,
	Modal,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { UserContext } from "../../../context";
import { Footers } from "../../../Components/Footer";
import { Link, useParams } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import axios from "axios";
import { Comentarios } from "./Comentarios";
import { ModalChatVendedor } from "./ModalChatVendedor";
import {
	agregarProductoWishlist,
	envioDeDenuncia,
	obtenerListaDeseosUsuario,
} from "../../../api";
import { set, useForm } from "react-hook-form";
import "./Boton.css";
import { AiFillHeart } from "react-icons/ai";

export const Producto = ({}) => {
	const { userAuth } = useContext(UserContext);
	let { idProducto } = useParams();
	const navigate = useNavigate(); //Para redireccion
	// const [arregloImagenes, setArregloImagenes] = useState([]);
	const handleRedirection = () => {
		navigate(-1);
	};
	const nombre = localStorage.getItem("nombre");
	const apellido = localStorage.getItem("apellido");

	const [showModal, setShowModal] = useState(false);
	const [showDenuncia, setShowDenuncia] = useState(false);

	const handleCerrarModal = () => {
		setShowModal(false);
	};

	const handleCerrarDenuncia = () => {
		setShowDenuncia(false);
	};
	const handleShowDenuncia = () => {
		setShowDenuncia(true);
	};
	const [calificacionVendedor, setCalificacionVendedor] = useState(0);
	useEffect(() => {
		const enviarVisita = async () => {
			const visita = {
				visitas: 1,
				idProducto: idProducto,
			};
			const res = await axios.put(
				`http://localhost:4000/acumuladorVisitasProducto/`,
				visita
			);
		};
		const obtenerCalificacionDeVendedor = async (idProducto) => {
			const res = await axios.get(
				`http://localhost:4000/calificacion_vendedor_por_producto/${idProducto}`
			);
			setCalificacionVendedor(res.data[0].calificacion_promedio);
		};
		obtenerCalificacionDeVendedor(idProducto);
		enviarVisita();
	}, []);
	const obtenerProductoPorId = async (idProducto) => {
		const res = await axios.get(`http://localhost:4000/product/${idProducto}`);

		return res.data[0];
	};
	const { data: infoProductos } = useQuery({
		queryKey: ["producto"],
		queryFn: () => obtenerProductoPorId(idProducto),
	});

	const vendedor = {
		nombreVendedor:
			"" + infoProductos?.usuarioNombre + " " + infoProductos?.usuarioApellido,
		id_vendedor: infoProductos?.id_usuario.data,
	};
	const nombreCompleto = `${nombre} ${apellido}`;

	/* Elementos de los overlays (AL poner cursor sobre el simbolo de corazon dice que inicimos sesion) */
	const renderTooltipButtomShare = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Compartir
		</Tooltip>
	);

	const renderTooltipButtomDenuncia = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Denunciar
		</Tooltip>
	);

	const generarEnlace = () => {
		navigator.clipboard.writeText(
			/* Depende la maquina */
			"http://localhost:5173/producto/" + idProducto
		);
	};

	const [texto, setTexto] = useState("");
	const [alertDenunciaEnviada, setAlertDenunciaEnviada] = useState(false);
	function handleClick() {
		setTexto("¡Enlace de producto copiado!");
	}
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const queryClient = useQueryClient();
	const mutationEnviarDenuncias = useMutation({
		mutationFn: (denuncia) => {
			envioDeDenuncia(denuncia);
		},
		onSuccess: () => {
			setAlertDenunciaEnviada(true);
			setTimeout(() => {
				setAlertDenunciaEnviada(false);

				handleCerrarDenuncia();
				reset();
			}, 1000);
		},
	});
	const enviarDenuncia = (denuncia) => {
		const token = localStorage.getItem("token");
		mutationEnviarDenuncias.mutate({
			token,
			denuncia,
			idVendedor: vendedor.id_vendedor.toString(),
		});
	};

	/* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
	const renderTooltipButtomLike = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Agregar a lista de favoritos
		</Tooltip>
	);

	/* Favoritos */
	const [active, setActive] = useState(false);

	/* Verificar si esta como favorito el producto  */
	const { data: favoritos } = useQuery({
		queryKey: ["favoritos"],
		queryFn: () => {
			const token = localStorage.getItem("token");
			return obtenerListaDeseosUsuario(1, token);
		},
		// onSuccess:

		// queryClient.invalidateQueries("producto");
		enabled: !!localStorage.getItem("token"),
	});
	const verificacionDeFavoritos = (favoritos) => {
		queryClient.invalidateQueries("favoritos");
		if (favoritos.length === 0) {
			setActive(false);
		}
		favoritos.map((favorito) => {
			if (favorito.id_producto.data.toString() === idProducto) {
				setActive(true);
			}
		});
	};

	useEffect(() => {
		verificacionDeFavoritos(favoritos);
	}, [favoritos]);

	const agregarFavoritos = () => {
		setActive(!active);
		const token = localStorage.getItem("token");
		mutationAgregarFavoritos.mutate({
			idProducto: idProducto,
			token,
		});
	};

	const mutationAgregarFavoritos = useMutation({
		mutationFn: (obj) => {
			agregarProductoWishlist(obj);
		},
		onSuccess: () => {
			queryClient.invalidateQueries("favoritos");
			queryClient.invalidateQueries("producto");
		},
	});

	return (
		<>
			<Container fluid className='container-grid'>
				{userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
				<header className='headerProduct' style={{ paddingTop: "122px" }}>
					<button
						className='Button-back'
						type='submit'
						onClick={handleRedirection}
					>
						<BiLeftArrow />
					</button>

					{userAuth ? (
						""
					) : (
						<Alert
							variant='success'
							style={{
								margin: "auto",
								marginBottom: "15px",
								marginTop: "-50px",
							}}
						>
							Si deseas interactuar de mejor forma con el producto ¡Registrate o
							inicia sesión!
						</Alert>
					)}

					<div style={{ display: "flex", flexDirection: "row" }}>
						<div>
							{infoProductos?.imagenes && (
								<div>
									<Carousel variant='dark' className='carruselStyle'>
										{JSON.parse(infoProductos.imagenes)?.map((imagen) => (
											<Carousel.Item>
												<Container className='conCarrusel'>
													<Image src={imagen} className='imageCarrusel' />
												</Container>
											</Carousel.Item>
										))}
									</Carousel>
								</div>
							)}
						</div>

						<div className='spects'>
							<div className='spectsMedium'>
								<h1>{infoProductos?.nombre}</h1>
								<h4>{infoProductos?.descripcion}</h4>
								<h4>Departamento: {infoProductos?.departamento}</h4>
								<h4>Categoría: {infoProductos?.nombrecategoria}</h4>
								<h4>Cantidad en inventario: {infoProductos?.cantidad}</h4>
								<h4>
									Vendedor:{" "}
									{nombreCompleto === vendedor.nombreVendedor
										? "Tú"
										: vendedor?.nombreVendedor}
								</h4>

								<h4 style={{ marginBottom: "5px" }}>
									Calificación del vendedor: {calificacionVendedor} Estrellas
								</h4>

								<h1>Lps. {infoProductos?.precio}</h1>
							</div>

							<div className='spectsMedium2'>
								{/* {userAuth ? <h3>Califica el producto:</h3> : ""} */}

								{userAuth ? (
									<>
										{/* <div className='conCalificacion'>
											<div className='starWitget'>
												<input
													className='inStar'
													type='checkbox'
													name='rate'
													id='rate5'
													value='5'
												/>
												<label className='laStar' htmlFor='rate5'>
													<AiFillStar />
												</label>
												<input
													className='inStar'
													type='checkbox'
													name='rate'
													id='rate4'
													value='4'
												/>
												<label className='laStar' htmlFor='rate4'>
													<AiFillStar />
												</label>
												<input
													className='inStar'
													type='checkbox'
													name='rate'
													id='rate3'
													value='3'
												/>
												<label className='laStar' htmlFor='rate3'>
													<AiFillStar />
												</label>
												<input
													className='inStar'
													type='checkbox'
													name='rate'
													id='rate2'
													value='2'
												/>
												<label className='laStar' htmlFor='rate2'>
													<AiFillStar />
												</label>
												<input
													className='inStar'
													type='checkbox'
													name='rate'
													id='rate1'
													value='1'
												/>
												<label className='laStar' htmlFor='rate1'>
													<AiFillStar />
												</label>
											</div>
										</div> */}
									</>
								) : (
									""
								)}

								<div style={{ display: "flex", gap: "10px" }}>
									{userAuth ? (
										<>
											<div className='like'>
												<OverlayTrigger
													placement='top'
													delay={{ show: 250, hide: 400 }}
													overlay={renderTooltipButtomLike}
												>
													<button
														className={active ? "active" : ""}
														onClick={agregarFavoritos}
													>
														{active ? (
															<AiFillHeart className='heart' />
														) : (
															<AiFillHeart className='heart' />
														)}
													</button>
												</OverlayTrigger>
												   
											</div>
										</>
									) : (
										""
									)}

									{userAuth ? (
										<>
											<div className='like'>
												<OverlayTrigger
													placement='top'
													delay={{ show: 250, hide: 400 }}
													overlay={renderTooltipButtomShare}
												>
													<button
														onClick={() => {
															generarEnlace(), handleClick();
														}}
													>
														<FaShare className='heart' />
													</button>
												</OverlayTrigger>
											</div>
										</>
									) : (
										<div className='like'>
											<OverlayTrigger
												placement='top'
												delay={{ show: 250, hide: 400 }}
												overlay={renderTooltipButtomShare}
											>
												<button
													onClick={() => {
														generarEnlace(), handleClick();
													}}
													style={{ width: "80px", height: "80px" }}
												>
													<FaShare
														className='heart'
														style={{ width: "50px", height: "50px" }}
													/>
												</button>
											</OverlayTrigger>
										</div>
									)}

									{/* Boton de compartir */}
								</div>
								<div>{texto}</div>
								{userAuth && (
									<>
										<div>
											<button
												className='buttonChat'
												style={{
													color: "#f7f7f7",
													fontSize: "medium",
													minWidth: "200px",
												}}
												onClick={() => setShowModal(true)}
											>
												<span className='box' style={{ minWidth: "200px" }}>
													{nombreCompleto === vendedor.nombreVendedor
														? "Mensajes de tú producto"
														: `Pregunta por este artículo`}
												</span>
											</button>
										</div>
										<ModalChatVendedor
											showModal={showModal}
											handleCerrarModal={handleCerrarModal}
											vendedor={vendedor}
											producto={infoProductos}
										/>
										<div className='like'>
											{nombreCompleto === vendedor.nombreVendedor ? (
												""
											) : (
												<OverlayTrigger
													placement='top'
													delay={{ show: 250, hide: 400 }}
													overlay={renderTooltipButtomDenuncia}
												>
													<button
														onClick={handleShowDenuncia}
														style={{ width: "50px", height: "50px" }}
													>
														<MdReportProblem
															className='heart'
															style={{
																width: "40px",
																height: "40px",
																marginTop: "-5px",
															}}
														/>
													</button>
												</OverlayTrigger>
											)}
										</div>
										<Modal
											show={showDenuncia}
											onHide={
												handleCerrarDenuncia
											} /* style={{border: "1px solid #75E8E5"}} */
										>
											<Modal.Header
												closeButton
												style={{ textAlign: "center", margin: "auto" }}
											>
												<Modal.Title>
													Denuncia a {vendedor.nombreVendedor}
												</Modal.Title>
											</Modal.Header>
											<form
												onSubmit={handleSubmit(enviarDenuncia)}
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													gap: "5px",
												}}
											>
												<input
													type='text'
													{...register("denuncia", { required: true })}
													className='inPrecio'
													style={{ width: "350px" }}
													placeholder='Ingresa el motivo de tu denuncia'
												/>
												<button
													type='submit'
													className='buttonProducto'
													style={{
														backgroundColor: "#365662",
														color: "#f7f7f7",
														marginRight: "10px",
														width: "100px",
													}}
												>
													<span className='box'>Enviar</span>
												</button>
											</form>

											<Modal.Footer
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<div
													style={{ display: "flex", flexDirection: "column" }}
												>
													{errors.denuncia?.type === "required" && (
														<Alert variant='danger'>
															Debes ingresar una descripcion a tu denuncia
														</Alert>
													)}
													{alertDenunciaEnviada ? (
														<Alert variant='success'>
															Gracias por tu denuncia
														</Alert>
													) : (
														""
													)}
													<button
														variant='primary'
														onClick={handleCerrarDenuncia}
														className='buttonGuardar'
													>
														Cerrar
													</button>
												</div>
											</Modal.Footer>
										</Modal>
									</>
								)}
							</div>
						</div>
					</div>
					<Comentarios productoID={idProducto} />
				</header>

				<Footers />
			</Container>
		</>
	);
};
