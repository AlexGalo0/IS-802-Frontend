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
	const token = localStorage.getItem("token")

	const idResultado = producto?.idProducto?.data

	const idProducto = idResultado?.join('') || ''
	
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [datosDeChat, setDatosDeChat] = useState({
		tokenActual: localStorage.getItem("token"),
		idUsuarioProducto: vendedor?.id_vendedor?.toString
			? vendedor.id_vendedor.toString()
			: "",
		mensaje: "",
		nombreEmisor: localStorage.getItem("nombre"),
		idProducto:idProducto
	});

	const [showConfirmSale, setShowConfirmSale] = useState(false); //Confirmacion de Venta

	useEffect(() => {
		const receiveMessage = (message) => {
			setMessages([...messages, message]);
		};
		socket.on("envio-mensaje-producto", receiveMessage);
		socket.on("confirmarVenta", () => {
			setShowConfirmSale(true); //Renderizar el Div
		});

		const datosInicializacion = {
			token:token,
			idProducto:idProducto
		}

		socket.emit("chat-producto", datosInicializacion)//Evento que se dispara cuando un usuario inicia sesión

		return () => {
			socket.off("envio-mensaje-producto", receiveMessage);
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
			idProducto:idProducto
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

	function handleConfirmSale() {
	
		socket.emit("confirmarVenta");
	}


	const enviarVenta=()=>{
		console.log('Me vendieron!');
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
				<button onClick={handleConfirmSale} disabled={showConfirmSale}>Confirmar venta</button>
				{showConfirmSale && (
					<alert>
						<p>Deseas confirmar la venta?</p>
						<button onClick={enviarVenta}>Confirmar</button>
						<button>Cancelar</button>
					</alert>
				)}

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
