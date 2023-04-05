import { useContext, useState } from "react";
import { Modal, Row, Table, Button, Container  , Alert} from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	obtenerCategorias,
	borrarCategorias,
	editarCategoria,
	crearCategoria,
} from "../../api";

import { useForm } from "react-hook-form";

import { NavbarsLR } from "../../Components/NavbarLR";
import { NavbarsLogueado } from "../../Components/NavbarLogueado";
import { UserContext } from "../../context";
import { Footers } from "../../Components/Footer";
import "./style/crud.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from "react-router";

export const EdicionCategorias = () => {
	const { userAuth } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [nombreCategoriaEditar, setNombreCategoriaEditar] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const handleReiniciar = () => {
		handleClose();
		reset();
	};
	const handleReiniciarCreacion = () => {
		handleCloseModalCreacion();
		reset();
	};
	const [showEditModal, setShowEditModal] = useState(false);
	const [categoriaAEditar, setCategoriaAEditar] = useState("");
	const [disableButton, setDisableButton] = useState(false);
	const [showCreacionModal, setShowCreacionModal] = useState(false);

	const handleCloseModalCreacion = () => setShowCreacionModal(false);
	const handleShowModalCreacion = () => setShowCreacionModal(true);

	const handleClose = () => setShowEditModal(false);
	const handleShow = () => setShowEditModal(true);

  const [mostrarAlert , setMostrarAlert] = useState(false)
	const queryClient = useQueryClient();
	const { data: categorias } = useQuery({
		queryKey: ["obtenerCategorias"],
		queryFn: obtenerCategorias,
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
			queryClient.invalidateQueries("obtenerCategorias");
      setDisableButton(true)
      setMostrarAlert(true)
      setTimeout(() => {
        handleClose(true)
        setMostrarAlert(false)
        handleReiniciar()
        setDisableButton(false)
      }, 1000);
		},
	});

	const enviarEdicionCategoria = (datosNuevaCategoria) => {

		editarCategoriaMutation.mutate({
			categoriaAEditar,
			...datosNuevaCategoria,
		});
	};

	const crearNuevaCategoriaMutation = useMutation({
		mutationFn: (datosCategoriaACrear) => crearCategoria(datosCategoriaACrear),
		onSuccess: () => {
			queryClient.invalidateQueries("obtenerCategorias");
      setDisableButton(true);
      setMostrarAlert(true)
      setTimeout(() => {
        handleCloseModalCreacion(true)
        setMostrarAlert(false)
        handleReiniciar()
        setDisableButton(false)
      }, 1000);
		},
	});

	const handleCrearCategoria = (datosCategoriaACrear) => {
		crearNuevaCategoriaMutation.mutate(datosCategoriaACrear);
	};

	const handleRedirection = () => {
		navigate(-1);
	};

	const navigate = useNavigate();
	return (
		<Container fluid className='container-grid'>
			{userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
			<header className='headerCrud' style={{ paddingTop: "122px" }}>
				<button
					className='Button-back'
					type='submit'
					onClick={handleRedirection}
				>
					<BiLeftArrow />
				</button>
				<button
					style={{
						width: "400px",
						margin: "auto",
						marginBottom: "25px",
						marginTop: "-35px",
					}}
					className='buttonGuardar'
					onClick={() => {
						handleShowModalCreacion(true);
					}}
				>
					Añadir Nueva Categoria
				</button>
				<Container className='conCrud'>
					<div className='container-table'>
						<table>
							<tr
								style={{
									width: "20%",
									borderBottom: "1px solid black",
									fontSize: "large",
								}}
							>
								<th>Nombre de Categoria</th>
								<th>Descripción</th>
							</tr>

							<tbody>
								{categorias?.map((categoria) => (
									<tr
										key={categoria.idCategoria.data}
										style={{ height: "50px", borderBottom: "1px solid black" }}
									>
										<td style={{ width: "200px" }}>{categoria.nombre}</td>
										<td>{categoria.descripcion}</td>
										<div style={{ display: "flex", gap: "5px" }}>
											<button
												className='buttonEdiBo'
												style={{ color: "#f7f7f7", fontSize: "medium" }}
												onClick={() => {
													handleShow(true);
													setCategoriaAEditar(categoria);
												}}
											>
												<span className='box'>
													<AiOutlineEdit style={{ fontSize: "25px" }} />
												</span>
											</button>
											<button
												className='buttonEdiBo'
												style={{ color: "#f7f7f7", fontSize: "medium" }}
												onClick={() => {
													borrarCategoriaMutation.mutate(
														categoria.idCategoria.data
													);
												}}
											>
												<span className='box'>
													<AiOutlineDelete style={{ fontSize: "25px" }} />
												</span>
											</button>
										</div>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			</header>

			<Footers />

			{/* Modal de crear nuevo producto */}

			<Modal
				show={showCreacionModal}
				onHide={handleCloseModalCreacion}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title style={{ fontSize: "25px" }}>
						Crea una nueva categoria{" "}
					</Modal.Title>
				</Modal.Header>
				<form
					onSubmit={handleSubmit(handleCrearCategoria)}
					style={{
						padding: "15px",
						display: "flex",
						justifyContent: "initial",
						alignItems: "initial",
						flexDirection: "column",
					}}
				>
					<label htmlFor='' className='labelModal'>
						Ingresa el nombre de la nueva categoria:{" "}
					</label>
					<input
						type='text'
						{...register("nombreCategoria")}
						className='inModal'
					/>
					<label
						htmlFor=''
						className='labelModal'
						style={{ marginTop: "90px" }}
					>
						Ingresa la descripcion de la nueva categoria:{" "}
					</label>
					<input
						type='text'
						{...register("descripcionCategoria")}
						className='inModal'
					/>
          	{mostrarAlert ? (
							<Alert variant='success'>Nueva categoria añadida!</Alert>
						) : (
							""
						)}
					{/* // handleCloseModalCreacion(true); */}
					<Modal.Footer style={{ margin: "auto" }}>
						<button type='submit' className='buttonGuardar' disabled={disableButton}>
							Guarda tu nueva categoria
						</button>
					

						<button
							onClick={handleReiniciarCreacion}
							type='reset'
							className='buttonGuardar'
						>
							Cerrar
						</button>
					</Modal.Footer>
				</form>
			</Modal>

			{/* Modal de Editar Categoria */}
			<Modal
				show={showEditModal}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title
						style={{ fontSize: "25px" }}
					>{`Edita la categoria ${categoriaAEditar.nombre}`}</Modal.Title>
				</Modal.Header>
				<form
					style={{
						padding: "15px",
						display: "flex",
						justifyContent: "initial",
						alignItems: "initial",
						flexDirection: "column",
					}}
					onSubmit={handleSubmit(enviarEdicionCategoria)}
				>
					<label htmlFor='' className='labelModal'>
						Edita el nombre de la categoria:{" "}
					</label>
					<input
						type='text'
						className='inModal'
						{...register("nombreCategoria")}
					/>

					<label
						htmlFor=''
						className='labelModal'
						style={{ marginTop: "90px" }}
					>
						Edita la descripcion de la categoria:{" "}
					</label>
					<input
						type='text'
						className='inModal'
						{...register("descripcionCategoria")}
					/>
          {
            mostrarAlert?  (
							<Alert variant='success'>Edición de categoria completada!</Alert>
						) : (
							""
						)
          }
					<Modal.Footer style={{ margin: "auto" }}>
						<button type='submit' className='buttonGuardar'>
							Guarda tu nueva categoria
						</button>
						<button
							onClick={handleReiniciar}
							className='buttonGuardar'
							type='reset'
            
						>
							Cerrar
						</button>
					</Modal.Footer>
				</form>
			</Modal>

			{/* <Modal
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
					<input type='text' {...register("descripcionCategoria")} /> */}
			{/* // handleClose(true); */}
			{/* <button type="submit">Guarda tu nueva categoria</button>

          <Modal.Footer>
            <button onClick={handleReiniciar} type="reset">
              Cerrar
            </button>
          </Modal.Footer>
        </form>
      </Modal> */}
		</Container>
	);
};

/* 
1. Botón + para añadir una categoria que levante modal C
2. Mostrar las categorias que ya estan en una tabla. R
3. Que la tabla tenga el boton de "Actualizar" U
4. Boton de Borrar D


*/
