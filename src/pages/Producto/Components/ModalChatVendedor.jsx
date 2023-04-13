import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import io from "socket.io-client";

const socket = io("http://localhost:4000/");

export const ModalChatVendedor = ({modalShow,setShowModal,vendedor,producto, handleModalClose}) => {
	const nombre = localStorage.getItem("nombre");

	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [datosDeChat, setDatosDeChat] = useState({
		tokenActual: localStorage.getItem("token"),
		idUsuarioProducto:vendedor?.id_vendedor?.toString
			? vendedor.id_vendedor.toString()
			: "",
		mensaje: "",
		nombreEmisor: localStorage.getItem("nombre"),
	});

	const [cerrar, setCerrar] = useState(false);

	const handleCerrar = () => setCerrar(true);

	useEffect(() => {
		const receiveMessage = (message) => {
			setMessages([...messages, message]);
		};
		socket.on("envio-mensaje", receiveMessage);

		return () => {
			socket.off("envio-mensaje", receiveMessage);
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
		socket.emit("envio-mensaje", newMessage);

		enviarDatos(message);
		setMessages([...messages, newMessage]);
		setErrorMensaje(false)
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

	return (
		<Modal show={modalShow} onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					Establece un chat con : {vendedor?.nombreVendedor} sobre {
						producto?.nombre
					}
					Cantidad Total: {producto?.cantidad}
					Precio : {producto?.precio}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					<input type='text' onChange={handleChange} value={message.mensaje} />

					<ul>
						{messages.map((message, index) => (
							<li key={index}>
								<p>
									{message.from} : {message.body}
								</p>
							</li>
						))}
					</ul>
					{errorMensaje ? (
						<Alert variant='danger'> No puedes enviar un mensaje vacio</Alert>
					) : (
						""
					)}

					<button type='submit'>Enviar</button>
				</form>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	);
};
