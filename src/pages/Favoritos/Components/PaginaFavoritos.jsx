import { useInfiniteQuery } from "@tanstack/react-query";
import { obtenerListaDeseosUsuario } from "../../../api/sendRequest.api";
import { useRef, useCallback } from "react";
import { Row, Container } from "react-bootstrap";
import { CartaProductoFavoritos } from "./CartaProductoFavoritos";

import { useContext } from "react";
import { UserContext } from "../../../context";
import { useNavigate } from "react-router";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { Footers } from "../../../Components/Footer";
import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";

export const PaginaFavoritos = () => {
  const navigate = useNavigate(); //Para redireccion
  const { userAuth } = useContext(UserContext);

  const handleRedirection = () => {
    navigate(-1);
  };

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
    queryFn: ({ pageParam = 1 }) => obtenerListaDeseosUsuario(pageParam, token),
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
        return <CartaProductoFavoritos ref={lastPostRef} producto={post} />;
      }
      return <CartaProductoFavoritos producto={post} />;
    });
  });

  return (
    <>
      <Container fluid className="container-grid">
        {userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
        <article style={{ paddingTop: "90px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <button
              className="Button-back"
              type="submit"
              onClick={handleRedirection}
              style={{ marginTop: "auto" }}
            >
              <BiLeftArrow />
            </button>
            <h1>Tus productos favoritos:</h1>
          </div>
          <Row xs={1} md={3} className="g-2" style={{ marginTop: "-20px" }}>
            {content}
          </Row>
        </article>

        <Footers />
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
