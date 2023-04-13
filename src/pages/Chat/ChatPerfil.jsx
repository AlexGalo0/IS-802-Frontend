import { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:4000/");
export const ChatPerfil = () => {
	const nombre = localStorage.getItem("nombre");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const receiveMessage = (message) => {
			setMessages([message, ...messages]);
		};
		// socket.on("message", receiveMessage);

		return () => {
			// socket.off("message", receiveMessage);
		};
	}, [messages]);

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// socket.emit("message", message);
		const newMessage = {
			body: message,
			from: "Me",
		};
		setMessages([newMessage, ...messages]);
        console.log(newMessage);
		setMessage("");
	};
	return (
		<>
			<div>
				<h1>Tu eres: {nombre}</h1>
				<h2>Chatea con : undefined</h2>

				<form onSubmit={handleSubmit}>
					<input type='text' onChange={handleChange} value={message} />

					<ul>
						{messages.map((message, index) => (
							<li key={index}>
								<p>
									{message.from} : {message.body}
								</p>
							</li>
						))}
					</ul>
				</form>
			</div>
		</>
	);
};
