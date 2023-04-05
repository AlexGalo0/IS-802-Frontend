import { Container, Row } from "react-bootstrap";
import "../Style/Temp_Principal.css";
import { FaFilter } from "react-icons/fa";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { Footers } from "../../../Components/Footer";
import { useContext, useState } from "react";
import { UserContext } from "../../../context";
import { SidebarFiltros } from "./SidebarFiltros";
import { useQuery, useQueryClient } from "react-query";
import {
  obtenerDepartamentos,
  obtenerCategorias,
  obtenerProductos,
} from "../../../api";
import { useForm } from "react-hook-form";
import { CartaFavoritos } from "./cartaMisProductos";

import { useNavigate } from "react-router";
import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";

export const PaginaMisProductos = () => {
  const navigate = useNavigate(); //Para redireccion
  const { userAuth } = useContext(UserContext);
  const [numeroPagina, setNumeroPagina] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: obtenerCategorias,
  });
  const { data: departamentos } = useQuery({
    queryKey: ["departamentos"],
    queryFn: obtenerDepartamentos,
  });

  const { data: productos } = useQuery({
    queryKey: ["productos"],
    queryFn: obtenerProductos,
  });

  const filtrarProductos = (data) => {
    queryClient.invalidateQueries("productos");
  };

  const handleRedirection = () => {
    navigate("/");
  };

  const handlerReiniciar = () => {
    setReiniciar(!reiniciar);
    setNumeroPaginaPrincipal(1);
    setNumeroPaginaCategoria(1);
    setNumeroPaginaDepartamento(1);
    setNumeroPaginaFecha(1);
    setNumeroPaginaPrecio(1);
    setNumeroPaginaPalabraClave(1);
    setState((prevState) => ({
      ...prevState,
      activePage: 1,
    }));
  };

  return (
    <Container fluid className="container-grid">
      {userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
      <main className="principal">
        <aside className="text-center">
          <h4 className="py-3 fil">
            <FaFilter /> Filtros
          </h4>
          <SidebarFiltros />
          <button onClick={handlerReiniciar} className="btnFiltros" style={{marginTop: '-5px'}}>
            <span className="textBuscar">Limpiar Filtros</span>
          </button>
		<div style={{padding: '5px'}} className="scroll">

          <form onSubmit={handleSubmit(filtrarProductos)}>
            <h5 className="py-3 cate">Categorias</h5>
            {categorias?.map((categoria) => (
              <div
                key={categoria.idCategoria.data}
                className="checkbox-apple"
                style={{ width: "auto" }}
              >
                <input
                  style={{ marginTop: "3px" }}
                  className="yep"
                  id={categoria.nombre}
                  type="checkbox"
                  value={categoria.nombre}
                  {...register(`${categoria.nombre}`)}
                />
                <label
                  htmlFor=""
                  for={categoria.nombre}
                  style={{ marginTop: "3px" }}
                ></label>
                <p className="checkP">{categoria.nombre}</p>
                <br />
              </div>
            ))}

            <br />
            <h5 className="py-3 cate">Departamentos</h5>
            {departamentos?.map((departamento) => (
              <div
                key={departamento.id_dpto}
                className="checkbox-apple"
                style={{ width: "auto" }}
              >
                <input
                  style={{ marginTop: "3px" }}
                  className="yep"
                  id={departamento.nombre}
                  type="checkbox"
                  value={departamento.nombre}
                  {...register(`${departamento.nombre}`)}
                />
                <label
                  htmlFor=""
                  for={departamento.nombre}
                  style={{ marginTop: "3px" }}
                ></label>
                <p className="checkP">{departamento.nombre}</p>
                <br />
              </div>
            ))}

<br />
            <h5 className="py-3 cate">Fecha</h5>
            {
              <>
                <div className="checkbox-apple" style={{ width: "auto" }}>
                  <input
                    type="checkbox"
                    name=""
                    id="7"
                    {...register("7Days")}
                    style={{ marginTop: "3px" }}
                    className="yep"
                  />
                  <label
                    htmlFor=""
                    for="7"
                    style={{ marginTop: "3px" }}
                  ></label>
                  <p className="checkP">7 Dias</p>
                  <br />
                </div>
                <div className="checkbox-apple" style={{ width: "auto" }}>
                  <input
                    type="checkbox"
                    name=""
                    id="15"
                    {...register("15Days")}
                    style={{ marginTop: "3px" }}
                    className="yep"
                  />
                  <label
                    htmlFor=""
                    for="15"
                    style={{ marginTop: "3px" }}
                  ></label>
                  <p className="checkP">15 Dias</p>
                  <br />
                </div>
                <div className="checkbox-apple" style={{ width: "auto" }}>
                  <input
                    type="checkbox"
                    name=""
                    id="20"
                    {...register("20Days")}
                    style={{ marginTop: "3px" }}
                    className="yep"
                  />
                  <label
                    htmlFor=""
                    for="20"
                    style={{ marginTop: "3px" }}
                  ></label>
                  <p className="checkP">20 Dias</p>
                  <br />
                </div>
                <div className="checkbox-apple" style={{ width: "auto" }}>
                  <input
                    type="checkbox"
                    name=""
                    id="30"
                    {...register("30Days")}
                    style={{ marginTop: "3px" }}
                    className="yep"
                  />
                  <label
                    htmlFor=""
                    for="30"
                    style={{ marginTop: "3px" }}
                  ></label>
                  <p className="checkP">30 Dias</p>
                  <br />
                </div>

              </>
            }

            <br />
            <h5 className="py-3 cate">Precios</h5>
            {
              <>
                <label htmlFor="" className="labelPrecio">
                  Precio Mínimo:
                </label>
                <input
                  className="inPrecio"
                  type="number"
                  {...register("precioMinimo")}
                />
				
                <label htmlFor="" className="labelPrecio">
                  Precio Máximo:
                </label>
                <input
                  className="inPrecio"
                  type="number"
                  {...register("precioMaximo")}
                />
              </>
            }

            <br />
            <h5 className="py-3 cate">Buscador</h5>
            {
              <>
                <label htmlFor="" className="labelPrecio">
                  Palabras Clave:
                </label>
                <input
                  className="inPrecio"
                  type="text"
                  {...register("palabraClave")}
                />
              </>
            }

            
          </form>
              </div>
            <button
              type="submit"
              className="buttonProducto"
              style={{
                color: "#f7f7f7",
                fontSize: "medium",
                margin: "auto",
                backgroundColor: "#365662",
                marginTop: "10px",
              }}
            >
              <span className="box">Filtrar</span>
            </button>
        </aside>

        <article>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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

          <Row xs={1} md={3} className="g-4">
            {productos?.map((producto) => (
              <CartaFavoritos {...producto} />
            ))}

            {productos?.length === 0 ? (
              <p>No pudimos encontrar ningún producto</p>
            ) : (
              ""
            )}
          </Row>

          {/* <Pagination className='py-4' size="lg" bsPrefix="pagination" style={{marginBottom: '-10px'}} >
						{Array.from({ length: longitudPaginacion }).map((_, index) => {
					
							return (
								<Pagination.Item
									onClick={() => handlePageChange(index + 1)}
									key={index + 1}
									active={index + 1 === state.activePage}
                  className="item"
								>
									{index + 1}
								</Pagination.Item>
							);
						})}
					</Pagination> */}
        </article>
        <Footers />
      </main>
    </Container>
  );
};
