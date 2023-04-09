import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context";
import { Alert, Form, Table } from "react-bootstrap";
import { MdOutlineInsertComment } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { crearComentario } from "../../../api";
export const Comentarios = ({productoID}) => {
	const { userAuth } = useContext(UserContext);
    const [seAgregoComentario, setSeAgregoComentario] = useState(false)
    const token = localStorage.getItem("token")
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
    
    const postearComentario=(comentario)=>{
        mutationPostearComentario.mutate(comentario)
    }
    const mutationPostearComentario= useMutation({
        mutationFn:(comentario)=>{crearComentario(token,productoID,comentario)},
        onSuccess:()=>{
            setSeAgregoComentario(true)
            setTimeout(() => {
                setSeAgregoComentario(false)
            }, 1000);
            reset()
        }
    })

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
								{...register("comentario")}
							/>
							<button className='btnComent' type="submit">
								<MdOutlineInsertComment className='iconBuscar' />
								<span className='textComent'>Comentar</span>
							</button>
						</form>
                        {
                            seAgregoComentario ? <Alert variant="success">Comentario Añadido</Alert> : ''
                        }
					</>
				) : (
					<div>Inicia Sesión para comentar</div>
				)}
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<td>3</td>
						<td colSpan={2}>Larry the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};
