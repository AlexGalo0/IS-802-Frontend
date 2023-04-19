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
  const [cantidad, setCantidad] = useState(1);
  const [datosDeChat, setDatosDeChat] = useState({
    tokenActual: localStorage.getItem("token"),
    idUsuarioProducto: vendedor?.id_vendedor?.toString
      ? vendedor.id_vendedor.toString()
      : "",
    mensaje: "",
    nombreEmisor: localStorage.getItem("nombre"),
    idProducto: idProducto,
    cantidad : cantidad
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
    socket.on("confirmar-venta", () => {
      setShowConfirmSale(true); //Renderizar el Div
    });

    socket.emit("chat-producto", datosInicializacion)//Evento que se dispara cuando un usuario inicia sesión

    return () => {
      socket.off("envio-mensaje-producto", receiveMessage);
      // socket.on("confirmar-venta", () => {
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
  const handleInputChange = (event) => {
    setCantidad(event.target.value);
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
    socket.emit("confirmar-venta");
  }

  const enviarVenta = () => {
    const datosDeCompra = {
      tokenActual: localStorage.getItem("token"),
      idVendedor: vendedor?.id_vendedor.toString(),
      idProducto: idResultado.toString(),
      cantidad:cantidad
    }
    console.log("Los datos de compra son: ", datosDeCompra);
    axios.put(`http://localhost:4000/product/confirmar-compra/${datosDeCompra.tokenActual}`, datosDeCompra);
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
              Vendedor :  {vendedor?.nombreVendedor}
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
            <div style={{marginTop: "85px", display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={handleConfirmSale} disabled={showConfirmSale} className='buttonProducto' style={{
									color: "#f7f7f7",
									fontSize: "medium",
									backgroundColor: "#365662",
								}}> <span className='box'>Confirmar venta</span></button>
				{showConfirmSale && (
					<alert style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '17px', marginTop: '10px'}}>
						<p>¿Deseas confirmar la venta?</p>
            <div style={{display: 'flex'}}>
						<button onClick={enviarVenta} className='buttonProducto' style={{
									color: "#f7f7f7",
									fontSize: "medium",
									backgroundColor: "#365662",
								}}><span className='box'>Confirmar</span></button>
						<button className='buttonProducto' style={{
									color: "#f7f7f7",
									fontSize: "medium",
									backgroundColor: "#365662",
								}} onClick={()=>{
                  socket.on("confirmar-venta", () => {
                    setShowConfirmSale(true); //Renderizar el Div
                  });
                }}><span className='box'>Cancelar</span></button>
                </div>
                <label htmlFor="">Cantidad</label>
                <input  value={cantidad} type="number" onChange={handleInputChange}  />
					</alert>
				)}
        </div>

            <form onSubmit={handleSubmit}>
              <div
                className="mensajesPadre"
                style={{ height: "390px", marginTop: "15px" }}
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
                          : <p style={{marginBottom: '-1px'}}>{message.from}:</p>}
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
