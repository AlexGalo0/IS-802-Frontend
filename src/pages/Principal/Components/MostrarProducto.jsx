/*
Esta es solo una representacion de como funcionaria el componente de MostrarProductos
*/
import React, { useEffect, useState } from "react";
import { CartaProducto } from "./CartaProducto";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
export const MostrarProducto = () => {
	const navigate = useNavigate()
	//Hacer peticion de todos los datos
	const [productInfo, setProductInfo] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const URL = `http://localhost:4000/product`;
	useEffect(() => {
		fetch(URL)
			.then((response) => response.json())
			.then((product) => {
				 setProductInfo(product); //Esto en teoria , deberia ser un arreglo con 9 productos
				
			});
	},[]);
	const handleRedirection=()=>{
		navigate("/")
	}

	return (
		<>
			<h1>Productos Ingresados: </h1>
			<button onClick={handleRedirection}>⬅️</button>
			{
				//Falta el key que me retornara producto
				productInfo.map((product) => (
					<CartaProducto key={uuidv4()} {...product} />
					
				))
			}
			
		</>
	);
};
