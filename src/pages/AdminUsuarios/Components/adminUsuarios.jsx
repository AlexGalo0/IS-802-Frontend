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
import { AsideAdmin } from "../../../Components/AsideAdmin";

export const AdminUsuarios = () => {
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
       <AsideAdmin/>

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

            <h1 style={{ marginTop: "-8px" }}>Apartado de usuarios:</h1>
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
                <h4>Ingrese el id del usuario a buscar:</h4>
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
                  <th>idUsuario</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono</th>
                  <th>DNI</th>
                  <th>Correo</th>
                  <th>Departamento</th>
                </tr>

                <tbody>
                  <tr
                    style={{
                      height: "50px",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <td style={{ width: "200px" }}>1</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <td style={{ width: "200px" }}>DESC</td>
                    <div style={{ display: "flex", gap: "5px" }}>
                    <button
                        className="buttonEdiBo"
                        style={{ color: "#f7f7f7", fontSize: "medium", width: '145px' }}
                        onClick={() => {
														handleShowBorrarModal(true);
													}}
                      >
                        <span className="box">
                          Ver sus productos
                        </span>
                      </button>
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
					>{`¿Queres dar de baja a este usuario?`}</Modal.Title>
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
