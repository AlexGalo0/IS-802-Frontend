import axios from "axios"; /* 
import { useState, useEffect } from "react"; */
import { Modal, Alert } from "react-bootstrap";
import io from "socket.io-client";

const socket = io("http://localhost:4000/");

import { MdSend } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";

export const ModalChatVendedor = ({
  showModal,
  vendedor,
  producto,
  handleCerrarModal,
}) => {
  const nombre = localStorage.getItem("nombre");
  const token = localStorage.getItem("token");

  const idResultado = producto?.idProducto?.data;

  const idProducto = idResultado?.join("");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [datosDeChat, setDatosDeChat] = useState({
    tokenActual: localStorage.getItem("token"),
    idUsuarioProducto: vendedor?.id_vendedor?.toString
      ? vendedor.id_vendedor.toString()
      : "",
    mensaje: "",
    nombreEmisor: localStorage.getItem("nombre"),
    idProducto: idProducto,
  });

  const [showConfirmSale, setShowConfirmSale] = useState(false); //Confirmacion de Venta
  const datosInicializacion = {
    token: token,
    idProducto: idProducto,
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([...messages, message]);
    };
    socket.on("envio-mensaje-producto", receiveMessage);
    socket.on("confirmarVenta", () => {
      setShowConfirmSale(true); //Renderizar el Div
    });

    // socket.emit("chat-producto", datosInicializacion)//Evento que se dispara cuando un usuario inicia sesión

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
      idProducto: idProducto,
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

  const enviarVenta = () => {
    console.log("Me vendieron!");
  };

  /* Con este codigos logramos que al aniadir un mensaje se haga scroll automaticamente hacia abajo */
  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCerrarModal}
      style={{ display: "flex", flexDirection: "row", marginLeft: "-45px" }}
    >
      <main className="asiPrincipal">
        <article className="artChat" style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>
          <Modal.Header closeButton>
            <Modal.Title style={{ height: "15px", fontSize: "25px" }}>
              {/* Establece un chat con :  */}
              {vendedor?.nombreVendedor}
              <div style={{ fontSize: "17px", marginTop: "-15px" }}>
                <br />
                Articulo: {producto?.nombre}
                <br />
                Cantidad Total: {producto?.cantidad}
                <br />
                Precio : Lps.{producto?.precio}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showConfirmSale && (
              <alert>
                <p>Deseas confirmar la venta?</p>
                <button onClick={enviarVenta}>Confirmar</button>
                <button>Cancelar</button>
              </alert>
            )}

            <form onSubmit={handleSubmit}>
              <div
                className="mensajesPadre"
                style={{ height: "440px", marginTop: "95px" }}
              >
                <div className="mensajes" style={{ overflow: "auto" }}>
                  {/* 
          <input type="text" onChange={handleChange} value={message.mensaje} />
          <button type="submit">Enviar Mensaje</button> */}
                  <ul>
                        
                    {messages.map((message, index) => (
                      <li key={index} style={{ listStyle: "none" }}>
                        {localStorage.nombre === message.from
                          ? <p style={{marginBottom: '-1px', textAlign: 'end', marginRight: '15px', clear: 'both'}}>Tú:</p>
                          : <p style={{marginBottom: '-1px'}}>{vendedor?.nombreVendedor}:</p>}
                        {localStorage.nombre === message.from
                          ? <div className="menChat" style={{float: 'right', clear: "both", marginRight: '13px'}} >
                          <p style={{ margin: "1px" }}>
                            {/* {message.from} :  */}{message.body}
                          </p>
                        </div>
                          : <div className="menChatUser">
                          <p style={{ margin: "1px" }}>
                            {/* {message.from} :  */}{message.body}
                          </p>
                        </div>}

                        
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
                </div>
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
                  style={{ width: "110px" }}
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
      {/* 
      <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};
