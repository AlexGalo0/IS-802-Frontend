import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef , useCallback} from "react";
import { Row } from "react-bootstrap";
export const PaginaMisProductos = () => {
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
    /* Cambiar a obtenerProductosUsuario, que acepte paginacion */
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
				return <ProductoFavorito ref={lastPostRef} producto={post}/>;  
			}
			return <ProductoFavorito producto={post} />; 
		});
	});


 
	return (
		<>
		
		<article >
					<Row xs={1} md={3} className='g-4'>
						{content}
					</Row>
				</article>
		</>
	);
}



	

	
