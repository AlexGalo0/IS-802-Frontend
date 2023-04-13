import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context";
import { Alert, Form, Table } from "react-bootstrap";
import { MdOutlineInsertComment } from "react-icons/md";
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
	crearComentario,
	obtenerCategorias,
	obtenerComentarios,
} from "../../../api";
export const Comentarios = ({ productoID }) => {
	const { userAuth } = useContext(UserContext);
	const [seAgregoComentario, setSeAgregoComentario] = useState(false);
	const token = localStorage.getItem("token");
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const queryClient = useQueryClient();

	const { data: comentariosDeProducto } = useQuery({
		queryKey: ["comentarios"],
		queryFn: ()=>obtenerComentarios(productoID),
	});

	const postearComentario = (comentario) => {
		mutationPostearComentario.mutate(comentario);
	};

	const mutationPostearComentario = useMutation({
		mutationFn: (comentario) => {
			crearComentario(token, productoID, comentario);
		},
		onSuccess: () => {
			setSeAgregoComentario(true);
			setTimeout(() => {
				queryClient.invalidateQueries("comentarios");
				
				setSeAgregoComentario(false);
			}, 500);
			reset();
		
		},
	});

	return (
		<div className='comments'>
			<h1>Comentarios</h1>

			<h4>Añade un comentario:</h4>
			<div>
				{userAuth ? (
					<>
						<form
							onSubmit={handleSubmit(postearComentario)}
							style={{
								display: "flex",
								flexDirection: "row",
								margin: "15px",
								marginLeft: "0px",
								marginRight: "0px",
							}}
						>
							<Form.Control
								className='comment'
								type='text'
								{...register("comentario", {
									required: true,
									maxLength: 50,
								})}
							/>
							<button className='btnComent' type='submit'>
								<MdOutlineInsertComment className='iconBuscar' />
								<span className='textComent'>Comentar</span>
							</button>
						</form>
						{seAgregoComentario ? (
							<Alert
								variant='success'
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: "200px",
									margin: "auto",
									marginBottom: "15px",
								}}
							>
								Comentario añadido
							</Alert>
						) : (
							""
						)}
					</>
				) : (
					<Alert
						variant='success'
						style={{
							margin: "auto",
							display: "flex",
							justifyContent: "center",
							width: "300px",
							marginBottom:'30px'
						}}
					>
						¡Inicia sesión para comentar!
					</Alert>
				)}
			</div>
			<Table
				striped
				bordered
				hover /* className="tabComments" style={{borderRadius: '20px'}} */
				
			>
				<thead>
					<tr>
						<th style={{ width: "200px" }}>Creado por: </th>
						<th>Comentario: </th>
					</tr>
				</thead>
				<tbody>
				
					{comentariosDeProducto?.map((comentario) => (
						
							<tr key={comentario.id_comentario.data}>
								<td>
									{comentario.nombres} {comentario.apellidos}
								</td>
								<td>{comentario.comentario}</td>
							</tr>
						
					))}
				</tbody>
			</Table>
		</div>
	);
};
