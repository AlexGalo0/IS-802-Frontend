import { useEffect, useState } from "react";
import "./Boton.css";
import { AiFillHeart } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { agregarProductoWishlist } from "../../../api/sendRequest.api";
import { Link, useParams } from "react-router-dom";
import { obtenerListaDeseosUsuario } from "../../../api/sendRequest.api";
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
		localStorage.clear("idsListaDeDeseos")

	};
	const [productosFavoritosUsuario, setProductosFavoritosUsuario] = useState(
		[]
	);
	useEffect(() => {
		const productosFavoritos = localStorage.getItem("idsListaDeDeseos");
		const arreglo = JSON.parse(productosFavoritos);
		const arregloIdProductosFavoritos = [];
		arreglo.map((producto) =>
			arregloIdProductosFavoritos.push(producto.id_producto.data)
		);
		setProductosFavoritosUsuario(arregloIdProductosFavoritos);
	}, []);

	const arregloIDProducto = idProducto.split(",").map(Number);

	const [active, setActive] = useState(false);

	function handleClick() {
		setActive(!active);
	}
	const verificarSiYaEsFavorito = () => {
		let seEncuentra = false;
		for (let i = 0; i < productosFavoritosUsuario.length; i++) {
			if (productosFavoritosUsuario[i].includes(arregloIDProducto[0])) {
				seEncuentra = true;
				break;
			}
		}
		return seEncuentra
	};
verificarSiYaEsFavorito()

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
					className={verificarSiYaEsFavorito ? "" : "active"}
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
