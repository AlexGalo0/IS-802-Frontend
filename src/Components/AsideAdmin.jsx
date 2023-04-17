import React, { useContext, useState } from 'react'
import { Image } from 'react-bootstrap'
import { AiFillWarning, AiOutlineAreaChart, AiOutlineDelete, AiOutlinePoweroff } from 'react-icons/ai'
import { FaBoxes } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png';
import { BiCategory, BiUser } from 'react-icons/bi'
import { AdminContext } from '../context'
export const AsideAdmin = () => {
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
      <Link to="/dashboard-admin" style={{ textDecoration: "none" }}>
        <button className="buttonCerrarSesion">
          <FaBoxes style={{ marginRight: "5px" }} />
          Productos
        </button>
      </Link>
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
  )
}
