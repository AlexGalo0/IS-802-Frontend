import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback } from "react";
import { Container, Row } from "react-bootstrap";
import { obtenerProductosUsuario } from "../../../api";
import { CartaMisProducto } from "./CartaMisProducto";

import { useContext } from "react";
import { UserContext } from "../../../context";
import { useNavigate } from "react-router";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { Footers } from "../../../Components/Footer";
import { BiLeftArrow } from "react-icons/bi";

export const MisProductos = () => {
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
    queryKey: ["misProductos"],
    /* Cambiar a obtenerProductosUsuario, que acepte paginacion */
    queryFn: ({ pageParam = 1 }) => obtenerProductosUsuario(pageParam, token),
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
        return <CartaMisProducto ref={lastPostRef} producto={post} />;
      }
      return <CartaMisProducto producto={post} />;
    });
  });

  return (
    <>
      <Container fluid className="container-grid">
        {userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
        <article style={{ paddingTop: "90px", minHeight: '86vh' }}>
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
            <h1>Mis productos en venta:</h1>
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
