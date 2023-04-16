import axios from "axios";
/* import { useState, useEffect } from "react"; */
import { Modal, Alert } from "react-bootstrap";
import io from "socket.io-client";
import "../Style/chat.css";


import { MdSend } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";

const socket = io("http://localhost:4000/");
export const ChatGeneral = ({ showGeneral, handleCerrarGeneral, vendedor }) => {
  const nombre = localStorage.getItem("nombre");
  const token = localStorage.getItem("token");

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

    // enviarDatos(message);
    setMessages([...messages, newMessage]);
    setErrorMensaje(false);
    setMessage("");
    e.target[0].value = "";
  };

  // const enviarDatos = async (mensaje) => {
  // 	const data = {
  // 		tokenActual: localStorage.getItem("token"),
  // 		idUsuarioProducto: vendedor?.id_vendedor?.toString()
  // 			? vendedor.id_vendedor.toString()
  // 			: "",
  // 		mensaje: mensaje,
  // 		nombreEmisor: localStorage.getItem("nombre"),
  // 	};
  // 	await axios.post("http://localhost:4000/saveMessage", data); //Deberia ser ruta distinta?
  // };

  /* Codigo para confirmar venta */
  /* const myDivRef = useRef(null);

  const handleScrollToBottom = () => {
    scrollToBottom(myDivRef.current);
  };

  const scrollToBottom = (element) => {
    element.scrollTop = element.scrollHeight - element.clientHeight;
  };

  const handleOnLoad = () => {
    scrollToBottom(myDivRef.current);
  }; */


  /* Con este codigos logramos que al aniadir un mensaje se haga scroll automaticamente hacia abajo */
  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
  };

  return (
    <Modal
      show={showGeneral}
      onHide={handleCerrarGeneral}
      style={{ display: "flex", flexDirection: "row", marginLeft: "-170px" }}
    >
      <main className="asiPrincipal">
        <aside className="asiChat">Perfiles de usuarios con los que podre chat</aside>
        <article className="artChat">
          <Modal.Header closeButton>
            <Modal.Title style={{ height: "15px", fontSize: "25px" }}>
              {/* Establece un chat con :  */}{vendedor?.nombreVendedor}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mensajesPadre" /* ref={myDivRef} onLoad={handleOnLoad} */>
                <div className="mensajes">
                  <ul>
                    {messages.map((message, index) => (
                      <li key={index} style={{listStyle: 'none'}}>
						
                        {localStorage.nombre === message.from
                          ? "Tú"
                          : (vendedor?.nombreVendedor)}:
                        <div className="menChat">
                          <p style={{ margin: "1px" }}>
                            {/* {message.from} :  */}{message.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {errorMensaje ? (
                    <Alert
                      variant="danger"
                      style={{ margin: "auto", marginBottom: "10px" }}
                    >
                      {" "}
                      No puedes enviar un mensaje vacio
                    </Alert>
                  ) : (
                    ""
                  )}
				  {/* scroll hacia abajo */}
				  <div ref={messagesRef} />
                </div >
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
                  className="inPrecio"
                  style={{ width: "380px" }}
                  type="text"
                  onChange={handleChange}
                  value={message.mensaje}
                />
                <button
                  type="submit"
                  className="btnComent"
                  style={{width:'110px'}}
				  /* scroll hacia abajo */
				  onClick={scrollToBottom}
                >
                  <MdSend className="iconBuscar" />
                  <span className="textComent">Enviar</span>
                </button>
              </div>
            </form>
          </Modal.Body>
        </article>
      </main>

      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};
