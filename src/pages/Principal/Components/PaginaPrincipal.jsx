import { Container, Row } from "react-bootstrap";
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
import { CartaProducto } from "./CartaProducto";

export const PaginaPrincipal = () => {
	const { userAuth } = useContext(UserContext);
	const [numeroPagina, setNumeroPagina] = useState(0);
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
	const { data: productos } = useQuery({
		queryKey: ["productos"],
		queryFn: obtenerProductos,
    onSuccess:()=>{
      console.log('Me ejecute');
    }
	});

	const mutationFiltros = useMutation({
		mutationFn: enviarFiltros,
		onSuccess: (data) => {
			queryClient.setQueryData("productos", data);
		},
		onError: () => {
		onError: () => {
			console.log("Hubo un error");
		},
	});
		},
	});

	const filtrarProductos = (datosFiltrado) => {
		queryClient.cancelQueries("productos");
		mutationFiltros.mutate({
			...datosFiltrado,
		});
		queryClient.fetchQuery("productos");
	};

	const handleReiniciar = () => {
		reset(valoresIniciales);
    queryClient.invalidateQueries('productos')
    queryClient.fetchQuery("productos");
	};

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
						<button onClick={handleReiniciar} type="reset">Reiniciar</button>
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
					<Row xs={1} md={3} className='g-4'>
						{productos?.map((producto) => (
							<CartaProducto {...producto} key={producto.idProducto.data} />
						))}

						{productos?.length === 0 ? (

						{productos?.length === 0 ? (
							<p>No pudimos encontrar ningún producto</p>
						) : (
							""
						)}
					</Row>
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
