import "../Style/product.css";
import { BiLeftArrow } from "react-icons/bi";
import { MdOutlineInsertComment } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
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
} from "react-bootstrap";

import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { UserContext } from "../../../context";
import { Footers } from "../../../Components/Footer";
import { Link, useParams } from "react-router-dom";
import Boton from "../Components/botonLike";
import { FaShare } from "react-icons/fa";
import axios from "axios"; /* 
import { agregarProductoWishlist } from "../../../api/sendRequest.api"; */
import { Comentarios } from "./Comentarios";

export const Producto = ({}) => {
	const { userAuth } = useContext(UserContext);
	let { idProducto } = useParams();
	const navigate = useNavigate(); //Para redireccion
	// const [arregloImagenes, setArregloImagenes] = useState([]);
	const handleRedirection = () => {
		navigate(-1);
	};
	const obtenerProductoPorId = async (idProducto) => {
		const res = await axios.get(`http://localhost:4000/product/${idProducto}`);

		return res.data[0];
	};
	const { data: infoProductos } = useQuery({
		queryKey: ["producto"],
		queryFn: () => obtenerProductoPorId(idProducto),
	});

	/* Elementos de los overlays (AL poner cursor sobre el simbolo de corazon dice que inicimos sesion) */
	const renderTooltipButtomShare = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Compartir
		</Tooltip>
	);

	const generarEnlace = () => {
		navigator.clipboard.writeText(
			/* Depende la maquina */
			"http://localhost:5173/producto/" + idProducto
		);
	};

	/* const agregarFavoritos=()=>{
		const tokenUsuario= localStorage.getItem('token')
		agregarProductoWishlist(tokenUsuario,idProducto)
	} */

	const [texto, setTexto] = useState("");

	function handleClick() {
		setTexto("¡Enlace de producto copiado!");
	}

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

					{userAuth ? '' : 
					<Alert variant="success" style={{margin: 'auto', marginBottom: '15px', marginTop: '-50px'}}>Si deseas interactuar de mejor forma con el producto ¡Registrate o inicia sesión!
					</Alert>}

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

								<h4 style={{ marginBottom: "-10px" }}>
									Calificacion del vendedor:
								</h4>
								<div className='conCalificacion'>
									<div className='starWitget'>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='cal5'
											value='5'
										/>
										<label className='laStar' for='cal5' style={{color: 'black'}}>
											<AiFillStar />
										</label>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='cal4'
											value='4'
										/>
										<label className='laStar' for='cal4' style={{color: 'black'}}>
											<AiFillStar />
										</label>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='cal3'
											value='3'
										/>
										<label className='laStar' for='cal3' style={{color: 'black'}}>
											<AiFillStar />
										</label>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='cal2'
											value='2'
										/>
										<label className='laStar' for='cal2' style={{color: 'black'}}>
											<AiFillStar />
										</label>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='cal1'
											value='1'
										/>
										<label className='laStar' for='cal1' style={{color: 'black'}}>
											<AiFillStar />
										</label>
									</div>
								</div>

								<h1>
									<BsCurrencyDollar style={{ marginTop: "-8px" }} />
									{infoProductos?.precio}
								</h1>
							</div>


							
							<div className='spectsMedium2'>
								
								{userAuth ? <h3>Califica el producto:</h3> : ''}

								{userAuth?
								<>
								<div className='conCalificacion'>
									<div className='starWitget'>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='rate5'
											value='5'
										/>
										<label className='laStar' for='rate5'>
											<AiFillStar />
										</label>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='rate4'
											value='4'
										/>
										<label className='laStar' for='rate4'>
											<AiFillStar />
										</label>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='rate3'
											value='3'
										/>
										<label className='laStar' for='rate3'>
											<AiFillStar />
										</label>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='rate2'
											value='2'
										/>
										<label className='laStar' for='rate2'>
											<AiFillStar />
										</label>
										<input
											className='inStar'
											type='checkbox'
											name='rate'
											id='rate1'
											value='1'
										/>
										<label className='laStar' for='rate1'>
											<AiFillStar />
										</label>
									</div>
								</div>
								</>	
							: ''} 
								
							
								<div style={{ display: "flex", gap: "10px" }}>
									{userAuth ? <Boton /> : ""}
									
									{userAuth ? <div className='like'>
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
									</div> : <div className='like'>
										<OverlayTrigger
											placement='top'
											delay={{ show: 250, hide: 400 }}
											overlay={renderTooltipButtomShare}
										>
											<button
												onClick={() => {
													generarEnlace(), handleClick();
												}}
												style={{width: '80px', height: '80px'}}
											>
												<FaShare className='heart'  style={{width: '50px', height: '50px'}}/>
											</button>
										</OverlayTrigger>
									</div>}
									{/* 
									<button onClick={agregarFavoritos}>Agregar a Favoritos</button> */}
									{/* Boton de compartir */}
									
								</div>
								<div>{texto}</div>
								{userAuth ? (
									<>
										<Link to='/construyendo' style={{ textDecoration: "none" }}>
											<button
												className='buttonChat'
												style={{ color: "#f7f7f7", fontSize: "medium" }}
											>
												<span className='box'>Pregunta sobre este artículo	</span>
											</button>
										</Link>
										<Link to='/construyendo' style={{ textDecoration: "none" }}>
											<button
												className='buttonChat'
												style={{ color: "#f7f7f7", fontSize: "medium" }}
											>
												<span className='box'>Escribe al vendedor</span>
											</button>
										</Link>
									</>
								) : (
									""
								)}
							</div>
						</div>
					</div>
					<Comentarios productoID={idProducto}/>
				</header>

				<Footers />
			</Container>
		</>
	);
};
