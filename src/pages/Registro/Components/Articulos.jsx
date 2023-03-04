import "bootstrap/dist/css/bootstrap.min.css";
import {
  Offcanvas,
  Form,
  Image,
  Carousel,
  OverlayTrigger,
  Tooltip,
  Pagination,
  Card,
} from "react-bootstrap";
import "../styles/styleArticulos.css";
import { useRef, useState } from "react";
import { get, useForm } from "react-hook-form";
import { FiMenu } from "react-icons/fi";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import { comprobarEdad } from "../helpers";
import { createUser } from "../../../api";
import { Contrato } from "./UI";
import { useNavigate } from "react-router";
import primera from "../styles/1.png";
import logo from "../styles/logo.png";

export const PaginaPrincipal = () => {
  /* Elentos del boton categorias */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Inicia sesion
    </Tooltip>
  );

  return (
    <>
      <body className="body">
        <div className="top-header">
          <div className="top-header-right">
            <a href="">Facebook</a>
            <a href="">Instagram</a>
            <a href="">Twitter</a>
          </div>
        </div>

        <div className="navbar">
          <Image src={logo} className="image-logo" />
          <div className="buscador-div">
            <Form.Control
              className="buscador"
              type="text"
              style={{ paddingLeft: "8px", paddingRight: "8px" }}
            />
            <button className="button-buscar">
              <BiSearchAlt style={{ fontSize: "25" }} />
              Buscar
            </button>
          </div>

          <div
            className="botonLogin"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <button
              className="button-login"
              style={{ color: "#f7f7f7", fontSize: "larger" }}
            >
              <span class="box">Iniciar sesion</span>
            </button>
            <button
              className="button-login"
              style={{ color: "#f7f7f7", fontSize: "larger" }}
            >
              <span class="box">Registrate</span>
              
            </button>
          </div>
          <div>
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <button className="button-cuenta">
                <BiUser />
              </button>
            </OverlayTrigger>
          </div>
        </div>

        <div className="div-principal">
          <div
            style={{
              width: "15%",
              height: "51px",
              display: "flex",
            }}
          >
            {" "}
            {/* Boton categorias */}
            <div className="section-header">
              <button onClick={handleShow} className="button-category">
                <FiMenu style={{ fontSize: "25", marginRight: "10px" }} />
                Categorias
              </button>

              <Offcanvas show={show} onHide={handleClose} className="canvas">
                <Offcanvas.Header closeButton closeVariant="white">
                  <Offcanvas.Title>
                    <h2>Elija las categorias que desea ver:</h2>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form>
                    <div className="checkbox">
                      <div class="checkbox-apple">
                        <input class="yep" id="check-apple" type="checkbox" />
                        <label for="check-apple"></label>
                      </div>
                      <p>Categoria 1</p>
                    </div>
                    <div className="checkbox">
                      <div class="checkbox-apple">
                        <input class="yep" id="check-apple2" type="checkbox" />
                        <label for="check-apple2"></label>
                      </div>
                      <p>Categoria 1</p>
                    </div>
                    <div className="checkbox">
                      <div class="checkbox-apple">
                        <input class="yep" id="check-apple3" type="checkbox" />
                        <label for="check-apple3"></label>
                      </div>
                      <p>Categoria 1</p>
                    </div>
                    <div className="checkbox">
                      <div class="checkbox-apple">
                        <input class="yep" id="check-apple4" type="checkbox" />
                        <label for="check-apple4"></label>
                      </div>
                      <p>Categoria 1</p>
                    </div>
                    <div className="checkbox">
                      <div class="checkbox-apple">
                        <input class="yep" id="check-apple5" type="checkbox" />
                        <label for="check-apple5"></label>
                      </div>
                      <p>Categoria 1</p>
                    </div>
                    <div className="checkbox">
                      <div class="checkbox-apple">
                        <input class="yep" id="check-apple6" type="checkbox" />
                        <label for="check-apple6"></label>
                      </div>
                      <p>Categoria 1</p>
                    </div>
                  </Form>
                </Offcanvas.Body>
                <button className="button-aplicar">Aplicar</button>
              </Offcanvas>
            </div>
            <div
              className="section-lastProduct-tittle"
              style={{ marginTop: "51px" }}
            >
              <p>¡Productos nuevos!</p>
            </div>
            {/* Titulo de nuevos productos */}
            <div className="section-lastProduct" style={{ marginTop: "98px" }}>
              <div>
                <Card className="card-newProduct">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="card-newProduct">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="card-newProduct">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="card-newProduct">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="card-newProduct">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
            </div>
            {/* Imagenes de productos */}
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                height: "550px",
                width: "100%",
                padding: "25px ",
              }}
            >
              <Carousel variant="dark" className="carousel-style">
                <Carousel.Item>
                  <Image src={primera} className="image-carousel" />
                  <Carousel.Caption className="carousel">
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={primera} className="image-carousel" />

                  <Carousel.Caption className="carousel">
                    <h3>Second slide label</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={primera} className="image-carousel" />

                  <Carousel.Caption className="carousel">
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={primera} className="image-carousel" />

                  <Carousel.Caption className="carousel">
                    <h3>Four slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
            {/* Carrusel */}
            <div className="div-imagenes">
              {/* Primera linea de imagenes */}
              <div
                style={{
                  height: "100%",
                  width: "527px",
                }}
              >
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d asd asd asd
                      asdasdaasd a
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "527px",
                }}
              >
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d asd asd asd
                      asdasdaasd a
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "527px",
                }}
              >
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d asd asd asd
                      asdasdaasd a
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div
              style={{
                height: "250px",
                width: "100%",
                padding: "20px 15px",
              }}
            >
              <div className="promo">
                <p>Hola</p>
              </div>
            </div>
            {/* Apartado de promociones */}

            <div className="div-imagenes">
              {/* Segunda linea de imagenes */}
              <div
                style={{
                  height: "100%",
                  width: "527px",
                }}
              >
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d asd asd asd
                      asdasdaasd a
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "527px",
                }}
              >
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d asd asd asd
                      asdasdaasd a
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "527px",
                }}
              >
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d asd asd asd
                      asdasdaasd a
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="div-imagenes">
              {/* Tercera linea de imagenes */}
              <div
                style={{
                  height: "100%",
                  width: "527px",
                }}
              >
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "527px",
                }}
              >
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "527px",
                }}
              >
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image"
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content. asdasda sadas as
                      ddsa dasdasd asd sad as dasd as asda as d
                    </Card.Text>
                    <button className="button-verProduct">Ver producto</button>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div
              style={{
                height: "88px",
                width: "100%",
              }}
            >
              <Pagination size="lg" className="pagination" bsPrefix="">
                {/* podemos modificar esto desde css como queramos */}
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
            {/* Apartado de pagination */}
          </div>
        </div>

        <footer>
          <div className="top-header-xd"></div>

          <div className="navbar-xd"></div>
        </footer>
      </body>
    </>
  );
};
