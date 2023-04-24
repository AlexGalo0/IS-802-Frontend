import axios from "axios"; /* 
import { useState, useEffect } from "react"; */
import { Modal, Alert } from "react-bootstrap";
import io from "socket.io-client";

const socket = io("http://localhost:4000/");

import { MdSend } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { envioCalificacion } from "../../../api";
export const ModalChatVendedor = ({
	showModal,
	vendedor,
	producto,
	handleCerrarModal,
}) => {
	const token = localStorage.getItem("token");
	const nombre = localStorage.getItem("nombre");
	const apellido = localStorage.getItem("apellido");
	const nombreCompleto = `${nombre} ${apellido}`;
	const idResultado = producto?.idProducto?.data;
	const idProducto = idResultado?.join("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [cantidad, setCantidad] = useState(1);
	const [showConfirmSale, setShowConfirmSale] = useState(false); //Mostrar modal de Confirmacion de Venta
	const [ventaConfirmada, setVentaConfirmada] = useState(false);
	const [errorConfirmado, setErrorConfirmado] = useState(false);
	const [errorMensaje, setErrorMensaje] = useState(false);
	const [datosDeChat, setDatosDeChat] = useState({
		tokenActual: localStorage.getItem("token"),
		idUsuarioProducto: vendedor?.id_vendedor?.toString
			? vendedor.id_vendedor.toString()
			: "",
		mensaje: "",
		nombreEmisor: localStorage.getItem("nombre"),
		idProducto: idProducto,
		cantidad: cantidad,
	});

	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		handleCerrarModal()
	}
	const handleShow = () => setShow(true);
	
	const datosInicializacion = {
		token: token,
		idProducto: idProducto ?? producto?.idProducto?.data,
	};

	const navigate = useNavigate();

	useEffect(() => {
		const receiveMessage = (message) => {
			setMessages([...messages, message]);
		};
		socket.on("envio-mensaje-producto", receiveMessage);
		socket.on("confirmar-venta", () => {
			setShowConfirmSale(true); //Renderizar el Div
		});

		socket.emit("chat-producto", datosInicializacion); //Evento que se dispara cuando un usuario inicia sesión

		return () => {
			socket.off("envio-mensaje-producto", receiveMessage);
		};
	}, [messages]);

	const handleChange = (e) => {
		const value = e.target.value;
		setDatosDeChat({
			...datosDeChat,
			mensaje: value,
		});
		setMessage(e.target.value);
	};
	const handleInputChange = (event) => {
		const nuevaCantidad = Math.min(event.target.value, producto.cantidad);
		setCantidad(nuevaCantidad);
	};
	const handleSubmitMensaje = (e) => {
		e.preventDefault();
		const newMessage = {
			body: message,
			from: nombre,
			idProducto: idProducto,
		};
		if (message.trim() === "") {
			setErrorMensaje(true);
			return;
		}
		socket.emit("envio-mensaje-producto", newMessage);
		enviarDatos(message);
		setMessages([...messages, newMessage]);
		setErrorMensaje(false);
		setMessage("");
		e.target[0].value = "";
	};

	const enviarDatos = async (mensaje) => {
		const data = {
			tokenActual: localStorage.getItem("token"),
			idUsuarioProducto: vendedor?.id_vendedor?.toString()
				? vendedor.id_vendedor.toString()
				: "",
			mensaje: mensaje,
			nombreEmisor: localStorage.getItem("nombre"),
		};

		await axios.post("http://localhost:4000/saveMessage", data);
	};

	/* Codigo para confirmar venta */
	const queryClient = useQueryClient();
	function handleConfirmSale() {
		socket.emit("confirmar-venta");
	}

	const enviarVenta = () => {
		const datosDeCompra = {
			tokenActual: localStorage.getItem("token"),
			idVendedor: vendedor?.id_vendedor.toString(),
			idProducto: idResultado.toString(),
			cantidad: cantidad,
		};
		axios
			.put(
				`http://localhost:4000/product/confirmar-compra/${datosDeCompra.tokenActual}`,
				datosDeCompra
			)
			.then((res) => {
				if (res.status === 200) {
					setVentaConfirmada(true);
					queryClient.invalidateQueries("producto");
					setTimeout(() => {
						if (cantidad === producto.cantidad) {
							navigate("/");
						}
						setVentaConfirmada(false);
						setShowConfirmSale(false)
						handleShow()
					}, 1000);
				} else {
					setErrorConfirmado(true);
				}
			});
	};

	/* Con este codigos logramos que al aniadir un mensaje se haga scroll automaticamente hacia abajo */
	const messagesRef = useRef(null);

	const scrollToBottom = () => {
		setTimeout(() => {
			messagesRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}, 0);
	};
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	/* Calificacion */

	const mutationEnvioCalificacion = useMutation({
		mutationFn:(calificacion)=>{
			envioCalificacion(calificacion)
		},
		onSuccess:()=>console.log("Calificacion Enviada")
	}) 
	const recibirCalificacion=(calificacion)=>{
		mutationEnvioCalificacion.mutate({
			calificacion,
			idVendedor:vendedor.id_vendedor.toString(),
		})
	}
	return (
		<Modal
			show={showModal}
			onHide={handleCerrarModal}
			style={{ display: "flex", flexDirection: "row", marginLeft: "-45px" }}
		>
			<main className='asiPrincipal'>
				<article
					className='artChat'
					style={{
						borderTopLeftRadius: "10px",
						borderBottomLeftRadius: "10px",
					}}
				>
					<Modal.Header closeButton>
						<Modal.Title style={{ height: "15px", fontSize: "25px", minWidth: '400px', textAlign: "center" }}>
							{/* Establece un chat con :  */}
							Vendedor:{" "}
							{vendedor?.nombreVendedor === nombreCompleto
								? `Tú`
								: `${vendedor?.nombreVendedor}`}
							<div style={{ fontSize: "17px", marginTop: "-15px" }}>
								<br />
								Artículo: {producto?.nombre}
								<br />
								Cantidad total: {producto?.cantidad}
								<br />
								Precio : Lps.{producto?.precio}
							</div>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div
							style={{
								marginTop: "85px",
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							{vendedor?.nombreVendedor === nombreCompleto ? (
								<button
									onClick={handleConfirmSale}
									disabled={showConfirmSale}
									className='buttonProducto'
									style={{
										color: "#f7f7f7",
										fontSize: "medium",
										backgroundColor: "#365662",
									}}
								>
									{" "}
									<span className='box'>Envía solicitud de venta</span>
								</button>
							) : (
								""
							)}

							{showConfirmSale && vendedor && (
								<alert
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										fontSize: "17px",
										marginTop: "10px",
									}}
								>
									<p>¿Deseas confirmar la compra?</p>
									<div style={{ display: "flex" }}>
										<button
											onClick={enviarVenta}
											className='buttonProducto'
											style={{
												color: "#f7f7f7",
												fontSize: "medium",
												backgroundColor: "#365662",
											}}
										>
											<span className='box'>Confirmar</span>
										</button>
										<button
											className='buttonProducto'
											style={{
												color: "#f7f7f7",
												fontSize: "medium",
												backgroundColor: "#365662",
											}}
											onClick={() => {
												setShowConfirmSale(false);
											}}
										>
											<span className='box'>Cancelar</span>
										</button>
									</div>
									<label htmlFor=''>Cantidad que deseas comprar</label>
									<input
										value={cantidad}
										type='number'
										onChange={handleInputChange}
										max={producto.cantidad}
									/>
								</alert>
							)}
							{ventaConfirmada ? (
								<>
									<Alert variant='success'>Compra Completada con exito!</Alert>
									{
										setTimeout(() => {
												handleShow()
										}, 1000)
									}
								</>
							) : (
								""
							)}
							{errorConfirmado ? (
								<Alert variant='danger'>¡Hubo un error!</Alert>
							) : (
								""
							)}
						</div>

						<form onSubmit={handleSubmitMensaje}>
							<div
								className='mensajesPadre'
								style={{ height: "390px", marginTop: "15px" }}
							>
								<div className='mensajes' style={{ overflow: "auto" }}>
									{/* 
          <input type="text" onChange={handleChange} value={message.mensaje} />
          <button type="submit">Enviar Mensaje</button> */}
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
													<p style={{ marginBottom: "-1px" }}>
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
									<MdSend
										className='iconBuscar'
										style={{ marginLeft: "1px" }}
									/>
									<span className='textComent' style={{ marginLeft: "11px" }}>
										Enviar
									</span>
								</button>
							</div>
						</form>
					</Modal.Body>
				</article>
			</main>
			{/* Modal de calificacion de */}
			

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Deseas calificar al vendedor?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					¿Que calificacion le darias al vendedor del 1 al 5?
				</Modal.Body>
				<form onSubmit={handleSubmit(recibirCalificacion)}>

				<input type='number' max="5" min="1" maxLength="1" {...register("calificacion")}/>
					<button variant='secondary' type="submit">Calificar al vendedor</button>
				</form>
				<Modal.Footer>
					<button variant='primary' onClick={handleClose}>
						Ignorar
					</button>
				</Modal.Footer>
			</Modal>
		</Modal>
	);
};
