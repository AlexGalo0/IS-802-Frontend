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

import { Navegacion } from "./Navegacion";
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
	// const [cantidadDeDias, setCantidadDeDias] = useState({
	// 	semana: false,
	// 	mes: false,
	// 	tres_meses: false,
	// 	seis_meses: false,
	// 	anio: false,
	// });

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

	/* Renderizado de primera vez */

	useEffect(() => {
		//
		fetch(`http://localhost:4000/product/pagination/${numeroPaginaPrincipal}`)
			.then((response) => response.json())
			.then((product) => {
				setProductos(product);
				setUltimaPeticionHecha(peticionHecha.principal);
			});

		console.log(ultimaPeticionHecha);
	}, [numeroPaginaPrincipal, reiniciar]);

	/* Renderizado de Categoria */
	useEffect(() => {
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
		if (preciosCargado) {
			console.log("se esta haciendo el fetch de precio");
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

	// const handlePaginacion = (numeroDePagina) => {
	// 	setNumeroPaginaCategoria(numeroDePagina);
	// };

	// const handleNDias = (cantidadDeDias) => {
	// 	setCantidadDias(cantidadDeDias);
	// };

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
	};

	/* Para cualquier tipo de paginacion */
	const handlePageChange = (pageNumber) => {
		console.log("La peticion inicial es ", ultimaPeticionHecha);
		setState((prev) => ({ ...prev, activePage: pageNumber }));

		if (ultimaPeticionHecha === peticionHecha.principal) {
			console.log("La ultima peticion fue principal");
			setNumeroPaginaPrincipal(pageNumber);
		}
		if (ultimaPeticionHecha === peticionHecha.categoria) {
			console.log("La ultima peticion fue categoria");

			setNumeroPaginaCategoria(pageNumber);
		}

		if (ultimaPeticionHecha === peticionHecha.departamento) {
			console.log("La ultima peticion fue departamento");

			setNumeroPaginaDepartamento(pageNumber);
		}
		if (ultimaPeticionHecha === peticionHecha.fecha) {
			console.log("La ultima peticion fue fecha");

			setNumeroPaginaFecha(pageNumber);
		}
		if (ultimaPeticionHecha === peticionHecha.keyword) {
			console.log("La ultima peticion fue keyword");

			setNumeroPaginaPalabraClave(pageNumber);
		}
		if (ultimaPeticionHecha === peticionHecha.precio) {
			console.log("La ultima peticion fue precio");

			setNumeroPaginaPrecio(pageNumber);
		}
	};

	return (
		<Container fluid className='container-grid'>
			{userAuth ? <NavbarsLogueado /> : <NavbarsLR />}

			<main>
				<aside className='text-center'>
					<h4 className='py-3 fil'>
						<FaFilter /> Filtros
					</h4>
					<button onClick={handlerReiniciar}>Limpiar Filtros</button>
					<Accordion defaultActiveKey='' flush>
						<Accordion.Item eventKey='0' className='acordion'>
							<Accordion.Header>
								<button className='btn'>
									<span className='text'>Categorias</span>
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

						{/* <Accordion.Item eventKey='3' className='acordion'>
							<Accordion.Header>
								<button className='btn'>
									<span className='text'>Prueba pagination</span>
								</button>
							</Accordion.Header>
							<Accordion.Body>
								<Navegacion handlePaginacion={handlePaginacion} />
							</Accordion.Body>
						</Accordion.Item> */}

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

						<Accordion.Item eventKey='5' className='acordion'>
							<Accordion.Header>
								<button className='btn'>
									<span className='text'>Palabra clave</span>
								</button>
							</Accordion.Header>
							<Accordion.Body>
								<FiltroPalabrasClave
									manejadorPalabraClave={handlePalabraClave}
								/>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</aside>

				<article>
					<Row xs={1} md={3} className='g-3'>
						{productos.map((producto) => (
							<CartaProducto {...producto} />
						))}
						{productos.length === 0 ? (
							<p>No pudimos encontrar ningún producto</p>
						) : (
							""
						)}
					</Row>

					<Pagination className='py-4'>
						{Array.from({ length: 5 }).map((_, index) => {
							/* Necesito la cantidad de paginas desde el back */
							return (
								<Pagination.Item
									onClick={() => handlePageChange(index + 1)}
									key={index + 1}
									active={index + 1 === state.activePage}
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
