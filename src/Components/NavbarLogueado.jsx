import "bootstrap/dist/css/bootstrap.min.css";
import {
	Form,
	Image,
	OverlayTrigger,
	Tooltip,
	Offcanvas,
	Nav,
} from "react-bootstrap";
import "./styles/stNav.css";
// import { get, useForm } from "react-hook-form";
// import { FiMenu } from "react-icons/fi";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineMessage, AiOutlinePoweroff } from "react-icons/ai";
import logo from "../assets/logo.png";
import { BsFacebook, BsInstagram, BsDiscord } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaBoxes, FaStar, FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { ChatGeneral } from "../pages/Producto/Components/ChatGeneral";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ModalChatGeneral } from "./ModalChatGeneral";

export const NavbarsLogueado = () => {
	const { userAuth, setUserAuth } = useContext(UserContext);
	/* 
	let { idProducto } = useParams(); */
	const [showGeneral, setShowGeneral] = useState(false);
	const handleCerrarModal = () => {
		setShowGeneral(false);
	};
  const abrirModal=()=>{
    setShowGeneral(true)
  }
	const pruebaDesloguear = () => {
		setUserAuth(false);
		if (localStorage.getItem("token") !== null) {
			localStorage.removeItem("token");
		}
		if (localStorage.getItem("nombre") !== null) {
			localStorage.removeItem("nombre");
		}
		if (localStorage.getItem("apellido") !== null) {
			localStorage.removeItem("apellido");
		}
		if (localStorage.getItem("correo") !== null) {
			localStorage.removeItem("correo");
		}
		if (localStorage.getItem("categoriasSuscritas") !== null) {
			localStorage.removeItem("categoriasSuscritas");
		}if (localStorage.getItem("idsListaDeDeseos") !== null) {
			localStorage.removeItem("idsListaDeDeseos");
		}
	};
	const nombre = localStorage.getItem("nombre");
	const apellido = localStorage.getItem("apellido");
	const correo = localStorage.getItem("correo");

	/* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
	const renderTooltip = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Perfil
		</Tooltip>
	);

	const renderTooltipLike = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Lista de favoritos
		</Tooltip>
	);

	const renderTooltipMessaje = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Mensajería
		</Tooltip>
	);

	/* Elentos del perfil */
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	/* Funcion para que las pantallas aparezcan al inicio */
	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	/* const obtenerProductoPorId = async (idProducto) => {
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
 */
	return (
		<>
			<div className='top-header'>
				<div>
					<span className='letterHeader'>
						¿Ya sigues nuestras redes sociales?
					</span>
				</div>

				<div>
					<span className='letterLightHeader'>
						Si quieres mantenerte informado de todas las novedades y
						promociones, no olvides visitar nuestras redes sociales
					</span>
				</div>

				<div>
					<ul className='ulRedes'>
						<Link
							to='https://www.facebook.com/'
							style={{ textDecoration: "none" }}
						>
							<li className='liRedes'>
								<span className='redes'>
									<BsFacebook className='i' />
								</span>
								<span className='titulo'>Facebook</span>
							</li>
						</Link>
						{/* <li className="liRedes">
              <span className="redes">
                <BsTwitter className="i" />
              </span>
              <span className="titulo">twitter</span>
            </li> */}
						<Link
							to='https://www.instagram.com/'
							style={{ textDecoration: "none" }}
						>
							<li className='liRedes'>
								<span className='redes'>
									<BsInstagram className='i' />
								</span>
								<span className='titulo'>instagram</span>
							</li>
						</Link>
						{/* <OverlayTrigger
							placement='left'
							delay={{ show: 250, hide: 400 }}
							overlay={renderTooltipMessaje}
						>
							<Link to='/construyendo'>
								<button
									className='button-cuenta'
									onClick={() => {
										scrollToTop();
									}}
								>
									<AiOutlineMessage />
								</button>
							</Link>
						</OverlayTrigger> */}
						<Link to='https://discord.com/' style={{ textDecoration: "none" }}>
							<li className='liRedes'>
								<span className='redes'>
									<BsDiscord className='i' />
								</span>
								<span className='titulo'>discord</span>
							</li>
						</Link>
					</ul>
				</div>
			</div>

			{/* Navbar */}
			<div className='navbar'>
				<Link to='/'>
					<Image src={logo} className='image-logo' />
				</Link>
				<div /* className="buscador-div2" */ /* style={{display:"none"}} */>
					<div
						style={{ color: "white", fontSize: "larger", marginTop: "13px" }}
					>
						¡Hola {nombre} {apellido}!
					</div>
				</div>
				<div style={{ display: "flex", margin: "auto" }}>
					<Link to='/registrarProducto' style={{ textDecoration: "none" }}>
						<button className='btnregis' style={{ width: "300px" }}>
							<span
								className='textBuscar'
								onClick={() => {
									scrollToTop();
								}}
							>
								Agregar producto{" "}
							</span>
						</button>
					</Link>
				</div>

				<div style={{ display: "flex", gap: "10px" }}>
					<OverlayTrigger
						placement='left'
						delay={{ show: 250, hide: 400 }}
						overlay={renderTooltipLike}
					>
						<Link to='/favoritos'>
							<button
								className='button-cuenta'
								onClick={() => {
									scrollToTop();
								}}
							>
								<AiOutlineHeart />
							</button>
						</Link>
					</OverlayTrigger>
					<OverlayTrigger
						placement='left'
						delay={{ show: 250, hide: 400 }}
						overlay={renderTooltipMessaje}
					>
						<Link to='/chatGeneral'>
						<button
							className='button-cuenta'
							/* onClick={() => {
								abrirModal()
							}} */
						>
							<AiOutlineMessage />
						</button>
						</Link>
					</OverlayTrigger>
					{/* <ModalChatGeneral
						showGeneral={showGeneral}
						handleCerrarGeneral={handleCerrarModal}
					/> */}
					<OverlayTrigger
						placement='left'
						delay={{ show: 250, hide: 400 }}
						overlay={renderTooltip}
					>
						<button
							className='button-cuenta'
							onClick={() => {
								scrollToTop(), handleShow();
							}}
						>
							<BiUser />
						</button>
					</OverlayTrigger>

					{
						<Offcanvas
							show={show}
							onHide={handleClose}
							className='canvas'
							placement='end'
							bsPrefix='offcanvas'
						>
							<Form className='formCategory' style={{ width: "100%" }}>
								<Offcanvas.Header closeButton closeVariant='white'>
									<Offcanvas.Title>
										<p
											style={{
												color: "#f7f7f7",
												textAlign: "left",
												marginLeft: "-5px",
												marginRight: "80px",
												fontSize: "26px",
												fontWeight: "400",
												marginBottom: "-95px",
												marginTop: "40px",
											}}
										>
											Perfil de:
										</p>
									</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body style={{ width: "100%", height: "100%" }}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-around",
											alignItems: "center",
											flexDirection: "column",
											height: "100%",
											marginTop: "-60px"
										}}
									>
										<p
											style={{
												color: "#f7f7f7",
												fontSize: "26px",
												fontWeight: "400",
											}}
										>
											{nombre} {apellido}
										</p>
										{/* <div
											style={{
												display: "flex",
												flexDirection: "column",
											}}
										>
											<p
												style={{
													color: "#f7f7f7",
													fontSize: "20px",
													fontWeight: "400",
												}}
											>
												Informacion:
											</p>
											<p
												style={{
													color: "#f7f7f7",
													fontSize: "20px",
													fontWeight: "400",
												}}
											>
												{correo}
											</p>
										</div> */}
										{/* <div
											style={{
												display: "flex",
												flexDirection: "column",
												gap: "50px",
											}}
										> */}
											<Link
												to='/misProductos'
												style={{ textDecoration: "none" }}
											>
												<button className='buttonCerrarSesion'>
													Mis productos
												</button>
											</Link>
											<Link to='/sus-cat' style={{ textDecoration: "none" }}>
												<button className='buttonCerrarSesion'>
													Suscribite a categorías
												</button>
											</Link>
										{/* </div> */}

										<button
											onClick={pruebaDesloguear}
											className='buttonCerrarSesion'
											style={{
												marginBottom: '-70px'}}
										>
											<AiOutlinePoweroff style={{marginRight: '5px'}}/>
											Cerrar sesión
										</button>
									</div>
								</Offcanvas.Body>
							</Form>
						</Offcanvas>
					}
				</div>
			</div>
		</>
	);
};
