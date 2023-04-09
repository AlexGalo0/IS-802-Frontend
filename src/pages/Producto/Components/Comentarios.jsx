import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context";
import { Alert, Form, Table } from "react-bootstrap";
import { MdOutlineInsertComment } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
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
				setSeAgregoComentario(false);
			}, 1000);
			reset();
		},
	});

	// const {data:comentarios} = useQuery({
	// 	queryKey:["comentarios"],
	// 	queryFn:()=>{obtenerComentarios(productoID)}
	// })

	return (
		<div className='comments'>
			<h1>Comentarios</h1>

			<h4>Añadir un comentario:</h4>
			<div style={{ display: "flex", flexDirection: "row" }}>
				{userAuth ? (
					<>
						<form onSubmit={handleSubmit(postearComentario)}>
							<Form.Control
								className='comment'
								type='text'
								{...register("comentario", {
									required: true,
									maxLength: 20,
								})}
							/>
							<button className='btnComent' type='submit'>
								<MdOutlineInsertComment className='iconBuscar' />
								<span className='textComent'>Comentar</span>
							</button>
						</form>
						{seAgregoComentario ? (
							<Alert variant='success'>Comentario Añadido</Alert>
						) : (
							""
						)}
					</>
				) : (
					<div>Inicia Sesión para comentar</div>
				)}
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Creado por: </th>
						<th>Comentario: </th>
					</tr>
				</thead>
				<tbody>
					{/* Obtener Comentarios */}
					<tr>
						{/* Hacer un map de los comentarios obtenidos , que me devuelva
                        
                        tr
                        td{nombre}
                        td{comentario}
                        tr
                        */
                        }
						<td>Mark</td>
						<td>Otto</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};
