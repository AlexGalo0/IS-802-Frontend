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
  Container,
} from "react-bootstrap";
import "./styles/styleArticulos.css";
import { useState, useEffect } from "react";
// import { get, useForm } from "react-hook-form";
// import { FiMenu } from "react-icons/fi";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import primera from "../../assets/1.png";
import segunda from "../../assets/4.png";
import tercera from "../../assets/3.png";
import ejem from "../../assets/ejem.jpeg";
import logo from "../../assets/logo.png";
import { BsFacebook, BsTwitter, BsInstagram, BsDiscord } from "react-icons/bs";
import { FaCopyright } from "react-icons/fa";
import { CartaProducto } from "./Components/CartaProducto";

export const PaginaPrincipal = () => {
  /* Elentos del boton categorias */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [productInfo, setProductInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const URL = `http://localhost:4000/pagination/:${pageNumber}`;
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((product) => {
        setProductInfo(product); //Esto en teoria , deberia ser un arreglo con 9 productos
      });
  }, [productInfo]); //Este product info en los filtros deberia funcionar

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
          <span className="letterHeader">
            ¿Ya sigues nuestras redes sociales?
          </span>
          <span className="letterLightHeader">
            Si quieres mantenerte informado de todas las novedades y promociones, no olvides
            visitar nuestras redes sociales.......
          </span>
          <ul className="ulRedes">
            <li className="liRedes">
              <span className="redes">
                <BsFacebook className="i" />
              </span>
              <span className="titulo">Facebook</span>
            </li>
            {/* <li className="liRedes">
              <span className="redes">
                <BsTwitter className="i" />
              </span>
              <span className="titulo">twitter</span>
            </li> */}
            <li className="liRedes">
              <span className="redes">
                <BsInstagram className="i" />
              </span>
              <span className="titulo">instagram</span>
            </li>
            <li className="liRedes">
              <span className="redes">
                <BsDiscord className="i" />
              </span>
              <span className="titulo">discord</span>
            </li>
          </ul>
        </div>

        <div className="navbar">
          <Image src={logo} className="image-logo" />
          <div className="buscador-div">
            <Form.Control
              className="buscador"
              type="text"
              style={{ paddingLeft: "8px", paddingRight: "8px" }}
            />
            <button className="btnBuscar">
              <BiSearchAlt className="iconBuscar" />
              <span className="textBuscar">Buscar</span>
            </button>
          </div>

          <div
            className="botonLogin"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <button className="regis">Inicia sesion</button>
            <button className="regis">Registrate</button>
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
              width: "279px",
              height: "51px",
              display: "flex",
            }}
          >
            {" "}
            {/* Boton categorias */}
            <div className="section-header">
              <button onClick={handleShow} className="btn">
                <span className="icon">
                  <svg viewBox="0 0 175 80" width="40" height="40">
                    <rect width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                    <rect
                      y="30"
                      width="80"
                      height="15"
                      fill="#f0f0f0"
                      rx="10"
                    ></rect>
                    <rect
                      y="60"
                      width="80"
                      height="15"
                      fill="#f0f0f0"
                      rx="10"
                    ></rect>
                  </svg>
                </span>
                <span className="text">Categorias</span>
              </button>

              <Offcanvas show={show} onHide={handleClose} className="canvas">
                <Form className="formCategory">
                  <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>
                      <p
                        style={{
                          color: "#f7f7f7",
                          textAlign: "left",
                          marginLeft: "-5px",
                          marginRight: "10px",
                          fontSize: "26px",
                          fontWeight: "400",
                          marginBottom: "-55px",
                          marginTop: "-20px",
                        }}
                      >
                        Categorias a mostrar:
                      </p>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Form>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input className="yep" id="check-apple" type="checkbox" />
                          <label for="check-apple"></label>
                        </div>
                        <p>Todas</p>
                      </div>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input
                            class="yep"
                            id="check-apple1"
                            type="checkbox"
                          />
                          <label for="check-apple1"></label>
                        </div>
                        <p>Inmuebles</p>
                      </div>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input
                            className="yep"
                            id="check-apple2"
                            type="checkbox"
                          />
                          <label for="check-apple2"></label>
                        </div>
                        <p>Vehículos</p>
                      </div>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input
                            className="yep"
                            id="check-apple3"
                            type="checkbox"
                          />
                          <label for="check-apple3"></label>
                        </div>
                        <p>Hogar</p>
                      </div>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input
                            className="yep"
                            id="check-apple4"
                            type="checkbox"
                          />
                          <label for="check-apple4"></label>
                        </div>
                        <p>Futuros Paders</p>
                      </div>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input
                            className="yep"
                            id="check-apple5"
                            type="checkbox"
                          />
                          <label for="check-apple5"></label>
                        </div>
                        <p>Mascotas</p>
                      </div>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input
                            className="yep"
                            id="check-apple6"
                            type="checkbox"
                          />
                          <label for="check-apple6"></label>
                        </div>
                        <p>Electrónica</p>
                      </div>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input
                            className="yep"
                            id="check-apple7"
                            type="checkbox"
                          />
                          <label for="check-apple7"></label>
                        </div>
                        <p>Servicios</p>
                      </div>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input
                            className="yep"
                            id="check-apple8"
                            type="checkbox"
                          />
                          <label for="check-apple8"></label>
                        </div>
                        <p>Negocios</p>
                      </div>
                      <div className="checkbox">
                        <div className="checkbox-apple">
                          <input
                            className="yep"
                            id="check-apple9"
                            type="checkbox"
                          />
                          <label for="check-apple9"></label>
                        </div>
                        <p>Empleos</p>
                      </div>
                    </Form>
                  </Offcanvas.Body>
                  <button
                    className="buttonProducto"
                    style={{
                      color: "#f7f7f7",
                      fontSize: "larger",
                      margin: "auto",
                      marginBottom: "10px",
                    }}
                  >
                    <span className="box">Aplicar</span>
                  </button>
                </Form>
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
                <Container
                    className="card-container-new">
                  <Card.Img
                    variant="top"
                    src={segunda}
                    className="card-image-new"
                  />
                  </Container>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="card-newProduct">
                <Container
                    className="card-container-new">
                  <Card.Img
                    variant="top"
                    src={primera}
                    className="card-image-new"
                  />
                  </Container>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="card-newProduct">
                <Container
                    className="card-container-new">
                  <Card.Img
                    variant="top"
                    src={tercera}
                    className="card-image-new"
                  />
                  </Container>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="card-newProduct">
                <Container
                    className="card-container-new">
                  <Card.Img
                    variant="top"
                    src={segunda}
                    className="card-image-new"
                  />
                  </Container>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="card-newProduct">
                <Container
                    className="card-container-new">
                  <Card.Img
                    variant="top"
                    src={segunda}
                    className="card-image-new"
                  />
                  </Container>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="card-newProduct">
                <Container
                    className="card-container-new">
                  <Card.Img
                    variant="top"
                    src={segunda}
                    className="card-image-new"
                  />
                  </Container>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
                  </Card.Body>
                </Card>
              </div>
            </div>
            {/* Imagenes de productos */}
          </div>
          <div style={{ width: "1630px", zIndex: '1'}}>
            <div
              style={{
                height: "550px",
                width: "1200px",
                padding: "25px ",
              }}
            >
              <Carousel variant="dark" className="carousel-style">
                <Carousel.Item>
                  <Image src={ejem} className="image-carousel" />
                  <Carousel.Caption
                    className="carousel"
                    style={{ color: "#f7f7f7" }}
                  >
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={ejem} className="image-carousel" />

                  <Carousel.Caption
                    className="carousel"
                    style={{ color: "#f7f7f7" }}
                  >
                    <h3>Second slide label</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={ejem} className="image-carousel" />

                  <Carousel.Caption
                    className="carousel"
                    style={{ color: "#f7f7f7" }}
                  >
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    src={ejem}
                    className="image-carousel"
                  />

                  <Carousel.Caption className="carousel" 
                    style={{ color: "#f7f7f7" }}>
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
                {/*isLoading ? <p>Cargando...</p> : null*/}

                {/*
Aqui se generaran todos los productos
  //Falta el key que me retornara producto
  productInfo.map((product) => {
    <CartaProducto producto={product} />;
  })
*/}

                <Card className="card">
                  <Container className="card-container">
                    <Card.Img
                      variant="top"
                      src={segunda}
                      className="card-image"
                    />
                  </Container>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">PRUEBA</Card.Title>
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
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
                  <Container className="card-container">
                    <Card.Img
                      variant="top"
                      src={primera}
                      className="card-image"
                    />
                  </Container>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
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
                <Container
                    className="card-container">
                  <Card.Img
                    variant="top"
                    src={tercera}
                    className="card-image"
                  />
                  </Container>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Card Title</Card.Title>
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {/* Apartado de promociones */}
            <div
              style={{
                height: "250px",
                width: "100%",
                padding: "20px 20px",
              }}
            >
              <div className="promo">
                <p>Hola</p>
              </div>
            </div>

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
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
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
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
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
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="div-imagenes" style={{marginTop: '10px'}}>
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
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
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
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
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
                    <Card.Text className="card-medium">lps. 00000</Card.Text>
                    <button
                      className="buttonProducto"
                      style={{ color: "#f7f7f7", fontSize: "medium" }}
                    >
                      <span className="box">Ver producto</span>
                    </button>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div
              className="pagination"
            >
              {
                //Crear funcion de Paginacion
              }
              <section className="secPagination" style={{marginTop: '-14px'}}>
                <ul className="ulPagination">
                  <a href="" className="aPagination">
                    <li className="liPagination">Anterior</li>
                  </a>
                  <a href="" className="aPagination">
                    <li className="liPagination">Siguiente</li>
                  </a>
                  <a href="" className="aPagination active">
                    <li className="liPagination">1</li>
                  </a>
                  <a href="" className="aPagination">
                    <li className="liPagination">2</li>
                  </a>
                  <a href="" className="aPagination">
                    <li className="liPagination">3</li>
                  </a>
                  <a href="" className="aPagination">
                    <li className="liPagination">...</li>
                  </a>
                  <a href="" className="aPagination">
                    <li className="liPagination">15</li>
                  </a>
                </ul>
              </section>
            </div>
            {/* Apartado de pagination */}
          </div>
        </div>

        <footer>
          <div className="top-footer">
            <span className="letterLightFooter">
              Los principales distribuidores y grandes vendedores trabajan con{" "}
              <span style={{ color: "#e211cc" }}>Market</span>
              <span style={{ color: "#dfbee5" }}>Place</span>504
            </span>
          </div>

          <div className="navbar-footer">
            <div
              style={{
                display: "flex",
                gap: "25px",
                fontSize: "larger",
                marginBottom: "5px",
              }}
            >
              <div>
                <button className="buttonFooter">Terminos y condiciones</button>
              </div>
              <div>
                <button className="buttonFooter">Sobre nosotros</button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaCopyright
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              2023 MarketPlace504.hn
            </div>
          </div>
        </footer>
      </body>
    </>
  );
};
