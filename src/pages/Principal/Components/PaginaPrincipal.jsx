import { Container , Row } from "react-bootstrap";
import "../Style/Temp_Principal.css";
import { FaFilter } from "react-icons/fa";
import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { Footers } from "../../../Components/Footer";
import { useContext, useState } from "react";
import { UserContext } from "../../../context";
import { SidebarFiltros } from "./SidebarFiltros";
import { useQuery, useQueryClient } from "react-query";
import { obtenerDepartamentos, obtenerCategorias, obtenerProductos } from "../../../api";
import { useForm } from "react-hook-form";
import { CartaProducto } from "./CartaProducto";
export const PaginaPrincipal = () => {
	const { userAuth } = useContext(UserContext);
	const [numeroPagina , setNumeroPagina] = useState(0)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const queryClient = useQueryClient()
	const { data: categorias } = useQuery({
		queryKey: ["categorias"],
		queryFn: obtenerCategorias,
	});
	const { data: departamentos } = useQuery({
		queryKey: ["departamentos"],
		queryFn: obtenerDepartamentos,
	});

	const {data:productos} = useQuery({
		queryKey:["productos"],
		queryFn: obtenerProductos,
		
	})

	

	

	const filtrarProductos = (data) => {
		queryClient.invalidateQueries('productos')
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
						{categorias?.map((categoria) => (
							<div key={categoria.idCategoria.data}>
								<input
									type='checkbox'
									value={categoria.nombre}
									{...register(`${categoria.nombre}`)}
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
									{...register(`${departamento.nombre}`)}
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
								<input type='checkbox' name='' id='' {...register("7Days")}/>
								<label htmlFor=''>7 Dias</label>
								<br />
								<input type='checkbox' name='' id='' {...register("15Days")}/>
								<label htmlFor=''>15 Dias</label>
								<br />
								<input type='checkbox' name='' id='' {...register("20Days")}/>
								<label htmlFor=''>20 Dias</label>
								<br />
								<input type='checkbox' name='' id='' {...register("30Days")}/>
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
							<CartaProducto {...producto} />
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
