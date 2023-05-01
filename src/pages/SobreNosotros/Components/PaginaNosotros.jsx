import { useInfiniteQuery } from "@tanstack/react-query";
import { obtenerListaDeseosUsuario } from "../../../api/sendRequest.api";
import { useRef, useCallback } from "react";
import { Row, Container } from "react-bootstrap";

import { useContext } from "react";
import { UserContext } from "../../../context";
import { useNavigate } from "react-router";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { BiLeftArrow } from "react-icons/bi";

import "../Style/Temp_Principal.css";
import { BiUser } from "react-icons/bi";

export const PaginaNosotros = () => {
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

  return (
    <>
      <Container fluid className="container-grid">
        {userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
        <article style={{ paddingTop: "90px", minHeight: "100vh" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "30px",
              backgroundColor: "##416b7a",
              width: "100%",
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
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="sobre">
              <h1 style={{ marginBottom: "60px" }}>Sobre Nosotros:</h1>
            </div>
            <div className="sobre2">
              <div style={{ display: "flex", justifyContent: "space-between", height: '480px' }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "50%",
                    alignItems: "center",
                    backgroundColor: "#94BFD1",
                    borderRadius: '10px',
                    marginRight: '20px',
                    padding: '20px'
                  }}
                >
                  <h2>Misión</h2>
                  <p style={{ textAlign: "justify", marginTop: '20px' }}>
                    Nuestra misión en MarketPlace504 es ofrecer una plataforma
                    de comercio electrónico en línea confiable y accesible para
                    compradores y vendedores en Honduras y la región
                    centroamericana. Nos esforzamos por brindar una experiencia
                    de compra y venta segura, fácil y satisfactoria a nuestros
                    clientes, al tiempo que fomentamos el crecimiento y la
                    innovación en el comercio electrónico.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "60%",alignItems: "center",
                    backgroundColor: "#365662",
                    borderRadius: '10px',
                    marginRight: '20px',
                    color: '#f7f7f7'
                  }}
                >
                  <div style={{ display: "flex", flexDirection: 'column' }}>
                  <h2 style={{marginBottom: '40px'}}>Desarrolladores</h2>
                  <div style={{display: 'flex', gap: "20px"}}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <button
                        className="button-cuenta"
                        disabled
                        style={{
                          cursor: "default",
                          width: "90px",
                          height: "90px",
                        }}
                      >
                        <BiUser style={{ width: "80px", height: "80px" }} />
                      </button>
                      <div style={{backgroundColor: '#416b7a', borderRadius: '10px', gap: '10px', padding: '10px', marginTop: '10px'}}>
                      <p style={{ margin: "auto" }}> Alex Alfredo Fuentes Maldonado</p>
                      <p style={{ margin: "auto" }}> Desarrolador Backend </p>
                      <p style={{ margin: "auto" }}> Ingeniero en sistemas </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <button
                        className="button-cuenta"
                        disabled
                        style={{
                          cursor: "default",
                          width: "90px",
                          height: "90px",
                        }}
                      >
                        <BiUser style={{ width: "80px", height: "80px" }} />
                      </button>
                      <div style={{backgroundColor: '#416b7a', borderRadius: '10px', gap: '20px', padding: '10px', marginTop: '10px', width: '265px', height: '135px'}}>
                      <p style={{ margin: "auto", marginBottom: '9px' }}>   Alex Daniel Galo Soto </p>
                      <p style={{ margin: "auto", marginBottom: '9px' }}> Desarrolador Frontend </p>
                      <p style={{ margin: "auto" }}> Ingeniero en sistemas </p>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between", height: '480px' }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "60%",alignItems: "center",
                    backgroundColor: "#365662",
                    borderRadius: '10px',
                    marginRight: '20px',
                    color: '#f7f7f7'
                  }}
                >
                  <div style={{ display: "flex", flexDirection: 'column' }}>
                  <h2 style={{marginBottom: '40px'}}>Desarrolladores</h2>
                  <div style={{display: 'flex', gap: "20px"}}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <button
                        className="button-cuenta"
                        disabled
                        style={{
                          cursor: "default",
                          width: "90px",
                          height: "90px",
                        }}
                      >
                        <BiUser style={{ width: "80px", height: "80px" }} />
                      </button>
                      <div style={{backgroundColor: '#416b7a', borderRadius: '10px', gap: '10px', padding: '10px', marginTop: '10px'}}>
                      <p style={{ margin: "auto" }}> Andrea Michelle Calix Gonzales</p>
                      <p style={{ margin: "auto" }}> Desarrolador Backend </p>
                      <p style={{ margin: "auto" }}> Ingeniero en sistemas </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <button
                        className="button-cuenta"
                        disabled
                        style={{
                          cursor: "default",
                          width: "90px",
                          height: "90px",
                        }}
                      >
                        <BiUser style={{ width: "80px", height: "80px" }} />
                      </button>
                      <div style={{backgroundColor: '#416b7a', borderRadius: '10px', gap: '10px', padding: '10px', marginTop: '10px'}}>
                      <p style={{ margin: "auto" }}> Yhonny Yupanky Ortega Aplicano </p>
                      <p style={{ margin: "auto" }}> Desarrolador Frontend </p>
                      <p style={{ margin: "auto" }}> Ingeniero en sistemas </p>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "50%",
                    alignItems: "center",
                    backgroundColor: "#94BFD1",
                    borderRadius: '10px',
                    marginLeft: '20px',
                    padding: '20px'
                  }}
                >
                  <h2>Visión</h2>
                  <p style={{ textAlign: "justify", marginTop: '20px' }}>
                    En MarketPlace504, nuestra visión es convertirnos en la
                    plataforma de comercio electrónico líder en Honduras y la
                    región centroamericana, brindando a nuestros clientes una
                    amplia selección de productos y servicios de calidad a
                    precios competitivos. Queremos ser reconocidos por nuestra
                    integridad, innovación y excelencia en el servicio al
                    cliente, y ser una fuente confiable de oportunidades de
                    negocio para nuestros vendedores. Además, buscamos
                    contribuir al desarrollo económico de nuestra región a
                    través del comercio electrónico y la creación de empleos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </>
  );
};
