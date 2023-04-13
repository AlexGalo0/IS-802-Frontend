import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import io from "socket.io-client";

const socket = io("http://localhost:4000/");

export const ModalChatVendedor = (props) => {
	
	const nombre = localStorage.getItem("nombre");
	const [message, setMessage] = useState({
		tokenActual : localStorage.getItem("token"),
		idUsuarioProducto : props.vendedor.id_vendedor.toString() || '' ,
		mensaje: "",

		nombreEmisor: localStorage.getItem("nombre"),
	});
	const [messages, setMessages] = useState([]);
	const [cerrar, setCerrar] = useState(false);

	const handleCerrar = () => setCerrar(true);

	useEffect(() => {
		const receiveMessage = (message) => {
			setMessages([message, ...messages]);
		};
	
		socket.on("envio-mensaje", receiveMessage);

		return () => {
			socket.off("envio-mensaje", receiveMessage);
		};
	}, [messages]);

	const handleChange = (e) => {
		setMessage({
			...message, // copia los valores previos de message
			mensaje: e.target.value, // actualiza el valor de mensaje
		  });
	};


	
	// 	const newMessage = {
	// 		body: message,
	// 		from: "Me",
	// 	};
	// 	setMessages([newMessage, ...messages]);
	// 	setMessage("");
	// };

	const enviarDatos = async (data)=>{
		await axios.post('http://localhost:4000/saveMessage',data)
	}
	const handleSubmit = (e) => {
		e.preventDefault();
	  
		const newMessage = {
		  body: message.mensaje,
		  from: "Me",
		  tokenActual: message.tokenActual,
		  idUsuarioProducto: message.idUsuarioProducto,
		  nombreEmisor: message.nombreEmisor
		};
		socket.emit("envio-mensaje", message);
		enviarDatos(message)
		setMessages([newMessage, ...messages]);
		setMessage({
		  ...message,
		  mensaje: "",
		});
	  };
	return (
		<Modal show={props.modalShow}>
			<Modal.Header closeButton>
				<Modal.Title>
					Establece un chat con : {props.vendedor.nombreVendedor}, tu eres{" "}
					{nombre}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					<input type='text' onChange={handleChange} value={message.mensaje} />

					<ul>
						{messages.map((message, index) => (
							<li key={index}>
								<p>
									{message.from} : {message.body.mensaje}
								</p>
							</li>
						))}
					</ul>
					{/* 					
					<button onClick={()=>{
						console.log(object);
					}}>Imprimir</button> */}
					<button type='submit'>Enviar</button>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<button
					onClick={() => {
						props.setShowModal(false);
					}}
				>
					Cerrar
				</button>
			</Modal.Footer>
		</Modal>
	);
};
