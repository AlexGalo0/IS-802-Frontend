import { Container, Row } from "react-bootstrap";
import "../Style/Temp_Principal.css";
import { FaFilter } from "react-icons/fa";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { Footers } from "../../../Components/Footer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context";
import { SidebarFiltros } from "./SidebarFiltros";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
	obtenerDepartamentos,
	obtenerCategorias,
	enviarFiltros,
	obtenerProductos,
} from "../../../api";
import { useForm } from "react-hook-form";
import { CartaProducto } from "./CartaProducto";

export const PaginaPrincipal = () => {
	const { userAuth } = useContext(UserContext);
	const [numeroPagina, setNumeroPagina] = useState(1);
	const [valoresIniciales, setValoresIniciales] = useState({
		categorias: [],
		departamentos: [],
		precioMinimo: "",
		precioMaximo: "",
		palabraClave: "",
		days: [],
	});

	const { register, handleSubmit, reset } = useForm({
		defaultValues: valoresIniciales,
	});
	const queryClient = useQueryClient();
	const { data: categorias } = useQuery({
		queryKey: ["categorias"],
		queryFn: obtenerCategorias,
	});
	const { data: departamentos } = useQuery({
		queryKey: ["departamentos"],
		queryFn: obtenerDepartamentos,
	});
	const {
		data: productos,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["productos", numeroPagina],
		queryFn: () => obtenerProductos(numeroPagina),
		keepPreviousData: true,
	});

	const mutationFiltros = useMutation({
		mutationFn: (datosFiltrados) => enviarFiltros(datosFiltrados, numeroPagina),
		onSuccess: (data) => {
			queryClient.setQueryData(["productos", numeroPagina], data);
		},
		onError: () => {},
	});
	const filtrarProductos = (datosFiltrado) => {
		setNumeroPagina(1);
		
		queryClient.cancelQueries(["productos", numeroPagina]);
		mutationFiltros.mutate(datosFiltrado);
	};

	const handleReiniciar = () => {
		reset(valoresIniciales);
		queryClient.invalidateQueries(["productos", numeroPagina]);
		setNumeroPagina(1);
		queryClient.fetchQuery(["productos", numeroPagina]);
	};
	const nextPage = () => setNumeroPagina((prev) => prev + 1);

	const prevPage = () => setNumeroPagina((prev) => prev - 1);

    /* Funcion para que las pantallas aparezcan al inicio */
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

	return (
		<Container fluid className='container-grid'>
			{userAuth ? <NavbarsLogueado /> : <NavbarsLR />}

			<main className="principal">
      <aside className="text-center">
          <h4 className="py-3 fil">
            <FaFilter /> Filtros
          </h4>
          <SidebarFiltros />
          <button onClick={handleReiniciar} className="btnFiltros" style={{marginTop: '-5px'}}>
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
					{isLoading ? (
						<div>Loading...</div>
					) : isError ? (
						<div>Error: {error.message}</div>
					) : (
						""
					)}
					<Row xs={1} md={3} className='g-4'>
						{productos?.map((producto) => (
							<CartaProducto {...producto} key={producto.idProducto.data} />
						))}

						{productos?.length === 0 ? (
							<p>No pudimos encontrar ningún producto</p>
						) : (
							""
						)}
					</Row>
					<span> Numero de Pagina : {numeroPagina}</span>
					<button onClick={ () => { scrollToTop(); prevPage()}} disabled={numeroPagina === 1} > 
						Prev Page
					</button>
					<button onClick={ () => { scrollToTop(); nextPage()}}>Next Page</button>
				</article>
				<Footers />
			</main>
		</Container>
	);
};


/* 
	Funcion para Filtrar: 
	const objetoFiltrado = Object.keys(objeto)
  .filter(key => objeto[key] !== false)
  .reduce((obj, key) => {
    obj[key] = objeto[key];
    return obj;
  }, {});

*/