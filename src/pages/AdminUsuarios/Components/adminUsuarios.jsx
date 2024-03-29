import {
  Container,
  Modal,
  Alert,
} from "react-bootstrap";
import "../Style/DashboardAdmin.css";

BiUser;
import { BiUser } from "react-icons/bi";

import { useContext, useState } from "react";
import { AdminContext } from "../../../context";
import { Link, useNavigate } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";
import {  AiOutlineDelete } from "react-icons/ai";
import { AsideAdmin } from "../../../Components/AsideAdmin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { darBajaUsuario, obtenerTodosUsuarios } from "../../../api";

export const AdminUsuarios = () => {
  const navigate = useNavigate();
  const { adminAuth, setAdminAuth } = useContext(AdminContext);
  const [usuarioABorrar, setUsuarioABorrar] = useState({});
  const deslogearAdmin = () => {
    setAdminAuth(false);
    if (localStorage.getItem("token-admin") !== null) {
      localStorage.removeItem("token-admin");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const handleRedirection = () => {
    navigate(-1);
  };

  const handleReiniciarBorrar = () => {
    handleCloseBorrarModal();
  };

  const { data: usuarios } = useQuery({
    queryKey: ["usuarios"],
    queryFn: obtenerTodosUsuarios,
  });
  const queryClient = useQueryClient();
  const [showBorrarModal, setShowBorrarModal] = useState(false);
  const handleShowBorrarModal = () => setShowBorrarModal(true);
  const handleCloseBorrarModal = () => setShowBorrarModal(false);
  const [borradoCorrectamente, setBorradoCorrectamente] = useState(false);
  const borrarUsuarioMutation = useMutation({
    mutationFn: (dniUsuario) => {
      darBajaUsuario(dniUsuario);
    },
    onSuccess: () => {
      setBorradoCorrectamente(true);
      setTimeout(() => {
        handleCloseBorrarModal();
        setBorradoCorrectamente(false);
        queryClient.invalidateQueries("usuarios");
      }, 1000);
    },
  });
  const borrarUsuario = (usuarioAEliminar) => {
    borrarUsuarioMutation.mutate(usuarioAEliminar.dni);
  };

  return (
    <Container fluid className="container-grid">
      <header className="headerCrud" /* style={{ paddingTop: "122px" }} */>
        <AsideAdmin />

        <article
          style={{
            display: "flex",
            justifyContent: "initial",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px",
            width: "100%",
            marginLeft: '249px'
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "10px",
            }}
          >
            <button
              className="Button-back"
              type="submit"
              onClick={handleRedirection}
            >
              <BiLeftArrow />
            </button>

            <h1 style={{ marginTop: "-8px" }}>Apartado de usuarios:</h1>
          </div>

          <Container className="conCrud">
            <div
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              {/* 
              
							<h4>Ingrese el id del usuario a buscar:</h4>
              <div style={{ display: "flex", width: "360px", margin: "auto" }}>
								<input
									className='inPrecio'
									style={{ width: "280px", height: "30px", marginTop: "5px" }}
									type='number'
								/>
								<button
									type='submit'
									className='buttonGuardar'
								>
									Buscar
								</button>
							</div>
              
              */}
            </div>
            <div className="container-table">
              <table>
                <tr
                  style={{
                    width: "20%",
                    borderBottom: "1px solid black",
                    fontSize: "large",
                    gap: "10px",
                  }}
                >
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Dirección de domicilio</th>
                  <th>DNI</th>
                </tr>

                <tbody>
                  {usuarios?.map((usuario) => (
                    <tr
                      style={{
                        height: "50px",
                        borderBottom: "1px solid black",
                        gap: "10px",
                      }}
                    >
                      <td style={{ width: "100px" }}>{usuario.nombres}</td>
                      <td style={{ width: "100px" }}>{usuario.apellidos}</td>
                      <td style={{ width: "150px" }}>{usuario.telefono}</td>
                      <td style={{ width: "250px" }}>{usuario.email}</td>
                      <td style={{ width: "150px" }}>{usuario.direccion}</td>
                      <td style={{ width: "200px" }}>{usuario.dni}</td>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <Link
                          to={`/admin/usuarios/productos-usuarios/${usuario.dni}`}
                          style={{ textDecoration: "none" }}
                        >
                          <button
                            className="buttonEdiBo"
                            style={{
                              color: "#f7f7f7",
                              fontSize: "medium",
                              width: "145px",
                            }}
                            onClick={() => {
                              handleShowBorrarModal(true);
                            }}
                          >
                            <span className="box">Ver sus productos</span>
                          </button>
                        </Link>
                        <button
                          className="buttonEdiBo"
                          style={{ color: "#f7f7f7", fontSize: "medium" }}
                          onClick={() => {
                            handleShowBorrarModal(true);
                            setUsuarioABorrar(usuario);
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

      {/* Modal de dar de baja a productos */}
      <Modal
        show={showBorrarModal}
        onHide={handleCloseBorrarModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title
            style={{ fontSize: "25px" }}
          >{`¿Queres dar de baja al usuario ${usuarioABorrar.nombres}?`}</Modal.Title>
        </Modal.Header>

        <Modal.Footer style={{ margin: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <button
                className="buttonGuardar"
                onClick={() => {
                  borrarUsuario(usuarioABorrar);
                }}
              >
                Eliminar
              </button>
              <button onClick={handleReiniciarBorrar} className="buttonGuardar">
                Cancelar
              </button>
            </div>
            {borradoCorrectamente ? (
              <Alert variant="success" style={{ marginTop: "10px" }}>
                ¡El usuario {usuarioABorrar.nombres} fue eliminado!
              </Alert>
            ) : (
              ""
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
