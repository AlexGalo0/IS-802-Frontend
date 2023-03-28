import { useState } from "react";
import { Modal, Row, Table, Button } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	obtenerCategorias,
	crearCategoria,
	borrarCategorias,
	editarCategoria,
} from "../../api";
export const EdicionCategorias = () => {
	const [show, setShow] = useState(false);
	const [nombreCategoriaEditar, setNombreCategoriaEditar] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
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
		mutationFn: editarCategoria,
		onSuccess: () => {
			console.log("Categoria Editada");
			queryClient.invalidateQueries("obtenerCategorias");
		},
	});
	return (
		<div className='container-table'>
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
									handleShow(true), setNombreCategoriaEditar(categoria.nombre);
									editarCategoriaMutation.mutate({
										...categoria,
									});
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
				show={show}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>{`Edita la categoria ${nombreCategoriaEditar}`}</Modal.Title>
				</Modal.Header>
				<label htmlFor=''>Edita el nombre de la categoria: </label>
				<input type='text' />
				<label htmlFor=''>Edita la descripcion de la categoria: </label>
				<input type='text' />
				<Modal.Footer>
					<button
						onClick={() => {
							handleClose(true);
							console.log("Hey");
						}}
					>
						Guarda tu nueva categoria
					</button>
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
