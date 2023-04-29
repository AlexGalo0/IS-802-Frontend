import Conversation from "../Components/Conversation/Conversation";
import Message from "../Components/Message/Message";

import "./Messenger.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { ChatOnline } from "../Components/ChatOnline";
import { useQuery } from "@tanstack/react-query";

export const Messenger = () => {
	// const [conversations, setConversations] = useState([]);
	// const [currentChat, setCurrentChat] = useState(null);
	// const [messages, setMessages] = useState([]);
	// const [newMessage, setNewMessage] = useState("");
	// const [arrivalMessage, setArrivalMessage] = useState(null);
	// const [onlineUsers, setOnlineUsers] = useState([]);
	// const socket = useRef();
	// const { user } = useContext(AuthContext);
	// const scrollRef = useRef();

	// useEffect(() => {
	// 	socket.current = io("http://localhost:4000");
	// 	socket.current.on("getMessage", (data) => {
	// 		setArrivalMessage({
	// 			sender: data.senderId,
	// 			text: data.text,
	// 			createdAt: Date.now(),
	// 		});
	// 	});
	// }, []);
	// useEffect(() => {
	// 	arrivalMessage &&
	// 		currentChat?.members.includes(arrivalMessage.sender) &&
	// 		setMessages((prev) => [...prev, arrivalMessage]);
	// }, [arrivalMessage, currentChat]);

	// useEffect(() => {
	// 	socket.current.emit("addUser", user._id);
	// 	socket.current.on("getUsers", (users) => {
	// 		setOnlineUsers(
	// 			user.followings.filter((f) => users.some((u) => u.userId === f))
	// 		);
	// 	});
	// }, [user]);

	// useEffect(() => {
	// 	const getConversations = async () => {
	// 		try {
	// 			const res = await axios.get("/conversations/" + user._id);
	// 			setConversations(res.data);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	getConversations();
	// }, [user._id]);

	// useEffect(() => {
	// 	const getMessages = async () => {
	// 		try {
	// 			const res = await axios.get("/messages/" + currentChat?._id);
	// 			setMessages(res.data);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	getMessages();
	// }, [currentChat]);
	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const message = {
	// 		sender: user._id,
	// 		text: newMessage,
	// 		conversationId: currentChat._id,
	// 	};

	// 	const receiverId = currentChat.members.find(
	// 		(member) => member !== user._id
	// 	);

	// 	socket.current.emit("sendMessage", {
	// 		senderId: user._id,
	// 		receiverId,
	// 		text: newMessage,
	// 	});

	// 	try {
	// 		const res = await axios.post("/messages", message);
	// 		setMessages([...messages, res.data]);
	// 		setNewMessage("");
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// useEffect(() => {
	// 	scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	// }, [messages]);

	// const obtenerUsuarioPorDNI = async () => {
	//     const correo = localStorage.getItem("correo")
	//     const res = await axios.get(`/users/${correo}`);
	//     console.log(res.data);
	//   }
	const obtenerTodosLosUsuarios = async () => {
		const res = await axios.get(`/user_mongo/alls`);
		console.log(res.data);
		return res.data;
	};

	const { data: todosUsuarios } = useQuery({
        queryKey: ["todosUsuarios"],
		queryFn: obtenerTodosLosUsuarios,
		onSuccess: () => console.log(todosUsuarios),
	});
	return (
		<>
			<div>
				{todosUsuarios?.map((user) => (
					<div>
						<h1>{user.nombre}</h1>
					</div>
				))}
			</div>
		</>
		// <div className='messenger'>
		// 	<div className='chatMenu'>
		// 		<div className='chatMenuWrapper'>
		// 			<input placeholder='Search for friends' className='chatMenuInput' />
		// 			{conversations.map((c) => (
		// 				<div onClick={() => setCurrentChat(c)}>
		// 					<Conversation conversation={c} currentUser={user} />
		// 				</div>
		// 			))}
		// 		</div>
		// 	</div>
		// 	<div className='chatBox'>
		// 		<div className='chatBoxWrapper'>
		// 			{currentChat ? (
		// 				<>
		// 					<div className='chatBoxTop'>
		// 						{messages.map((m) => (
		// 							<div ref={scrollRef}>
		// 								<Message message={m} own={m.sender === user._id} />
		// 							</div>
		// 						))}
		// 					</div>
		// 					<div className='chatBoxBottom'>
		// 						<textarea
		// 							className='chatMessageInput'
		// 							placeholder='write something...'
		// 							onChange={(e) => setNewMessage(e.target.value)}
		// 							value={newMessage}
		// 						></textarea>
		// 						<button className='chatSubmitButton' onClick={handleSubmit}>
		// 							Send
		// 						</button>
		// 					</div>
		// 				</>
		// 			) : (
		// 				<span className='noConversationText'>
		// 					Open a conversation to start a chat.
		// 				</span>
		// 			)}
		// 		</div>
		// 	</div>
		// 	<div className='chatOnline'>
		// 		<div className='chatOnlineWrapper'>
		// 			<ChatOnline
		// 				onlineUsers={onlineUsers}
		// 				currentId={user._id}
		// 				setCurrentChat={setCurrentChat}
		// 			/>
		// 		</div>
		// 	</div>
		// </div>
	);
};
