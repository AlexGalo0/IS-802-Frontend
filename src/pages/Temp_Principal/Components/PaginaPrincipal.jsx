import { Container, Accordion, Form, Card, Row, Col } from "react-bootstrap";
import '../Style/Temp_Principal.css'
import imagen from "../../../assets/1.png";
import { FaFilter } from "react-icons/fa";
import { obtenerProductos, obtenerProductoPorCategoria } from "../../../api";
import { CartaProducto } from "./CartaProducto";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FiltroCategorias } from "./FiltroCategorias";
export const PaginaPrincipal = () => {
	const navigate = useNavigate();

	const [productos, setProductos] = useState([]);
	const [numeroPagina, setNumeroPagina] = useState(1);

	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
	/* Renderizado de primera vez */
	const URL = `http://localhost:4000/product/pagination/${numeroPagina}`;
	useEffect(() => {
		fetch(URL)
			.then((response) => response.json())
			.then((product) => {
				setProductos(product);
			});
	}, []);

	useEffect(() => {
		fetch(`http://localhost:4000/product/${numeroPagina}/find-categories/${categoriaSeleccionada}`)
		.then((response) => response.json())
			.then((product) => {
				setProductos(product);
			});
	}, [categoriaSeleccionada]);
	/* 
	Ruta de categoria
	http://localhost:4000/product/1/find-categories/Electrónica
*/
	const handleSeleccionCategoria = (categoria) => {
		setCategoriaSeleccionada(categoria);
	};

	return (
		<Container fluid className='container-grid'>
			<main>
				<aside className='text-center'>
					<h4 className='py-3'>
						<FaFilter /> Filtros
					</h4>

					<Accordion defaultActiveKey='0' flush>
						<Accordion.Item eventKey='0'>
							<Accordion.Header>Categorias</Accordion.Header>
							<Accordion.Body>
								<FiltroCategorias
									onSelectCategoria={handleSeleccionCategoria}
								/>
							</Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey='1'>
							<Accordion.Header>Departamentos</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey='2'>
							<Accordion.Header>Rango de precios</Accordion.Header>
							<Accordion.Body>
								<Form>
									<Form.Check
										type='switch'
										id='custom-switch'
										label='Lps. 0 a Lps. 10.00'
									/>
									<Form.Check
										type='switch'
										id='custom-switch'
										label='Lps. 10.00 a Lps. 100.00'
									/>
									<Form.Check
										type='switch'
										id='custom-switch'
										label='Lps. 100 a Lps. 500.00'
									/>
								</Form>
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
					<Row xs={1} md={4} className='g-4'>
						{productos.map((producto) => (
							<CartaProducto {...producto} />
						))}
					</Row>
				</article>

				<footer className='d-flex justify-content-around align-items-center'>
					<div>
						<h5>Contactanos</h5>
						<p>admin.correo@marketplace.com</p>
					</div>
					<div className='w-25 d-flex justify-content-around'>
						<h6>Iconos</h6>
					</div>
					<div>Marketplace 2023</div>
				</footer>
			</main>
		</Container>
	);
};
