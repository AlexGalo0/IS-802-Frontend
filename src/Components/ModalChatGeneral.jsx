import axios from "axios";
/* import { useState, useEffect } from "react"; */

import io from "socket.io-client";

import { MdSend } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";

const socket = io("http://localhost:4000/");

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Form,
  Image,
  Carousel,
  Table,
  OverlayTrigger,
  Tooltip,
  Alert,
  Modal,
} from "react-bootstrap";
import { NavbarsLogueado } from "../Components/NavbarLogueado";
import { Footers } from "../Components/Footer";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from "react-router";
import { BiSearchAlt, BiUser } from "react-icons/bi";

export const ModalChatGeneral = ({
  showGeneral,
  handleCerrarGeneral,
  vendedor,
}) => {
  const nombre = localStorage.getItem("nombre");
  const token = localStorage.getItem("token");
  const apellido = localStorage.getItem("apellido");
  const nombreCompleto = `${nombre} ${apellido}`;
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
    socket.on("envio-mensaje-general", receiveMessage);

    return () => {
      socket.off("envio-mensaje-general", receiveMessage);
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
    socket.emit("envio-mensaje-general", newMessage);

    // enviarDatos(message);
    setMessages([...messages, newMessage]);
    setErrorMensaje(false);
    setMessage("");
    e.target[0].value = "";
  };

  /* Con este codigos logramos que al aniadir un mensaje se haga scroll automaticamente hacia abajo */
  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
  };

  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate(-1);
  };

  return (
    <>
      <Container fluid className="container-grid">
        <NavbarsLogueado />
        <main className="asiPrincipalGeneral">
          <aside
            className="text-center"
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "initial",
              flexDirection: "column",
            }}
          >
            <button
              className="Button-back"
			  style={{zIndex: '1'}}
              type="submit"
              onClick={handleRedirection}
            >
              <BiLeftArrow />
            </button>
            <p
              style={{
                fontSize: "25px",
                textAlign: "center",
                marginTop: "-45px",
              }}
            >
              Bienvenido {nombre}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "-10px",
                gap: "5px",
                marginBottom: "10px",
              }}
            >
              <input className="buscador-div2" type="text" />
              <button
                type="submit"
                className="btnFiltros"
                style={{ width: "45px", marginTop: "-1px" }}
              >
                <span className="textBuscar">
                  <BiSearchAlt style={{ width: "30px", height: "40px" }} />
                </span>
              </button>
            </div>

            <div className="usuariosChat">
				{/* Este es un usuario */}
              <div
                className="hoverChat"
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                <div
                  className="menChat"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                  }}
                >
                  <BiUser style={{ width: "25px", height: "25px" }} />
                </div>
                <button
                  className="btnChat" 
                >
                  {nombre} {apellido} fsdf jhsdkjfhkjshdfk hskdjfh k
                </button>
              </div>
              <hr />

				  {/* Este es otro usuario de ejemplo */}
              <div
                className="hoverChat"
                style={{
                  display: "flex",
                   gap: "5px",
                }}
              >
                <div
                  className="menChat"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                  }}
                >
                  <BiUser style={{ width: "25px", height: "25px" }} />
                </div>
                <button
                  className="btnChat" 
                >
                  {nombre} {apellido} fsdf jhsdkjfhkjshdfk
                </button>
              </div>

			  

            </div>
          </aside>
          <article className="artChatGeneral">
            <p style={{ fontSize: "25px", textAlign: "center" }}>
              {nombre} {apellido}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mensajesPadreGeneral">
                <div className="mensajes">
                  <ul>
                    {messages.map((message, index) => (
                      <li key={index} style={{ listStyle: "none" }}>
                        {localStorage.nombre === message.from ? (
                          <p
                            style={{
                              marginBottom: "-1px",
                              textAlign: "end",
                              marginRight: "15px",
                              clear: "both",
                            }}
                          >
                            Tú:
                          </p>
                        ) : (
                          <p style={{ marginBottom: "-1px", clear: "both" }}>
                            {message.from}:
                          </p>
                        )}
                        {localStorage.nombre === message.from ? (
                          <div
                            className="menChat"
                            style={{
                              float: "right",
                              clear: "both",
                              marginRight: "13px",
                              maxWidth: "650px",
                            }}
                          >
                            <p style={{ margin: "1px" }}>
                              {/* {message.from} :  */}
                              {message.body}
                            </p>
                          </div>
                        ) : (
                          <div
                            className="menChatUser"
                            style={{
                              maxWidth: "650px",
                            }}
                          >
                            <p style={{ margin: "1px" }}>
                              {/* {message.from} :  */}
                              {message.body}
                            </p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  {errorMensaje ? (
                    <Alert
                      variant="danger"
                      style={{ margin: "auto", marginBottom: "10px" }}
                    >
                      {" "}
                      ¡No puedes enviar un mensaje vacío!
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
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <input
                  className="inPrecio"
                  style={{ width: "580px" }}
                  type="text"
                  onChange={handleChange}
                  value={message.mensaje}
                />
                <button
                  type="submit"
                  className="btnComent"
                  style={{
                    width: "110px",
                    margin: "auto",
                    marginLeft: "-140px",
                  }}
                  /* scroll hacia abajo */
                  onClick={scrollToBottom}
                >
                  <MdSend
                    className="iconBuscar"
                    style={{ marginLeft: "1px" }}
                  />
                  <span className="textComent" style={{ marginLeft: "11px" }}>
                    Enviar
                  </span>
                </button>
              </div>
            </form>
            {/* </Modal.Body> */}
          </article>
        </main>
        <Footers />
      </Container>

      {/* <Modal.Footer></Modal.Footer>
			</Modal> */}
    </>
  );
};
