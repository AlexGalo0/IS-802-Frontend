import { Container, Image, Table, Form, Button, Modal } from "react-bootstrap";
import "../Style/DashboardAdmin.css";
import logo from "../../../assets/logo.png";
import { FaBoxes } from "react-icons/fa"; BiUser
import { BiUser } from "react-icons/bi";
import {
  AiOutlineAreaChart,
  AiFillWarning,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context";
import { Link, useNavigate } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export const DashboardAdministrador = () => {
  const navigate = useNavigate();
  const { adminAuth, setAdminAuth } = useContext(AdminContext);

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

const [showBorrarModal, setShowBorrarModal] = useState(false);
const handleShowBorrarModal = () => setShowBorrarModal(true);
const handleCloseBorrarModal = () => setShowBorrarModal(false);

  return (
    <Container fluid className="container-grid">
      <header className="headerCrud" /* style={{ paddingTop: "122px" }} */>
        <aside
          style={{
            height: "100vh",
            backgroundColor: "#365662",
            color: "#f7f7f7",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <div className="text-center py-3">
            <Image src={logo} width="230px" />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            
            <Link to="/usuarios" style={{ textDecoration: "none" }}>
              <button className="buttonCerrarSesion">
                <BiUser style={{ marginRight: "5px" }} />
                Usuarios
              </button>
            </Link>
            <button className="buttonCerrarSesion">
              <FaBoxes style={{ marginRight: "5px" }} />
              Productos
            </button>
            <Link to="/construyendo" style={{ textDecoration: "none" }}>
              <button className="buttonCerrarSesion">
                <AiOutlineAreaChart style={{ marginRight: "5px" }} />
                Estadísticas
              </button>
            </Link>
            <Link to="/construyendo" style={{ textDecoration: "none" }}>
              <button className="buttonCerrarSesion">
                <AiFillWarning style={{ marginRight: "5px" }} />
                Denuncias
              </button>
            </Link>
            <Link to="/admin/crudCategorias" style={{ textDecoration: "none" }}>
              <button className="buttonCerrarSesion">
                <BiCategory style={{ marginRight: "5px" }} />
                Categorías
              </button>
            </Link>
          </div>

          <button onClick={deslogearAdmin} className="buttonCerrarSesion">
            <AiOutlinePoweroff style={{ marginRight: "5px" }} />
            Cerrar sesión
          </button>
        </aside>

        <article
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "-20px",
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

            <h1 style={{ marginTop: "-8px" }}>Apartado de productos:</h1>
          </div>

          <Container className="conCrud">
            <div
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
                <h4>Ingrese el id del producto a buscar:</h4>
                <div style={{display: 'flex', width: '360px', margin: 'auto'}}>
              <input
                className="inPrecio"
                style={{ width: "280px", height: '30px', marginTop: '5px' }}
                type="number"
              />
              <button
                type="submit"/* 
                style={{ width: "110px" }} */
                className='buttonGuardar'
              >
                Buscar
              </button>
              </div>
            </div>
            <div className="container-table">
              <table>
                <tr
                  style={{
                    width: "20%",
                    borderBottom: "1px solid black",
                    fontSize: "large",
                  }}
                >
                  <th>idProducto</th>
                  <th>Nombre del producto</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Departamento</th>
                  <th>Inventario</th>
                  <th>Dueño</th>
                </tr>

                <tbody>
                  <tr
                    style={{
                      height: "50px",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <td style={{ width: "200px" }}>NOMBRE</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        className="buttonEdiBo"
                        style={{ color: "#f7f7f7", fontSize: "medium" }}
                        onClick={() => {
														handleShowBorrarModal(true);
													}}
                      >
                        <span className="box">
                          <AiOutlineDelete style={{ fontSize: "25px" }} />
                        </span>
                      </button>
                    </div>
                  </tr>
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
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title
						style={{ fontSize: "25px" }}
					>{`¿Queres dar de baja a este producto?`}</Modal.Title>
				</Modal.Header>

				{/* {mostrarAlert ? (
					<Alert variant='success'>¡Categoría eliminada!</Alert>
				) : (
					""
				)} */}
				<Modal.Footer style={{ margin: "auto" }}>
					<button
						className='buttonGuardar'/* 
						disabled={disableButton} */
						
					>
						Eliminar
					</button>
					<button
						
						onClick={handleReiniciarBorrar}
						className='buttonGuardar'
					>
						Cancelar
					</button>
				</Modal.Footer>
			</Modal>
    </Container>
  );
};
