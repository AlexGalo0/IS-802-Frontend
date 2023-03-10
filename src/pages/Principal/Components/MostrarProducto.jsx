/*
Esta es solo una representacion de como funcionaria el componente de MostrarProductos
*/
import React, { useEffect, useState } from "react";
import { CartaProducto } from "./CartaProducto";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import "./prueba.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "react-bootstrap";

import { BiLeftArrow,  } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const MostrarProducto = () => {
	const navigate = useNavigate();

	const [productInfo, setProductInfo] = useState([]);
	
	const URL = `http://localhost:4000/product`;
	useEffect(() => {
		fetch(URL)
			.then((response) => response.json())
			.then((product) => {
				setProductInfo(product);
			});
	}, []);
	const handleRedirection = () => {
		navigate("/");
	};

	return (
		<>
			<header className='App-header'>
				<Container className='ContainerPueba'>
					<form fluid='true' className='FormPueba'>
						<button
							className='Button-backProduct'
							type='submit'
							style={{
								paddingTop: "1px",
							}}
							onClick={handleRedirection}
						>
							<BiLeftArrow />
						</button>
						<h1>Productos Ingresados: </h1>

						{
							//Falta el key que me retornara producto
							productInfo.map((product) => (
								<CartaProducto key={uuidv4()} {...product} />
							))
						}
					</form>
				</Container>
			</header>
		</>
	);
};
