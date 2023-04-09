import { useState } from "react";
import "./Boton.css";
import { AiFillHeart } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { agregarProductoWishlist } from "../../../api/sendRequest.api";
import { Link, useParams } from "react-router-dom";

export default function Boton() {
	let { idProducto } = useParams();
	/* 
Verificar si existe en el local storage.
  Si no existe, agregarlo
  Si si existe, ignorarlo


*/

	const agregarFavoritos = () => {
		const tokenUsuario = localStorage.getItem("token");

		const arr = idProducto.split(",").map(Number);
		const result = JSON.stringify(arr);

		localStorage.setItem("productosFavorito", JSON.stringify(result));

		agregarProductoWishlist(tokenUsuario, idProducto);
	};
	/*  Algo asi: 
function cadenaEstaEnArreglo(cadena, arreglo) {
  // Convertir la cadena en un arreglo de números
  const numeros = cadena.split(",").map(numero => parseInt(numero));

  // Convertir la cadena de números en el arreglo esperado
  const arregloNumeros = JSON.parse(`[${arreglo}]`);

  // Verificar si la cadena está en el arreglo
  return arregloNumeros.includes(numeros);
}

// Ejemplo de uso
const cadena = "12,73,77,127,42,39,175,189,215,11,138,118,42,122,181,112,5,104,63,252";
const arreglo = "[7,62,82,206,151,61,148,54,118,120,



*/
	const [active, setActive] = useState(false);

	function handleClick() {
		setActive(!active);
	}

	/* Elementos de los overlays (AL poner cursor sobre el simbolo de perfil dice que inicimos sesion) */
	const renderTooltipButtomLike = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			Agregar a lista de favoritos
		</Tooltip>
	);

	return (
		<div className='like'>
			<OverlayTrigger
				placement='top'
				delay={{ show: 250, hide: 400 }}
				overlay={renderTooltipButtomLike}
			>
				<button
					className={active ? "active" : ""}
					onClick={() => {
						handleClick();
						agregarFavoritos();
					}}
				>
					{active ? (
						<AiFillHeart className='heart' />
					) : (
						<AiFillHeart className='heart' />
					)}
				</button>
			</OverlayTrigger>
		</div>
	);
}
