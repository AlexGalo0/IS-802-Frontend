import React, { useContext, useState } from "react";
import { Image, Modal, Button, Alert } from "react-bootstrap";
import {
	AiFillWarning,
	AiOutlineAreaChart,
	AiOutlineDelete,
	AiOutlinePoweroff,
} from "react-icons/ai";
import { FaBoxes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiCategory, BiUser } from "react-icons/bi";
import { AdminContext } from "../context";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enviarPDFs } from "../api";
import axios from "axios";
export const AsideAdmin = () => {
	const navigate = useNavigate();
	const { adminAuth, setAdminAuth } = useContext(AdminContext);
	const [completado, setCompletado] = useState(false);
	const deslogearAdmin = () => {
		setAdminAuth(false);
		if (localStorage.getItem("token-admin") !== null) {
			localStorage.removeItem("token-admin");
			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	};

	const handleRedirection = () => {
		navigate(-1);
	};

	const handleReiniciarBorrar = () => {
		handleCloseBorrarModal();
	};
	const [correosEnviados, setCorreosEnviados] = useState([])
	const enviarPDF = useMutation({
		mutationFn: async ()=>{
			const res = await axios.get('http://localhost:4000/envio-publicidad-pdf')
			setCorreosEnviados(res.data)
		},
		onSuccess: () => setCompletado(true),
	});
	const handleEnviarPDF = () => {
		enviarPDF.mutate();
	};

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);


	return (
		<aside
			style={{
				height: "100vh",
				backgroundColor: "#365662",
				color: "#f7f7f7",
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
				flexDirection: "column",
				padding: "10px",
				position: 'fixed',
			}}
		>
			<div className='text-center py-3'>
				<Image src={logo} width='230px' />
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				<Link to='/admin/usuarios' style={{ textDecoration: "none" }}>
					<button className='buttonCerrarSesionAdmin' >
						<BiUser style={{ marginRight: "5px" }} />
						Usuarios
					</button>
				</Link>

				<button className='buttonCerrarSesionAdmin' onClick={handleShowModal}>
					<BsFillCloudArrowUpFill style={{ marginRight: "15px" }}/>
					Publicidad
				</button>

				{/* <Link to='/dashboard-admin' style={{ textDecoration: "none" }}>
					<button className='buttonCerrarSesion'>
						<FaBoxes style={{ marginRight: "5px" }} />
						Productos
					</button>
				</Link> */}
				<Link to='/admin/estadisticas' style={{ textDecoration: "none" }}>
					<button className='buttonCerrarSesionAdmin'>
						<AiOutlineAreaChart style={{ marginRight: "5px" }} />
						Estadísticas
					</button>
				</Link>
				<Link to='/admin/denuncias' style={{ textDecoration: "none" }}>
					<button className='buttonCerrarSesionAdmin'>
						<AiFillWarning style={{ marginRight: "5px" }} />
						Denuncias
					</button>
				</Link>
				<Link to='/admin/crudCategorias' style={{ textDecoration: "none" }}>
					<button className='buttonCerrarSesionAdmin'>
						<BiCategory style={{ marginRight: "5px" }} />
						Categorías
					</button>
				</Link>
			</div>

			<button onClick={deslogearAdmin} className='buttonCerrarSesion'>
				<AiOutlinePoweroff style={{ marginRight: "5px" }} />
				Cerrar sesión
			</button>

			{/* Modal */}

			<Modal show={showModal} onHide={handleCloseModal} style={{width: '1400px'}}>
			<main className='asiPrincipal'>
			<article
					className='artChat'
					style={{
						borderTopLeftRadius: "10px",
						borderBottomLeftRadius: "10px",
						maxWidth: '700px'
					}}
				>
				<Modal.Header closeButton>
					<Modal.Title style={{ textAlign: "center", fontSize: "25px" }}>¿Deseas enviar publicidad a los usuarios?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
				<div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
				margin: 'auto'
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
					<button onClick={handleEnviarPDF} 
                  className="buttonGuardar">Si, deseo enviar</button>
					<button onClick={handleCloseModal} 
                  className="buttonGuardar">Cerrar</button>
				  </div>
					{completado ? (
						<Alert variant='success' className='alertPDF'>Los PDFs fueron enviados a los siguientes correos: {JSON.stringify(correosEnviados)}</Alert>
					) : (
						""
					)}
					
					</div>
				</Modal.Footer>
				</article>
			</main>
			</Modal>
		</aside>
	);
};
