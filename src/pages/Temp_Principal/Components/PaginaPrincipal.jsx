import {
  Container,
  Accordion,
  Form,
  Card,
  Row,
  Col,
  Carousel,
  Image,
} from "react-bootstrap";
import "../Style/Temp_Principal.css";
import imagen from "../../../assets/1.png";
import { FaFilter } from "react-icons/fa";
import { CartaProducto } from "./CartaProducto";
import { useEffect, useState } from "react";
import { FiltroCategorias } from "./FiltroCategorias";
import { FiltroDepartamento } from "./FiltroDepartamentos";
import { FiltroPrecio } from "./FiltroPrecio";
import { Navegacion } from "./Navegacion";
import { FiltroFecha } from "./FiltroFecha";
import { FiltroPalabrasClave } from "./FiltroPalabrasClave";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { Footers } from "../../../Components/Footer";
import ejem from "../../../assets/ejem.jpeg";
import segunda from "../../../assets/3.png";
import primera from "../../../assets/4.png";
import { useContext } from "react";
import { UserContext,AdminContext } from "../../../context";
export const PaginaPrincipal = () => {
  const { userAuth } = useContext(UserContext);
	

  /* Estado Inicial */
  const [productos, setProductos] = useState([]);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [palabraClave, setPalabraClave] = useState("");

  /* 
		Para filtrado de Precios
	*/
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [precioMaximo, setPrecioMaximo] = useState(0);
  const [preciosCargado, setPreciosCargado] = useState(false);

  const [numeroPagina, setNumeroPagina] = useState(1);
  const [numeroPaginaCategoria, setNumeroPaginaCategoria] = useState(1);
  const [numeroPaginaDepartamento, setNumeroPaginaDepartamento] = useState(1);
  const [cantidadDeDias, setCantidadDeDias] = useState({
    semana: false,
    mes: false,
    tres_meses: false,
    seis_meses: false,
    anio: false,
  });
  const [rutaFecha, setRutaFecha] = useState("");
  const [reiniciar,setReiniciar] = useState(false)

  /* Renderizado de primera vez */
  const URL = `http://localhost:4000/product/pagination/${numeroPagina}`;
  useEffect(() => {
    
    fetch(URL)
      .then((response) => response.json())
      .then((product) => {
        setProductos(product);
      });
  }, [numeroPagina,reiniciar]);

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

  /* 
		Renderizado por Fecha
	*/

  useEffect(() => {
    fetch(
      `http://localhost:4000/product/${numeroPagina}/find-keyword/${palabraClave}`
    )
      .then((response) => response.json())
      .then((product) => {
        setProductos(product);
      });
  }, [palabraClave]);
  /* 
		Renderizado por Palabra Clave
	*/
  
  const actualizarCantidadDeDias = (nuevaCantidadDeDias) => {
    setCantidadDeDias(nuevaCantidadDeDias);
  };

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
  const handlePaginacion = (numeroDePagina) => {
    setNumeroPaginaCategoria(numeroDePagina);
  };

  const handleNDias = (cantidadDeDias) => {
    setCantidadDias(cantidadDeDias);
  };

  const handlePalabraClave = (palabraClave) => {
    setPalabraClave(palabraClave);
  };

  const handlerReiniciar=()=>{
    setReiniciar(!reiniciar)
  }

  useEffect(() => {
		setRutaFecha("");
		switch (true) {
			case cantidadDeDias.semana:
				console.log("Se cambio la semana!");
				setRutaFecha("last7days");
				break;
			case cantidadDeDias.mes:
				console.log("Se cambio el mes!");
				setRutaFecha("last30days");
				break;
			case cantidadDeDias.tres_meses:
				console.log("Se cambio a tres meses!");
				setRutaFecha("last3month");

				break;
			case cantidadDeDias.seis_meses:
				console.log("Se cambio a seis meses!");
				setRutaFecha("last6month");
				break;
			case cantidadDeDias.anio:
				console.log("Se cambio a anio!");
				setRutaFecha("lastyear");
				break;
			default:
				console.log("No se ha seleccionado ninguna opción");
				break;
		}
		fetch(`http://localhost:4000/product/${numeroPagina}/${rutaFecha}`)
			.then((response) => response.json())
			.then((product) => {
				setProductos(product);
				console.log("Se hizo la peticion a :", rutaFecha);
			});
	}, [cantidadDeDias, rutaFecha]);

  return (
    <Container fluid className="container-grid">
      {
        userAuth?   <NavbarsLogueado/> : <NavbarsLR/>
      }
     
      
      <main>
        <aside className="text-center">
          <h4 className="py-3 fil">
            <FaFilter /> Filtros
          </h4>
          <button onClick={handlerReiniciar}>
            Limpiar Filtros
          </button>
          <Accordion defaultActiveKey="" flush>
            <Accordion.Item eventKey="0" className="acordion">
              <Accordion.Header>
                <button className="btn">
                  <span className="text">Categorias</span>
                </button>
              </Accordion.Header>
              <Accordion.Body>
                <FiltroCategorias
                  onSelectCategoria={handleSeleccionCategoria}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className="acordion">
              <Accordion.Header>
                <button className="btn">
                  <span className="text">Departamentos</span>
                </button>
              </Accordion.Header>
              <Accordion.Body>
                <FiltroDepartamento
                  onSelectDepartamentos={handleSeleccionDepartamento}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2" className="acordion">
              <Accordion.Header>
                <button className="btn">
                  <span className="text">Precios</span>
                </button>
              </Accordion.Header>
              <Accordion.Body>
                <FiltroPrecio
                  preciosMaxMinSeleccionados={handleSeleccionPreciosMaxMin}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3" className="acordion">
              <Accordion.Header>
                <button className="btn">
                  <span className="text">Prueba pagination</span>
                </button>
				</Accordion.Header>
              <Accordion.Body>
                <Navegacion handlePaginacion={handlePaginacion} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='4' className="acordion">
							<Accordion.Header>Filtrar por Fecha</Accordion.Header>
          
							<Accordion.Body>
								<FiltroFecha
									actualizarCantidadDeDias={actualizarCantidadDeDias}
								/>
							</Accordion.Body>
						</Accordion.Item>

            <Accordion.Item eventKey="5" className="acordion">
              <Accordion.Header>
                <button className="btn">
                  <span className="text">Palabra clave</span>
                </button>
				</Accordion.Header>
              <Accordion.Body>
                <FiltroPalabrasClave
                  manejadorPalabraClave={handlePalabraClave}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

         

          {/* Ejemplo de como quedaria el apartado de nuevos productos bajo los filtros */}
          {/* <h4 className="py-3 fil">
            Ejemplo de productos nuevos
          </h4>
		  <Card className="card-newProduct">
                  <Container className="card-container-new">
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
                </Card> */}
        </aside>

        <article>
          {/* Carusel */}
          {/* <div
            style={{
              height: "450px",
              width: "100%",
              padding: "10px ",
              marginBottom: "30px",
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
          </div> */}

          <Row xs={1} md={3} className="g-3">
            {productos.map((producto) => (
              <CartaProducto {...producto} />
            ))}
            {productos.length === 0 ? (
              <p>No pudimos encontrar ningún producto</p>
            ) : (
              ""
            )}
          </Row>

          {/* Pagination */}
          {/* <section className="secPagination">
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
          </section> */}
        </article>
        <Footers />
      </main>
    </Container>
  );
};
