import {useState,useEffect} from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
const socket = io("http://localhost:4000/");
export const ChatGeneral = () => {
	let { idVendedor } = useParams();
	const nombre = localStorage.getItem("nombre");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
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
		// setDatosDeChat({
		// 	...datosDeChat,
		// 	mensaje: value,
		// });
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

		setMessages([...messages, newMessage]);
		setErrorMensaje(false);
		setMessage("");
		e.target[0].value = "";
	};
	/* Para envio al server, tal vez sirve de nuevo ac[a] */
	// const [datosDeChat, setDatosDeChat] = useState({
	// 	tokenActual: localStorage.getItem("token"),
	// 	idUsuarioProducto:vendedor?.id_vendedor?.toString
	// 		? vendedor.id_vendedor.toString()
	// 		: "",
	// 	mensaje: "",
	// 	nombreEmisor: localStorage.getItem("nombre"),
	// });

	/* Ese idVendedor puede ser util para recuperar  info del servidor*/
	return (
		<>
			<h1>Chat General con --- </h1>

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
		</>
	);
};
