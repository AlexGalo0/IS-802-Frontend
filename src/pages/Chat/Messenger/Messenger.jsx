import Conversation from "../Components/Conversation/Conversation";
import Message from "../Components/Message/Message";
import "./Messenger.css";
import { useEffect, useRef, useState, useContext } from "react";
import { UserMongoContext } from "../../../context";
import axios from "axios";
import { io } from "socket.io-client";
import { ChatOnline } from "../Components/ChatOnline";
import { useQuery } from "@tanstack/react-query";
export const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const { UserMongo } = useContext(UserMongoContext);

  const correoUsuarioActual = localStorage.getItem("correo");
  const obtenerTodosLosUsuarios = async () => {
    const res = await axios.get(`http://localhost:4000/usersMongo`);
    return res.data;
  };

  const guardarConversacion = async (data) => {
    const res = await axios.post(`http://localhost:4000/new_conversation`, {
      data,
    });
    return res.data;
  };

  const { data: todosUsuarios } = useQuery({
    queryKey: ["todosUsuarios"],
    queryFn: obtenerTodosLosUsuarios,
    onSuccess: () => setOnlineUsers(todosUsuarios),
  });

  useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setTimeout(() => {
        setMessages((prev) => [...prev, arrivalMessage]);

        guardarConversacion({
          senderId: UserMongo[0]._id,
          receiverId: arrivalMessage.sender,
        });
      }, 1000);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", UserMongo[0]._id);
  }, [UserMongo]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/conversations/" + UserMongo._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [UserMongo[0]._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: UserMongo[0]._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    socket.current.emit("sendMessage", {
      senderId: UserMongo[0]._id,
      receiverId: currentChat._id,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:4000/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <h1>Soy {UserMongo[0].nombres}</h1>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />

            {todosUsuarios?.map((usuario) => (
              <>
                {usuario._id !== UserMongo[0]._id ? (
                  <div className="conversation">
                    <div onClick={() => setCurrentChat(usuario)}>
                      <span className="conversationName">
                        {usuario?.nombres} {usuario?.apellidos}
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === UserMongo[0]._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={UserMongo._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};
