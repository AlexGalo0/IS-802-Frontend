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
import { v4 as uuidv4 } from "uuid";

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
import { SidebarFiltros } from "./SidebarFiltros";

export const PaginaPrincipal = () => {
	const { userAuth } = useContext(UserContext);

	return (
		<Container fluid className='container-grid'>
			{userAuth ? <NavbarsLogueado /> : <NavbarsLR />}

			<main>
				<aside className='text-center'>
					<h4 className='py-3 fil'>
						<FaFilter /> Filtros
					</h4>
					<SidebarFiltros/>
					<span className='textBuscar'>Limpiar Filtros</span>
				</aside>
					
				<article>
					{/* <Row xs={1} md={3} className='g-4'>
						{productos.map((producto) => (
							<CartaProducto {...producto} key={uuidv4()} />
						))}
						
						{productos.length === 0 ? (
							<p>No pudimos encontrar ningún producto</p>
						) : (
							""
						)}
					</Row> */}

					{/* <Pagination className='py-4' size="lg" bsPrefix="pagination" style={{marginBottom: '-10px'}} >
						{Array.from({ length: longitudPaginacion }).map((_, index) => {
					
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
					</Pagination> */}
				</article>
				<Footers />
			</main>
		</Container>
	);
};
