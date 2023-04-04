import { useState } from "react";
import { Modal, Row, Table, Button } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	obtenerCategorias,
	crearCategoria,
	borrarCategorias,
	editarCategoria,
} from "../../api";
import { useForm } from "react-hook-form";
export const EdicionCategorias = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [showEditModal, setShowEditModal] = useState(false);
	const [categoriaAEditar, setCategoriaAEditar] = useState("");

	const handleClose = () => setShowEditModal(false);
	const handleShow = () => setShowEditModal(true);
	const queryClient = useQueryClient();
	const { data: categorias } = useQuery({
		queryKey: ["obtenerCategorias"],
		queryFn: obtenerCategorias,
	});

	const añadirCategoriaMutation = useMutation({
		mutationFn: crearCategoria,
		onSuccess: () => {
			console.log("Categoria creada");
			queryClient.invalidateQueries("obtenerCategorias");
		},
	});

	const borrarCategoriaMutation = useMutation({
		mutationFn: borrarCategorias,
		onSuccess: () => {
			console.log("Categoria Borrada");
			queryClient.invalidateQueries("obtenerCategorias");
		},
	});

	const editarCategoriaMutation = useMutation({
		mutationFn: (idCategoriaAEditar, datosNuevaCategoria) =>
			editarCategoria(idCategoriaAEditar, datosNuevaCategoria),
		onSuccess: () => {
			console.log('Funciono , la categoria fue editada');
			queryClient.invalidateQueries("obtenerCategorias");
		},
	});

	const enviarEdicionCategoria = (datosNuevaCategoria) => {
	
		editarCategoriaMutation.mutate({
				categoriaAEditar,
			...datosNuevaCategoria,
		});
	};
	return (
		<div className='container-table'>
			<button>Añadir Nueva Categoria</button>
			<table>
				<tr>
					<th>Nombre de Categoria</th>
					<th style={{ paddingLeft: "5px" }}>Descripción</th>
				</tr>

				<tbody>
					{categorias?.map((categoria) => (
						<tr style={{ paddingTop: "10px" }} key={categoria.idCategoria.data}>
							<td style={{ fontStyle: "italic" }}>{categoria.nombre}</td>
							<td>{categoria.descripcion}</td>
							<button
								onClick={() => {
									handleShow(true);
									setCategoriaAEditar(categoria);
								}}
							>
								Editar
							</button>
							<button
								onClick={() => {
									borrarCategoriaMutation.mutate(categoria.idCategoria.data);
								}}
							>
								Borrar
							</button>
						</tr>
					))}
				</tbody>
			</table>

			<Modal
				show={showEditModal}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>{`Edita la categoria ${categoriaAEditar.nombre}`}</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit(enviarEdicionCategoria)}>
					<label htmlFor=''>Edita el nombre de la categoria: </label>
					<input type='text' {...register("nombreCategoria")} />
					<label htmlFor=''>Edita la descripcion de la categoria: </label>
					<input type='text' {...register("descripcionCategoria")} />
					{/* // handleClose(true); */}
					<button type='submit'>Guarda tu nueva categoria</button>
				</form>

				<Modal.Footer>
					<button onClick={handleClose}>Cerrar</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

/* 
1. Botón + para añadir una categoria que levante modal C
2. Mostrar las categorias que ya estan en una tabla. R
3. Que la tabla tenga el boton de "Actualizar" U
4. Boton de Borrar D


*/
