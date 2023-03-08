import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
export const ImagenProducto = ({ imagenesProducto }) => {
	const [imagenes, setImagenes] = useState([imagenesProducto]);
	useEffect(()=>{
        setImagenes(JSON.parse(imagenes))
    },[])
	return (
		<>
			{imagenes.map((imagen,index) => (
				<Card.Img src={imagen} key={index} variant="top" className="card-image" />
			))}
		</>
	);
};
