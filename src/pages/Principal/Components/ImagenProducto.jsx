import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';
export const ImagenProducto = ({ imagenesProducto  }) => {
	const [imagenes, setImagenes] = useState([imagenesProducto]);
	useEffect(()=>{
        setImagenes(JSON.parse(imagenes))
    },[])
	return (
		<div>
			{imagenes.map((imagen ) => (
				<>
				<img src={imagen} key={uuidv4()} style={{maxHeight:'100px'}}	/>
				</>
			))}
		</div>
	);
};
