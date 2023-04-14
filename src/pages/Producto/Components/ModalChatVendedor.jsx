import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import io from "socket.io-client";

const socket = io("http://localhost:4000/");

export const ModalChatVendedor = ({
	showModal,
	vendedor,
	producto,
	handleCerrarModal,
}) => {
	const nombre = localStorage.getItem("nombre");

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

	const cerrarModal = () => {
		handleCerrarModal();
	};

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
	


	
	const [mostrarModalConfirmarVenta, setMostrarModalConfirmarVenta] = useState(false)



	const confirmarVenta = (e)=>{
		e.preventDefault()
		
	}
	return (
		<Modal show={showModal} onHide={handleCerrarModal}>
			<Modal.Header closeButton>
				<Modal.Title>
					Establece un chat con : {vendedor?.nombreVendedor}
					<br />
					sobre {producto?.nombre}
					<br />
					Cantidad Total: {producto?.cantidad}
					<br />
					Precio : {producto?.precio}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					<input type='text' onChange={handleChange} value={message.mensaje} />
					<button type='submit'>Enviar Mensaje</button>
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
					<button onClick={confirmarVenta}>Confirmar Venta</button>
				</form>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	);
};
