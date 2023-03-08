/*
Esta es solo una representacion de como funcionaria el componente de MostrarProductos
*/

import React, { useEffect, useState } from "react";
import { CartaProducto } from "./CartaProducto";
export const PrototipoMap = () => {
	//Hacer peticion de todos los datos
	const [productInfo, setProductInfo] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const URL = `http://localhost:4000/pagination/:${pageNumber}`;
	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((product) => {
				setProductInfo(product); //Esto en teoria , deberia ser un arreglo con 9 productos
			});
	});

	return (
		<>
			<div>PrototipoMap</div>
			{isLoading ? <p>Cargando...</p> : null}

			{
				//Falta el key que me retornara producto
				productInfo.map((product) => {
					<CartaProducto producto={product} />;
				})
			}
		</>
	);
};
