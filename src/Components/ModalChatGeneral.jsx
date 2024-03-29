import axios from "axios";
/* import { useState, useEffect } from "react"; */
import { Modal, Alert } from "react-bootstrap";
import io from "socket.io-client";


import { MdSend } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";

const socket = io("http://localhost:4000/");
export const ModalChatGeneral = ({
	showGeneral,
	handleCerrarGeneral,
	vendedor,
}) => {
	const nombre = localStorage.getItem("nombre");
	const token = localStorage.getItem("token");
	const apellido = localStorage.getItem("apellido");
	const nombreCompleto = `${nombre} ${apellido}`;
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [datosDeChat, setDatosDeChat] = useState({
		tokenActual: localStorage.getItem("token"),
		idUsuarioProducto: vendedor?.id_vendedor?.toString
			? vendedor.id_vendedor.toString()
			: "",
		mensaje: "",
		nombreEmisor: localStorage.getItem("nombre"),
	});

	// const [showConfirmSale, setShowConfirmSale] = useState(false); //Confirmacion de Venta

	useEffect(() => {
		const receiveMessage = (message) => {
			setMessages([...messages, message]);
		};
		socket.on("envio-mensaje-general", receiveMessage);

		return () => {
			socket.off("envio-mensaje-general", receiveMessage);
	
		};
	}, [messages]);

	const [errorMensaje, setErrorMensaje] = useState(false);
	const handleChange = (e) => {
		const value = e.target.value;
		setDatosDeChat({
			...datosDeChat,
			mensaje: value,
		});
		setMessage(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newMessage = {
			body: message,
			from: nombre,
		};
		if (message.trim() === "") {
			setErrorMensaje(true);
			return;
		}
		socket.emit("envio-mensaje-general", newMessage);

		// enviarDatos(message);
		setMessages([...messages, newMessage]);
		setErrorMensaje(false);
		setMessage("");
		e.target[0].value = "";
	};

	


	/* Con este codigos logramos que al aniadir un mensaje se haga scroll automaticamente hacia abajo */
	const messagesRef = useRef(null);

	const scrollToBottom = () => {
		setTimeout(() => {
			messagesRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}, 0);
	};

	return (
		<Modal
			show={showGeneral}
			onHide={handleCerrarGeneral}
			style={{ display: "flex", flexDirection: "row", marginLeft: "-45px" }}
		>
			<main className='asiPrincipal'>
				{/* <aside className="asiChat">Perfiles de usuarios con los que podre chat</aside> */}
				<article
					className='artChat'
					style={{
						borderTopLeftRadius: "10px",
						borderBottomLeftRadius: "10px",
					}}
				>
					<Modal.Header closeButton>
						<Modal.Title style={{ height: "15px", fontSize: "25px", minWidth: '400px', textAlign: "center" }}>
							Mensajería general: Bienvenido {nombre}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={handleSubmit}>
							<div className='mensajesPadre'>
								<div className='mensajes'>
									<ul>
										{messages.map((message, index) => (
											<li key={index} style={{ listStyle: "none" }}>
												{localStorage.nombre === message.from ? (
													<p
														style={{
															marginBottom: "-1px",
															textAlign: "end",
															marginRight: "15px",
															clear: "both",
														}}
													>
														Tú:
													</p>
												) : (
													<p style={{ marginBottom: "-1px",  clear: "both", }}>
														{message.from}:
													</p>
												)}
												{localStorage.nombre === message.from ? (
													<div
														className='menChat'
														style={{
															float: "right",
															clear: "both",
															marginRight: "13px",
														}}
													>
														<p style={{ margin: "1px" }}>
															{/* {message.from} :  */}
															{message.body}
														</p>
													</div>
												) : (
													<div className='menChatUser'>
														<p style={{ margin: "1px" }}>
															{/* {message.from} :  */}
															{message.body}
														</p>
													</div>
												)}
											</li>
										))}
									</ul>
									{errorMensaje ? (
										<Alert
											variant='danger'
											style={{ margin: "auto", marginBottom: "10px" }}
										>
											{" "}
											¡No puedes enviar un mensaje vacío!
										</Alert>
									) : (
										""
									)}
									{/* scroll hacia abajo */}
									<div ref={messagesRef} />
								</div>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									margin: "auto",
								}}
							>
								<input
									className='inPrecio'
									style={{ width: "380px" }}
									type='text'
									onChange={handleChange}
									value={message.mensaje}
								/>
								<button
									type='submit'
									className='btnComent'
									style={{ width: "110px" }}
									/* scroll hacia abajo */
									onClick={scrollToBottom}
								>
									<MdSend className='iconBuscar' style={{marginLeft: '1px'}}/>
									<span className='textComent' style={{marginLeft: '11px'}}>Enviar</span>
								</button>
							</div>
						</form>
					</Modal.Body>
				</article>
			</main>

			{/* <Modal.Footer></Modal.Footer> */}
		</Modal>
	);
};
