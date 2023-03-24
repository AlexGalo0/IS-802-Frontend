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

import {
	FiltroCategorias,
	FiltroDepartamento,
	FiltroFecha,
	FiltroPalabrasClave,
	FiltroPrecio,
} from "./Filtros";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { Footers } from "../../../Components/Footer";
import ejem from "../../../assets/ejem.jpeg";
import segunda from "../../../assets/3.png";
import primera from "../../../assets/4.png";
import { useContext } from "react";
import { UserContext, AdminContext } from "../../../context";
import Pagination from "react-bootstrap/Pagination";
import { Paginacion } from "./Paginacion";
export const PaginaPrincipal = () => {
	const { userAuth } = useContext(UserContext);
	/* Objeto para la verificacion de ultima peticion hecha */
	const peticionHecha = {
		principal: "principal",
		categoria: "categoria",
		departamento: "departamento",
		fecha: "fecha",
		keyword: "keyword",
		precio: "precio",
	};

	/* Estados Inicial */
	const [productos, setProductos] = useState([]);
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
	const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
	const [palabraClave, setPalabraClave] = useState("");
	const [precioMinimo, setPrecioMinimo] = useState(0);
	const [precioMaximo, setPrecioMaximo] = useState(0);
	const [preciosCargado, setPreciosCargado] = useState(false);
	const [longitudPaginacion, setLongitudPaginacion] = useState(5);
	/* 
		Es necesario hacer un fetch para la longitud inicial
	*/

	const [fechaSeleccionada, setFechaSeleccionada] = useState("");

	const [rutaFecha, setRutaFecha] = useState("");
	const [reiniciar, setReiniciar] = useState(false);
	/* Estados para paginacion */
	const [numeroPaginaPrincipal, setNumeroPaginaPrincipal] = useState(1);
	const [numeroPaginaCategoria, setNumeroPaginaCategoria] = useState(1);
	const [numeroPaginaFecha, setNumeroPaginaFecha] = useState(1);
	const [numeroPaginaDepartamento, setNumeroPaginaDepartamento] = useState(1);
	const [numeroPaginaPalabraClave, setNumeroPaginaPalabraClave] = useState(1);
	const [numeroPaginaPrecio, setNumeroPaginaPrecio] = useState(1);
	const [ultimaPeticionHecha, setUltimaPeticionHecha] = useState(
		peticionHecha.principal
	);
	/* Estado para componente de paginacion */
	const [state, setState] = useState({
		data: [],
		activePage: 1,
	});


	/* **** Fetching de Datos ****  */

	/* Idea de Fetch para componente de paginacion
	
		fetch(.../cantidadPaginasCategoria).then((response=>response.json()).then((
			(paginasDeCategoria)=>{
				setLongitudPaginacion(paginasDeCategoria)
			}
		)))
	*/


	/* Renderizado de Categoria */
	useEffect(() => {
	
		setLongitudPaginacion(4)
		setState(prevState => ({
			...prevState,
			activePage: numeroPaginaCategoria
		  }));
		fetch(
			`http://localhost:4000/product/${numeroPaginaCategoria}/find-categories/${categoriaSeleccionada}`
		)
			.then((response) => response.json())
			.then((product) => {
				setProductos(product);
				setUltimaPeticionHecha(peticionHecha.categoria);
			});
	}, [categoriaSeleccionada, numeroPaginaCategoria]);

	/* Renderizado por Departamento */
	useEffect(() => {
		setLongitudPaginacion(2)
		setState(prevState => ({
			...prevState,
			activePage: 1
		  }));

		fetch(
			`http://localhost:4000/product/${numeroPaginaDepartamento}/find-dpto/${departamentoSeleccionado}`
		)
			.then((response) => response.json())
			.then((product) => {
				setProductos(product);
				setUltimaPeticionHecha(peticionHecha.departamento);
			});
	}, [departamentoSeleccionado, numeroPaginaDepartamento]);

	/* Renderizado por rango de precio */
	useEffect(() => {
		setState(prevState => ({
			...prevState,
			activePage: 1
		  }));
		if (preciosCargado) {
			fetch(
				`http://localhost:4000/product/${numeroPaginaPrecio}/find-range-price/${precioMinimo}/${precioMaximo}`
			)
				.then((response) => response.json())
				.then((product) => {
					setProductos(product);
					setUltimaPeticionHecha(peticionHecha.precio);
				});
		}
		// setPreciosCargado(false);
	}, [preciosCargado, numeroPaginaPrecio]);

	/* Renderizado por palabras clave */
	useEffect(() => {
		setState(prevState => ({
			...prevState,
			activePage: 1
		  }));

		fetch(
			`http://localhost:4000/product/${numeroPaginaPalabraClave}/find-keyword/${palabraClave}`
		)
			.then((response) => response.json())
			.then((product) => {
				setProductos(product);
				setUltimaPeticionHecha(peticionHecha.keyword);
			});
	}, [palabraClave, numeroPaginaPalabraClave]);

	/* Renderizado por Fecha */
	useEffect(() => {

		fetch(
			`http://localhost:4000/product/${numeroPaginaFecha}/${fechaSeleccionada}`
		)
			.then((response) => response.json())
			.then((product) => {
				setProductos(product);
				setUltimaPeticionHecha(peticionHecha.fecha);
			});
			setState(prevState => ({
				...prevState,
				activePage: 1
			  }));
	}, [fechaSeleccionada, numeroPaginaFecha]);

	/* Handlers para comunicacion entre componentes */
	const handleSeleccionCategoria = (categoria) => {
		setCategoriaSeleccionada(categoria);
	};

	const handleSeleccionFecha = (fecha) => {
		setFechaSeleccionada(fecha);
	};

	const handleSeleccionDepartamento = (departamento) => {
		setDepartamentoSeleccionado(departamento);
	};

	const handleSeleccionPreciosMaxMin = (precioMin, precioMax) => {
		setPrecioMinimo(precioMin);
		setPrecioMaximo(precioMax);
		setPreciosCargado(true);
	};

	const actualizarCantidadDeDias = (nuevaCantidadDeDias) => {
		setCantidadDeDias(nuevaCantidadDeDias);
	};

	const handlePalabraClave = (palabraClave) => {
		setPalabraClave(palabraClave);
	};

	const handlerReiniciar = () => {
		setReiniciar(!reiniciar);
		setNumeroPaginaPrincipal(1);
		setNumeroPaginaCategoria(1);
		setNumeroPaginaDepartamento(1);
		setNumeroPaginaFecha(1);
		setNumeroPaginaPrecio(1);
		setNumeroPaginaPalabraClave(1);
		setState(prevState => ({
			...prevState,
			activePage: 1
		  }));
	};

	/* Para cualquier tipo de paginacion */
	const handlePageChange = (pageNumber) => {
		setState((prev) => ({ ...prev, activePage: pageNumber }));

		if (ultimaPeticionHecha === peticionHecha.principal) {
			setNumeroPaginaPrincipal(pageNumber);
		}
		if (ultimaPeticionHecha === peticionHecha.categoria) {

			setNumeroPaginaCategoria(pageNumber);
		}

		if (ultimaPeticionHecha === peticionHecha.departamento) {

			setNumeroPaginaDepartamento(pageNumber);
		}
		if (ultimaPeticionHecha === peticionHecha.fecha) {

			setNumeroPaginaFecha(pageNumber);
		}
		if (ultimaPeticionHecha === peticionHecha.keyword) {

			setNumeroPaginaPalabraClave(pageNumber);
		}
		if (ultimaPeticionHecha === peticionHecha.precio) {

			setNumeroPaginaPrecio(pageNumber);
		}
	};

	useEffect(() => {
		setLongitudPaginacion(10)
		
		//
		fetch(`http://localhost:4000/product/pagination/${numeroPaginaPrincipal}`)
			.then((response) => response.json())
			.then((product) => {
				setProductos(product);
				setUltimaPeticionHecha(peticionHecha.principal);
			});
		
	}, [numeroPaginaPrincipal, reiniciar]);

	return (
		<Container fluid className='container-grid'>
			{userAuth ? <NavbarsLogueado /> : <NavbarsLR />}

			<main>
      <FiltroPalabrasClave
									manejadorPalabraClave={handlePalabraClave}
								/>
				<aside className='text-center'>
					<h4 className='py-3 fil'>
						<FaFilter /> Filtros
					</h4>

					<Accordion defaultActiveKey='' flush>
						<Accordion.Item eventKey='0' className='acordion'>
							<Accordion.Header>
								<button className='btn'>
									<span className='text'>Categorías</span>
								</button>
							</Accordion.Header>
							<Accordion.Body>
								<FiltroCategorias
									onSelectCategoria={handleSeleccionCategoria}
								/>
							</Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey='1' className='acordion'>
							<Accordion.Header>
								<button className='btn'>
									<span className='text'>Departamentos</span>
								</button>
							</Accordion.Header>
							<Accordion.Body>
								<FiltroDepartamento
									onSelectDepartamentos={handleSeleccionDepartamento}
								/>
							</Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey='2' className='acordion'>
							<Accordion.Header>
								<button className='btn'>
									<span className='text'>Precios</span>
								</button>
							</Accordion.Header>
							<Accordion.Body>
								<FiltroPrecio
									preciosMaxMinSeleccionados={handleSeleccionPreciosMaxMin}
								/>
							</Accordion.Body>
						</Accordion.Item>

						
						<Accordion.Item eventKey='4' className='acordion'>
							<Accordion.Header>
								<button className='btn'>
									<span className='text'>Filtrar por Fecha</span>
								</button>
							</Accordion.Header>
							<Accordion.Body>
								<FiltroFecha onSelectFecha={handleSeleccionFecha} />
							</Accordion.Body>
						</Accordion.Item>

					</Accordion>
          
					<button onClick={handlerReiniciar} className="btnFiltros"> 
          <span className="textBuscar">Limpiar Filtros</span> 
          </button>
				</aside>
                
				<article>
					<Row xs={1} md={3} className='g-4'>
						{productos.map((producto) => (
							<CartaProducto {...producto} key={producto.idProducto} />
						))}
						{/* Cambiar lo de idProducto */}
						{productos.length === 0 ? (
							<p>No pudimos encontrar ningún producto</p>
						) : (
							""
						)}
					</Row>
					<Pagination className='py-4' size="lg" bsPrefix="pagination" style={{marginBottom: '-10px'}} >
						{Array.from({ length: longitudPaginacion }).map((_, index) => {
							/* Necesito la cantidad de paginas desde el back */
							return (
								<Pagination.Item
									onClick={() => handlePageChange(index + 1)}
									key={index + 1}
									active={index + 1 === state.activePage}
                  className="item"
								>
									{index + 1}
								</Pagination.Item>
							);
						})}
					</Pagination>
				</article>
				<Footers />
			</main>
		</Container>
	);
};
