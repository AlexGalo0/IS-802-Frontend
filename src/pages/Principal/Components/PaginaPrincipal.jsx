import { Container, Row } from "react-bootstrap";
import "../Style/Temp_Principal.css";
import { FaFilter } from "react-icons/fa";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { Footers } from "../../../Components/Footer";
import { useContext, useState, useRef, useCallback } from "react";
import { UserContext } from "../../../context";
import { SidebarFiltros } from "./SidebarFiltros";
import {
	useMutation,
	useQuery,
	useQueryClient,
	useInfiniteQuery,
} from "react-query";
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

	const [pageParam, setPageParam] = useState(1);
	const {
		fetchNextPage, //function
		hasNextPage, //boolean
		isFetchingNextPage, //boolean
		data,
		status,
		error,
	} = useInfiniteQuery({
		queryKey: ["productos"],
		queryFn: ({ pageParam = 1 }) => obtenerProductos(pageParam),
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length ? allPages.length + 1 : undefined;
		},
	});

	/* Codigo para infinity scrolling */

	const intObserver = useRef();
	const lastPostRef = useCallback(
		(productos) => {
			if (isFetchingNextPage) return;
			if (intObserver.current) intObserver.current.disconnect();

			intObserver.current = new IntersectionObserver((productos) => {
				if (productos[0].isIntersecting && hasNextPage) {
					console.log("Crca del ultimo elemento");
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
				return <CartaProducto ref={lastPostRef} producto={post} />;
			}
			return <CartaProducto producto={post} />;
		});
	});

	const mutationFiltros = useMutation({
		mutationFn: (datosFiltrado) => enviarFiltros(datosFiltrado, pageParam),
		onSuccess: (data) => {
			queryClient.setQueryData({
				pages: [data],
				pageParam: [1],
			});
      setPageParam(1)
		},
	});
	const filtrarProductos = (datosFiltrado) => {
		mutationFiltros.mutate(datosFiltrado);
	};

	const handleReiniciar = () => {};

	return (
		<Container fluid className='container-grid'>
			{userAuth ? <NavbarsLogueado /> : <NavbarsLR />}

			<main className='principal'>
				<aside className='text-center'>
					<h4 className='py-3 fil'>
						<FaFilter /> Filtros
					</h4>
					<SidebarFiltros />
					<button
						onClick={handleReiniciar}
						className='btnFiltros'
						style={{ marginTop: "-5px" }}
					>
						<span className='textBuscar'>Limpiar Filtros</span>
					</button>
					<div style={{ padding: "5px" }} className='scroll'>
						<form onSubmit={handleSubmit(filtrarProductos)}>
							<h5 className='py-3 cate'>Categorias</h5>
							{categorias?.map((categoria) => (
								<div
									key={categoria.idCategoria.data}
									className='checkbox-apple'
									style={{ width: "auto" }}
								>
									<input
										style={{ marginTop: "3px" }}
										className='yep'
										id={categoria.nombre}
										type='checkbox'
										value={categoria.nombre}
										{...register(`categoria`)}
									/>
									<label
										htmlFor=''
										for={categoria.nombre}
										style={{ marginTop: "3px" }}
									></label>
									<p className='checkP'>{categoria.nombre}</p>
									<br />
								</div>
							))}

							<br />
							<h5 className='py-3 cate'>Departamentos</h5>
							{departamentos?.map((departamento) => (
								<div
									key={departamento.id_dpto}
									className='checkbox-apple'
									style={{ width: "auto" }}
								>
									<input
										style={{ marginTop: "3px" }}
										className='yep'
										id={departamento.nombre}
										type='checkbox'
										value={departamento.nombre}
										{...register(`departamentos`)}
									/>
									<label
										htmlFor=''
										for={departamento.nombre}
										style={{ marginTop: "3px" }}
									></label>
									<p className='checkP'>{departamento.nombre}</p>
									<br />
								</div>
							))}

							<br />
							<h5 className='py-3 cate'>Fecha</h5>
							{
								<>
									<div className='checkbox-apple' style={{ width: "auto" }}>
										<input
											type='checkbox'
											name=''
											id='7'
                      value={'7Days'}
											{...register("days")}
											style={{ marginTop: "3px" }}
											className='yep'
										/>
										<label
											htmlFor=''
											for='7'
											style={{ marginTop: "3px" }}
										></label>
										<p className='checkP'>7 Dias</p>
										<br />
									</div>
									<div className='checkbox-apple' style={{ width: "auto" }}>
										<input
											type='checkbox'
											name=''
											id='15'
                      value={'15Days'}
											{...register("days")}
											style={{ marginTop: "3px" }}
											className='yep'
										/>
										<label
											htmlFor=''
											for='15'
											style={{ marginTop: "3px" }}
										></label>
										<p className='checkP'>15 Dias</p>
										<br />
									</div>
									
									<div className='checkbox-apple' style={{ width: "auto" }}>
										<input
											type='checkbox'
											name=''
											id='30'
                      value={'30Days'}
											{...register("days")}
											style={{ marginTop: "3px" }}
											className='yep'
										/>
										<label
											htmlFor=''
											for='30'
											style={{ marginTop: "3px" }}
										></label>
										<p className='checkP'>30 Dias</p>
										<br />
									</div>
								</>
							}

							<br />
							<h5 className='py-3 cate'>Precios</h5>
							{
								<>
									<label htmlFor='' className='labelPrecio'>
										Precio Mínimo:
									</label>
									<input
										className='inPrecio'
										type='number'
										{...register("precioMinimo")}
									/>

									<label htmlFor='' className='labelPrecio'>
										Precio Máximo:
									</label>
									<input
										className='inPrecio'
										type='number'
										{...register("precioMaximo")}
									/>
								</>
							}

							<br />
							<h5 className='py-3 cate'>Buscador</h5>
							{
								<>
									<label htmlFor='' className='labelPrecio'>
										Palabras Clave:
									</label>
									<input
										className='inPrecio'
										type='text'
										{...register("palabraClave")}
									/>
								</>
							}
							<button
								type='submit'
								className='buttonProducto'
								style={{
									color: "#f7f7f7",
									fontSize: "medium",
									margin: "auto",
									backgroundColor: "#365662",
									marginTop: "10px",
								}}
							>
								<span className='box'>Filtrar</span>
							</button>
						</form>
					</div>
				</aside>

				<article>
					<Row xs={1} md={3} className='g-4'>
						{content}
					</Row>
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
