import { useInfiniteQuery } from "@tanstack/react-query";
import { obtenerListaDeseosUsuario } from "../../../api/sendRequest.api";
import { useRef , useCallback} from "react";
import { Row , Container } from "react-bootstrap";
import { CartaProductoFavoritos } from "./CartaProductoFavoritos";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
export const PaginaFavoritos = () => {
	const token = localStorage.getItem("token");
	const {
		fetchNextPage, //function
		hasNextPage, //boolean
		isFetchingNextPage, //boolean
		data,
		status,
		error,
		refetch,
	} = useInfiniteQuery({
		queryKey: ["productoListaDeseos"],
		queryFn: ({ pageParam = 1 }) => obtenerListaDeseosUsuario(pageParam,token),
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
	//

	
	const content = data?.pages.map((pg) => {
		return pg.map((post, i) => {
			if (pg.length === i + 1) {
				return <CartaProductoFavoritos ref={lastPostRef} producto={post}/>;  
			}
			return <CartaProductoFavoritos producto={post} />; 
		});
	});

	

	return (
		<>
	
		<Container fluid className='container-grid'>
			 <NavbarsLogueado /> 
			
		<article style={{paddingTop:'90px'}} >
		<h1 style={{paddingTop:'20px'}} >Estos son tus productos favoritos </h1>
					<Row xs={1} md={3} className='g-4'>
						{content}
					</Row>
				</article>
			</Container>
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