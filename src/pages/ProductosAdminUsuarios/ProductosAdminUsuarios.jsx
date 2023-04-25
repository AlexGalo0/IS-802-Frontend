import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  darBajaProductosAdmin,
  obtenerProductosUsuarioDNI,
} from "../../api/sendRequest.api";
import {
  Row,
  Card,
  Container,
  Tooltip,
  OverlayTrigger,
  Modal,
  Alert,
} from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { AsideAdmin } from "../../Components/AsideAdmin";
import { BiLeftArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

export const ProductosAdminUsuarios = () => {
  const { usuariodni } = useParams();
  const { data: productosUsuario } = useQuery({
    queryKey: ["productosUsuario"],
    queryFn: () => obtenerProductosUsuarioDNI(usuariodni),
  });
  function scrollToTop() {
    window.scrollTo(0, 0);
  }
  const renderTooltipBorrar = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Borrar producto
    </Tooltip>
  );
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productoAModificar, setProductoAModificar] = useState();
  const [seEliminoCorrectamente, setSeEliminoCorrectamente] = useState(false);
  const borrarProductoMutation = useMutation({
    mutationFn: (productoABorrar) => {
      darBajaProductosAdmin(usuariodni, productoABorrar);
    },

    onSuccess: () => {
      queryClient.invalidateQueries("productosUsuario");
      setSeEliminoCorrectamente(true);
      setTimeout(() => {
        handleClose();
        setSeEliminoCorrectamente(false);
      }, 1000);
    },
    onError: () => console.log("Hubo un error"),
  });
  const borrarProducto = (productoABorrar) => {
    borrarProductoMutation.mutate(productoABorrar);
  };

  

  return (
    <>
      <Container fluid className="container-grid">
        <header className="headerCrud" /* style={{ paddingTop: "122px" }} */>
          <AsideAdmin/>
          <article
            style={{
              display: "flex",
              justifyContent: "initial",
              alignItems: "center",
              flexDirection: "column",
              padding: "10px",
              minWidth: "83%",
              marginLeft: '249px'
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "40px",
              }}
            >
              <Link to="/admin/usuarios" style={{ textDecoration: "none" }}>
                <button className="Button-back" type="submit">
                  <BiLeftArrow />
                </button>
              </Link>
              <h1 style={{ marginTop: "-8px" }}>
                Productos del usuario con el DNI: {usuariodni}{" "}
              </h1>
            </div>

            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "100%",
              }}
            > */}
              {productosUsuario?.map((producto) => (
                <>
                  <Row xs={1} md={3} className='g-2' style={{ marginTop: "-20px" }}>
            
          
                    <Card className="card">
                      <Container className="card-container">
                        <Card.Img
                          variant="top"
                          src={JSON.parse(producto.imagenes)[0].toString()}
                          className="card-image"
                        />
                      </Container>
                      <Card.Body className="card-body">
                        <Card.Title className="card-title">
                          {producto.nombre}
                        </Card.Title>
                        <Card.Text className="card-medium">
                          Lps. {producto.precio}
                        </Card.Text>
                        <Card.Text className="card-medium">
                          Categoría : {producto.categoria}
                        </Card.Text>
                        <Card.Text className="card-medium">
                          Departamento : {producto.departamento}
                        </Card.Text>
                        <Card.Text className="card-medium">
                          Disponibles en inventario: {producto.cantidad}
                        </Card.Text>
                        <div style={{ display: "flex" }}>
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipBorrar}
                          >
                            <button
                              className="buttonProducto"
                              style={{
                                color: "#f7f7f7",
                                fontSize: "medium",
                                width: "45px",
                              }}
                              onClick={() => {
                                handleShow(), setProductoAModificar(producto);
                              }}
                            >
                              <span className="box">
                                <AiOutlineDelete style={{ fontSize: "35px" }} />
                              </span>
                            </button>
                          </OverlayTrigger>
                        </div>
                      </Card.Body>
                    </Card>
					</Row>
                </>
              ))}
           {/*  </div> */}
          </article>
        </header>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", fontSize: "25px" }}>
            ¿Deseas borrar el producto : {productoAModificar?.nombre}?{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <button
                className="buttonGuardar"
                variant="primary"
                onClick={() => {
                  borrarProducto(
                    productoAModificar?.idProducto.data.toString()
                  );
                }}
              >
                Borrar producto
              </button>
              <button
                variant="secondary"
                onClick={handleClose}
                className="buttonGuardar"
              >
                Cerrar
              </button>
            </div>
            {seEliminoCorrectamente ? (
              <Alert variant="success" style={{ marginTop: "10px" }}>
                ¡Se elimino correctamente!
              </Alert>
            ) : (
              ""
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
