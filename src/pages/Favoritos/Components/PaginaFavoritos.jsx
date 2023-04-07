import { useQuery } from "@tanstack/react-query";
import { obtenerListaDeseosUsuario } from "../../../api/sendRequest.api";
import { CartaProducto } from "../../Principal/Components/CartaProducto";
export const PaginaFavoritos = () => {
	const token = localStorage.getItem("token");
	const { data: productosListaDeseos } = useQuery({
		queryKey: ["producto"],
		queryFn: () => obtenerListaDeseosUsuario(token),
	});

	// const imprimir = () => {
	// 	console.log(productosListaDeseos);
	// };
	return (
		<>
			{productosListaDeseos?.map((producto) => (
				<>
					<div>{producto.producto}</div>
					<div>{producto.descripcion}</div>
				</>
			))}
			{/* <CartaProducto producto={productosListaDeseos}	 */}
		</>
	);
};


/* 
Forma de añadirle infinityQuery.
const {
		fetchNextPage, //function
		hasNextPage, //boolean
		isFetchingNextPage, //boolean
		data,
		status,
		error,
		refetch,
	} = useInfiniteQuery({
		queryKey: ["producto"],
		queryFn: ({ pageParam = 1 }) => obtenerListaDeseosUsuario(token),
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length ? allPages.length + 1 : undefined;
		},
	});


const intObserver = useRef();
	const lastPostRef = useCallback(
		(productos) => {
			if (isFetchingNextPage) return;
			if (intObserver.current) intObserver.current.disconnect();

			intObserver.current = new IntersectionObserver((productos) => {
				if (productos[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});

			if (productos) intObserver.current.observe(productos);
		},
		[isFetchingNextPage, fetchNextPage, hasNextPage]
	);

	if (status === "error") return <p>Error {error.message}</p>;

	const content = data?.pages.map((pg) => {
		return pg.map((post, i) => {
			if (pg.length === i + 1) {
				// console.log('last element'); el ultimo elemento
				return <CartaProducto ref={lastPostRef} producto={post} />; CAMBIAR ACA
			}
			return <CartaProducto producto={post} />; CAMBIAR ACA
		});
	});









*/