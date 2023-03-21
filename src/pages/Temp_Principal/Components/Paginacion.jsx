import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export const Paginacion = ({envioNumeroPagina}) => {

const [numeroPaginaInterno, setNumeroPaginaInterno] = useState({envioNumeroPagina})

	console.log(envioNumeroPagina)
	let active = envioNumeroPagina;
	let items = [];
	for (let number = 1; number <= 5; number++) {
		items.push(
			<Pagination.Item key={number} active={number === active}>
				{number}
			</Pagination.Item>
		);
	}
	return (
		<div>
		

			<Pagination size='lg'>{items}</Pagination>
			<br />

		</div>
	);
};
