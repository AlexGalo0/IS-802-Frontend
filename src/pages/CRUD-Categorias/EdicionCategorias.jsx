import { useContext, useState } from "react";
import { Modal, Row, Table, Button, Container } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  obtenerCategorias,
  crearCategoria,
  borrarCategorias,
  editarCategoria,
} from "../../api";

import { NavbarsLR } from "../../Components/NavbarLR";
import { NavbarsLogueado } from "../../Components/NavbarLogueado";
import { UserContext } from "../../context";
import { Footers } from "../../Components/Footer";
import "./style/crud.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BiLeftArrow } from "react-icons/bi";

export const EdicionCategorias = () => {
  const { userAuth } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [nombreCategoriaEditar, setNombreCategoriaEditar] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const queryClient = useQueryClient();
  const { data: categorias } = useQuery({
    queryKey: ["obtenerCategorias"],
    queryFn: obtenerCategorias,
  });

  const añadirCategoriaMutation = useMutation({
    mutationFn: crearCategoria,
    onSuccess: () => {
      console.log("Categoria creada");
      queryClient.invalidateQueries("obtenerCategorias");
    },
  });

  const borrarCategoriaMutation = useMutation({
    mutationFn: borrarCategorias,
    onSuccess: () => {
      console.log("Categoria Borrada");
      queryClient.invalidateQueries("obtenerCategorias");
    },
  });

  const editarCategoriaMutation = useMutation({
    mutationFn: editarCategoria,
    onSuccess: () => {
      console.log("Categoria Editada");
      queryClient.invalidateQueries("obtenerCategorias");
    },
  });

  const handleRedirection = () => {
    navigate("/");
  };
  return (
    <Container fluid className="container-grid">
      {userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
      <header className="headerCrud" style={{ paddingTop: "122px" }}>
        <button
          className="Button-back"
          type="submit"
          onClick={handleRedirection}
        >
          <BiLeftArrow />
        </button>
        <Container className="conCrud">
          <div className="container-table">
            <table>
              <tr style={{ width: "20%", borderBottom: '1px solid black', fontSize: 'large' }}>
                <th>Nombre de Categoria</th>
                <th>Descripción</th>
              </tr>

              <tbody>
                {categorias?.map((categoria) => (
                  <tr
                    key={categoria.idCategoria.data}
                    style={{ height: "50px", borderBottom: '1px solid black' }}
                  >
                    <td style={{ width: "200px" }}>
                      {categoria.nombre}
                    </td>
                    <td>{categoria.descripcion}</td>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        className="buttonEdiBo"
                        style={{ color: "#f7f7f7", fontSize: "medium" }}
                        onClick={() => {
                          handleShow(true),
                            setNombreCategoriaEditar(categoria.nombre);
                          editarCategoriaMutation.mutate({
                            ...categoria,
                          });
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
                          borrarCategoriaMutation.mutate(
                            categoria.idCategoria.data
                          );
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

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{fontSize: '25px'}}>{`Edita la categoria ${nombreCategoriaEditar}`}</Modal.Title>
              </Modal.Header >
			  <div 
			  style={{padding: '15px', display: 'flex', justifyContent: 'initial', alignItems: 'initial', flexDirection:'column'}}>
              <label htmlFor="" className="labelModal">Edita el nombre de la categoria: </label>
              <input type="text" 
				className="inModal"/>


              <label htmlFor="" className="labelModal" style={{marginTop: '90px'}}>Edita la descripcion de la categoria: </label>
              <input type="text" className="inModal"/>
              <Modal.Footer style={{margin: 'auto'}}>
                <button
				className="buttonGuardar"
                  onClick={() => {
                    handleClose(true);
                    console.log("Hey");
                  }}
                >
                  Guarda tu nueva categoria
                </button>
                <button onClick={handleClose} 
				className="buttonGuardar">Cerrar</button>
              </Modal.Footer>
			  </div>
            </Modal>
          </div>
        </Container>
      </header>

      <Footers />
    </Container>
  );
};

/* 
1. Botón + para añadir una categoria que levante modal C
2. Mostrar las categorias que ya estan en una tabla. R
3. Que la tabla tenga el boton de "Actualizar" U
4. Boton de Borrar D


*/
