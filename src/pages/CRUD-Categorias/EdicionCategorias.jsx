import { useContext, useState } from "react";
import {
  Modal,
  Row,
  Table,
  Button,
  Container,
  Alert,
  Image,
} from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  obtenerCategorias,
  borrarCategorias,
  editarCategoria,
  crearCategoria,
} from "../../api";

import { useForm } from "react-hook-form";

import { NavbarsLR } from "../../Components/NavbarLR";
import { NavbarsLogueado } from "../../Components/NavbarLogueado";
import { Footers } from "../../Components/Footer";
import "./style/crud.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context";
;
import { AsideAdmin } from "../../Components/AsideAdmin";

export const EdicionCategorias = () => {
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

  const handleReiniciarBorrar = () => {
    handleCloseBorrarModal();
    reset();
  };

  /* ***** CREACION DE CATEGORIA ***** */
  const [showCreacionModal, setShowCreacionModal] = useState(false);
  const handleCloseModalCreacion = () => setShowCreacionModal(false);
  const handleShowModalCreacion = () => setShowCreacionModal(true);

  const crearNuevaCategoriaMutation = useMutation({
    mutationFn: (datosCategoriaACrear) => crearCategoria(datosCategoriaACrear),
    onSuccess: () => {
      queryClient.invalidateQueries("obtenerCategorias");
      setDisableButton(true);
      setMostrarAlert(true);
      setTimeout(() => {
        handleCloseModalCreacion(true);
        setMostrarAlert(false);
        handleReiniciar();
        setDisableButton(false);
      }, 500);
    },
  });

  const handleCrearCategoria = (datosCategoriaACrear) => {
    crearNuevaCategoriaMutation.mutate(datosCategoriaACrear);
  };

  /******  EDICION DE CATEGORIA *********/
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState("");
  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  const editarCategoriaMutation = useMutation({
    mutationFn: (idCategoriaAEditar, datosNuevaCategoria) =>
      editarCategoria(idCategoriaAEditar, datosNuevaCategoria),
    onSuccess: () => {
      queryClient.invalidateQueries("obtenerCategorias");
      setDisableButton(true);
      setMostrarAlert(true);
      setTimeout(() => {
        handleClose(true);
        setMostrarAlert(false);
        handleReiniciar();
        setDisableButton(false);
      }, 500);
    },
  });

  const enviarEdicionCategoria = (datosNuevaCategoria) => {
    editarCategoriaMutation.mutate({
      categoriaAEditar,
      ...datosNuevaCategoria,
    });
  };

  /* **********BORRAR CATEGORIA**********/
  const [showBorrarModal, setShowBorrarModal] = useState(false);
  const [categoriaABorrar, setCategoriaABorrar] = useState("");
  const handleShowBorrarModal = () => setShowBorrarModal(true);
  const handleCloseBorrarModal = () => setShowBorrarModal(false);

  const borrarCategoriaMutation = useMutation({
    mutationFn: (nombreCategoriaABorrar) =>
      borrarCategorias(nombreCategoriaABorrar),
    onSuccess: () => {
      setMostrarAlert(true);
      setDisableButton(true);
      setTimeout(() => {
        handleCloseBorrarModal(true);
        setMostrarAlert(false);
        setDisableButton(false);
      }, 500);
      queryClient.invalidateQueries("obtenerCategorias");
    },
  });

  const borrarCategoria = (nombreCategoria) => {
    borrarCategoriaMutation.mutate(nombreCategoria);
  };

  /* Estados para alerta y boton */
  const [disableButton, setDisableButton] = useState(false);
  const [mostrarAlert, setMostrarAlert] = useState(false);

  const queryClient = useQueryClient();

  const { data: categorias } = useQuery({
    queryKey: ["obtenerCategorias"],
    queryFn: obtenerCategorias,
  });
  const handleRedirection = () => {
    navigate(-1);
  };

  const navigate = useNavigate();

  const { setAdminAuth } = useContext(AdminContext);
  const deslogearAdmin = () => {
    setAdminAuth(false);
    if (localStorage.getItem("token-admin") !== null) {
      localStorage.removeItem("token-admin");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <Container fluid className="container-grid">
      {/* {userAuth ? <NavbarsLogueado /> : <NavbarsLR />} */}
      <header className="headerCrud" /* style={{ paddingTop: "122px" }} */>
        <AsideAdmin/>

        <article
          style={{
            display: "flex",
						justifyContent: "initial",
						alignItems: 'center',
						flexDirection: "column",
						padding: '10px',
						width: '100%'
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <button
              className="Button-back"
              type="submit"
              onClick={handleRedirection}
            >
              <BiLeftArrow />
            </button>

            <h1 style={{ marginTop: "-8px" }}>Apartado de categorías:</h1>
          </div>

          <button
            style={{
              width: "400px",
              margin: "auto",
              marginBottom: "20px",
              marginTop: "-35px",
            }}
            className="buttonGuardar"
            onClick={() => {
              handleShowModalCreacion(true);
            }}
          >
            Añadir nueva categoría
          </button>
          <Container className="conCrud">
            <div className="container-table">
              <table>
                <tr
                  style={{
                    width: "20%",
                    borderBottom: "1px solid black",
                    fontSize: "large",
                  }}
                >
                  <th>Nombre de Categoría</th>
                  <th>Descripción</th>
                </tr>

                <tbody>
                  {categorias?.map((categoria) => (
                    <tr
                      key={categoria.idCategoria.data}
                      style={{
                        height: "50px",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <td style={{ width: "200px" }}>{categoria.nombre}</td>
                      <td>{categoria.descripcion}</td>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <button
                          className="buttonEdiBo"
                          style={{ color: "#f7f7f7", fontSize: "medium" }}
                          onClick={() => {
                            handleShow(true);
                            setCategoriaAEditar(categoria);
                          }}
                        >
                          <span className="box">
                            <AiOutlineEdit style={{ fontSize: "25px" }} />
                          </span>
                        </button>
                        <button
                          className="buttonEdiBo"
                          style={{ color: "#f7f7f7", fontSize: "medium" }}
                          onClick={() => {
                            handleShowBorrarModal(true);
                            setCategoriaABorrar(categoria);
                          }}
                        >
                          <span className="box">
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
        </article>
      </header>

      {/* <Footers /> */}

      {/* Modal de crear nuevo producto */}

      <Modal
        show={showCreacionModal}
        onHide={handleCloseModalCreacion}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "25px" }}>
            Crea una nueva categoría{" "}
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
          <label htmlFor="" className="labelModal">
            Ingresa el nombre de la nueva categoría:{" "}
          </label>
          <input
            type="text"
            {...register("nombreCategoria")}
            className="inModal"
          />
          <label
            htmlFor=""
            className="labelModal"
            style={{ marginTop: "90px" }}
          >
            Ingresa la descripción de la nueva categoría:{" "}
          </label>
          <input
            type="text"
            {...register("descripcionCategoria")}
            className="inModal"
          />
          {mostrarAlert ? (
            <Alert variant="success">¡Nueva categoría añadida!</Alert>
          ) : (
            ""
          )}
          {/* // handleCloseModalCreacion(true); */}
          <Modal.Footer style={{ margin: "auto" }}>
            <button type="submit" className="buttonGuardar">
              Guarda tu nueva categoría
            </button>
            <button
              onClick={handleReiniciarCreacion}
              type="reset"
              className="buttonGuardar"
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
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{ fontSize: "25px" }}
          >{`Edita la categoría ${categoriaAEditar.nombre}`}</Modal.Title>
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
          <label htmlFor="" className="labelModal">
            Edita el nombre de la categoría:{" "}
          </label>
          <input
            type="text"
            className="inModal"
            {...register("nombreCategoria")}
          />

          <label
            htmlFor=""
            className="labelModal"
            style={{ marginTop: "90px" }}
          >
            Edita la descripción de la categoría:{" "}
          </label>
          <input
            type="text"
            className="inModal"
            {...register("descripcionCategoria")}
          />
          {mostrarAlert ? (
            <Alert variant="success">¡Edición de categoría completada!</Alert>
          ) : (
            ""
          )}
          <Modal.Footer style={{ margin: "auto" }}>
            <button type="submit" className="buttonGuardar">
              Guarda tu nueva categoría
            </button>
            <button
              onClick={handleReiniciar}
              className="buttonGuardar"
              type="reset"
            >
              Cerrar
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Modal de Borrar Categoria */}
      <Modal
        show={showBorrarModal}
        onHide={handleCloseBorrarModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title
            style={{ fontSize: "25px" }}
          >{`Estas seguro que quieres borrar la categoría ${categoriaABorrar.nombre} ? `}</Modal.Title>
        </Modal.Header>

        {mostrarAlert ? (
          <Alert variant="success">¡Categoría eliminada!</Alert>
        ) : (
          ""
        )}
        <Modal.Footer style={{ margin: "auto" }}>
          <button
            className="buttonGuardar"
            disabled={disableButton}
            onClick={() => {
              borrarCategoria(categoriaABorrar.nombre);
            }}
          >
            Eliminar
          </button>
          <button
            onClick={handleReiniciarBorrar}
            className="buttonGuardar"
            type="reset"
          >
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
