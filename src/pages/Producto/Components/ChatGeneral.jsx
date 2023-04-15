import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import io from "socket.io-client";

const socket = io("http://localhost:4000/");
export const ChatGeneral = ({
    showGeneral,
    handleCerrarGeneral,
    vendedor
}) => {
    const nombre = localStorage.getItem("nombre");
	const token = localStorage.getItem("token")


	
	
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
		socket.on("envio-mensaje-producto", receiveMessage);
		

		
		socket.emit("general-envio", datosInicializacion)//Evento que se dispara cuando un usuario inicia sesión

		return () => {
			socket.off("general-envio-mensaje", receiveMessage);
			// socket.on("confirmarVenta", () => {
			// 	setShowConfirmSale(false?'??'); //Renderizar el Div
			// });
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
		socket.emit("general-envio-mensaje", newMessage);
		
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
		await axios.post("http://localhost:4000/saveMessage", data); //Deberia ser ruta distinta?
	};


/* Codigo para confirmar venta */



	
	return (
		<Modal show={showGeneral} onHide={handleCerrarGeneral}>
			<Modal.Header closeButton>
				<Modal.Title>
					Establece un chat con : {vendedor?.nombreVendedor}
					
					
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				

				<form onSubmit={handleSubmit}>
					<input type='text' onChange={handleChange} value={message.mensaje} />
					<button type='submit'>Enviar Mensaje</button>
					<ul>
						{messages.map((message, index) => (
							<li key={index}>
								{
									localStorage.nombre === message.from ? 'Yo envie el mensaje' : ' Yo no '
								}
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
				</form>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	);
};
