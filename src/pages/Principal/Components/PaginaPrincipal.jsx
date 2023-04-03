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
		console.log("Me ejecute filtrar productos");
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

	return (
		<Container fluid className='container-grid'>
			{userAuth ? <NavbarsLogueado /> : <NavbarsLR />}

			<main>
				<aside className='text-center'>
					<h4 className='py-3 fil'>
						<FaFilter /> Filtros
					</h4>
					<SidebarFiltros />
					<span className='textBuscar'>Limpiar Filtros</span>
					<br />
					<form onSubmit={handleSubmit(filtrarProductos)}>
						<button onClick={handleReiniciar} type='reset'>
							Reiniciar
						</button>
						{categorias?.map((categoria) => (
							<div key={categoria.idCategoria.data}>
								<input
									type='checkbox'
									value={categoria.nombre}
									{...register(`categorias`)} //${categoria.nombre}
								/>
								<label htmlFor=''>{categoria.nombre}</label>
								<br />
							</div>
						))}

						<br />
						{departamentos?.map((departamento) => (
							<div key={departamento.id_dpto}>
								<input
									type='checkbox'
									value={departamento.nombre}
									{...register(`departamentos`)} //${departamento.nombre}
								/>
								<label htmlFor=''>{departamento.nombre}</label>
								<br />
							</div>
						))}

						{
							<>
								<input
									type='number'
									placeholder='Precio Minimo'
									{...register("precioMinimo")}
								/>
								<input
									type='number'
									placeholder='Precio Maximo'
									{...register("precioMaximo")}
								/>
							</>
						}
						{
							<>
								<input
									type='text'
									placeholder='Palabras Clave'
									{...register("palabraClave")}
								/>
							</>
						}

						{
							<>
								<br />
								<input
									type='checkbox'
									name=''
									id=''
									value={"7Days"}
									{...register("days")}
								/>

								<label htmlFor=''>7 Dias</label>
								<br />
								<input
									type='checkbox'
									name=''
									id=''
									value={"15Days"}
									{...register("days")}
								/>

								<label htmlFor=''>15 Dias</label>
								<br />

								<input
									type='checkbox'
									name=''
									id=''
									value={"30Days"}
									{...register("days")}
								/>

								<label htmlFor=''>30 Dias</label>
								<br />
							</>
						}
						<button type='submit'>Filtrar</button>
					</form>
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
					<button onClick={prevPage} disabled={numeroPagina === 1}>
						Prev Page
					</button>
					<button onClick={nextPage}>Next Page</button>
				</article>
				<Footers />
			</main>
		</Container>
	);
};
