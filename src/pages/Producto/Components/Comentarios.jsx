import React, {  useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context";
import { Alert, Form, Table, Container } from "react-bootstrap";
import { MdOutlineInsertComment } from "react-icons/md";
import {
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
	crearComentario,
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
								style={{border: '2px solid #75E8E5'}}
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
								¡Comentario añadido!
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
			<Container className="conCrud">
			<table
				striped
				bordered
				hover /* className="tabComments" style={{borderRadius: '20px'}} */
				
			>
				<thead >
					<tr style={{
						width: "20%",
						borderBottom: "1px solid black",
						fontSize: "large",
						gap: "10px",
					}}>
						<th style={{ width: "200px" }}>Creado por:</th>
						<th  style={{ width: "90%" }}>Comentario: </th>
					</tr>
				</thead>
				<tbody>
				
					{comentariosDeProducto?.map((comentario) => (
						
							<tr key={comentario.id_comentario.data} style={{
                                height: "50px",
                                borderBottom: "1px solid black",
                                gap: "10px",
                              }}>
								<td>
									{comentario.nombres} {comentario.apellidos}
								</td>
								<td>{comentario.comentario}</td>
							</tr>
						
					))}
				</tbody>
			</table>
			</Container>
		</div>
	);
};
