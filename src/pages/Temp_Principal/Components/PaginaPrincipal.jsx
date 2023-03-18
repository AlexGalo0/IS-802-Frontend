import { Container, Accordion, Form, Card, Row, Col, Carousel, Image} from "react-bootstrap";
import "../Style/Temp_Principal.css";
import imagen from "../../../assets/1.png";
import { FaFilter } from "react-icons/fa";
import { CartaProducto } from "./CartaProducto";
import { useEffect, useState } from "react";
import { FiltroCategorias } from "./FiltroCategorias";
import { FiltroDepartamento } from "./FiltroDepartamentos";
import { FiltroPrecio } from "./FiltroPrecio";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { Footers } from "../../../Components/Footer";
import ejem from "../../../assets/ejem.jpeg";
import segunda from "../../../assets/3.png";
import primera from "../../../assets/4.png";

export const PaginaPrincipal = () => {
  const [productos, setProductos] = useState([]);
  const [numeroPagina, setNumeroPagina] = useState(1);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");

  /* 
		Para filtrado de Precios
	*/
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [precioMaximo, setPrecioMaximo] = useState(0);
  const [preciosCargado, setPreciosCargado] = useState(false);

  /* Renderizado de primera vez */
  const URL = `http://localhost:4000/product/pagination/${numeroPagina}`;
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((product) => {
        setProductos(product);
      });
  }, []);

  /* Renderizado de Categoria */

  useEffect(() => {
    fetch(
      `http://localhost:4000/product/${numeroPagina}/find-categories/${categoriaSeleccionada}`
    )
      .then((response) => response.json())
      .then((product) => {
        setProductos(product);
      });
  }, [categoriaSeleccionada]);

  /* Renderizado de Departamento */
  useEffect(() => {
    fetch(
      `http://localhost:4000/product/${numeroPagina}/find-dpto/${departamentoSeleccionado}`
    )
      .then((response) => response.json())
      .then((product) => {
        setProductos(product);
      });
  }, [departamentoSeleccionado]);

  /* Renderizado por Precio */
  useEffect(() => {
    if (preciosCargado) {
      fetch(
        `http://localhost:4000/product/${numeroPagina}/find-range-price/${precioMinimo}/${precioMaximo}`
      )
        .then((response) => response.json())
        .then((product) => {
          setProductos(product);
        });
    }
    setPreciosCargado(false);
  }, [preciosCargado]);

  const handleSeleccionCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };
  const handleSeleccionDepartamento = (departamento) => {
    setDepartamentoSeleccionado(departamento);
  };
  const handleSeleccionPreciosMaxMin = (precioMin, precioMax) => {
    setPrecioMinimo(precioMin);
    setPrecioMaximo(precioMax);
    setPreciosCargado(true);
  };

  return (
    <Container fluid className="container-grid">
      <NavbarsLR />
      <main>
        <aside className="text-center">
          <h4 className="py-3">
            <FaFilter /> Filtros
          </h4>

          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0"  className="acordion">
              <Accordion.Header>Categorias</Accordion.Header>
              <Accordion.Body>
                <FiltroCategorias
                  onSelectCategoria={handleSeleccionCategoria}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1"  className="acordion">
              <Accordion.Header>Departamentos</Accordion.Header>
              <Accordion.Body>
                <FiltroDepartamento
                  onSelectDepartamentos={handleSeleccionDepartamento}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2"  className="acordion">
              <Accordion.Header>Rango de precios</Accordion.Header>
              <Accordion.Body>
                <FiltroPrecio
                  preciosMaxMinSeleccionados={handleSeleccionPreciosMaxMin}
                />
              </Accordion.Body>
            </Accordion.Item>

            {/* <Accordion.Item eventKey='3'>
							<Accordion.Header>precio</Accordion.Header>
							<Accordion.Body>
								<input
									type='number'
									placeholder='Precio por el que desea filtrar'
								/>
							</Accordion.Body>
						</Accordion.Item> */}
          </Accordion>
        </aside>

        <article>
		<div
            style={{
              height: "450px",
              width: "100%",
              padding: "10px ",
			  marginBottom: '30px'
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
                <Image src={ejem} className="image-carousel" />

                <Carousel.Caption
                  className="carousel"
                  style={{ color: "#f7f7f7" }}
                >
                  <h3>Four slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>

		  
          <Row xs={1} md={4} className="g-4" >
            {/* {productos.map((producto) => (
              <CartaProducto {...producto} />
            ))} */}
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
          </Row>

		  <section className="secPagination">
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
        </article>

        {/* <footer className='d-flex justify-content-around align-items-center'>
					<div>
						<h5>Contactanos</h5>
						<p>admin.correo@marketplace.com</p>
					</div>
					<div className='w-25 d-flex justify-content-around'>
						<h6>Iconos</h6>
					</div>
					<div>Marketplace 2023</div>
				</footer> */}
        <Footers />
      </main>
    </Container>
  );
};
