import { Container, Image, Table, Form, Button } from "react-bootstrap";
import "../Style/DashboardAdmin.css";
import logo from "../../../assets/logo.png";
import {  FaBoxes } from "react-icons/fa";
import {
    AiOutlineAreaChart,
    AiFillWarning,
    AiOutlinePoweroff,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";


import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context";
import { Link, useNavigate } from "react-router-dom";

export const DashboardAdministrador = () => {
    const navigate = useNavigate()
    const { adminAuth, setAdminAuth } = useContext(AdminContext);

    const deslogearAdmin = () => {
        console.log('Me');
    //   setAdminAuth(false);
    //   if (localStorage.getItem("token-admin") !== null) {
    //     localStorage.removeItem("token-admin");
    //     setTimeout(() => {
    //         navigate("/")
    //     }, 1000);
    //   }
    };

    return (
        <Container fluid className="container-grid">
            <header className="headerCrud" /* style={{ paddingTop: "122px" }} */>
                <aside  style={{height: '100vh', backgroundColor: '#365662', color: '#f7f7f7', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', padding: '10px'}}>
                    <div className="text-center py-3">
                        <Image src={logo} width="230px" />
                    </div>
                    {/* <ul className="center-nav pt-4">
                        <li><a href="#" style={{color: '#f7f7f7'}}><FaBoxes /> Productos</a></li>
                        <li><a href="#" style={{color: '#f7f7f7'}}><AiOutlineAreaChart /> Estadisticas</a></li>
                        <li><a href="#" style={{color: '#f7f7f7'}}><AiFillWarning /> Denuncias</a></li>
                        <li><a href="#" style={{color: '#f7f7f7'}}><FaHouseDamage /> Categorias</a></li>
                    </ul>
                    <ul className="bottom-nav">
                        <hr />
                        <li><a href="#" style={{color: '#f7f7f7'}}><BsFillGearFill /> Configuraciones</a></li>
                        <li><a href="#" style={{color: '#f7f7f7'}}> <AiOutlinePoweroff /> Cerrar sesión</a></li>
                    </ul> */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <button
                     
                      className="buttonCerrarSesion"
                    >
                     <FaBoxes style={{marginRight: '5px'}}/>Productos
                    </button>
                    <Link to='/construyendo' style={{textDecoration: 'none'}}>
                    <button
                    
                      className="buttonCerrarSesion"
                    >
                     <AiOutlineAreaChart style={{marginRight: '5px'}}/>Estadisticas
                    </button>
                    </Link>
                    <Link to='/construyendo' style={{textDecoration: 'none'}}>
                    <button
                  
                      className="buttonCerrarSesion"
                    >
                     <AiFillWarning style={{marginRight: '5px'}}/>Denuncias
                    </button>
                    </Link>
                    <Link to='/crudCategorias' style={{textDecoration: 'none'}}>
                    <button
                      
                      className="buttonCerrarSesion"
                    >
                     <BiCategory style={{marginRight: '5px'}}/>Categorias
                    </button>
                    </Link>
                    </div>

                    <button
                      onClick={deslogearAdmin}
                      className="buttonCerrarSesion"
                    >
                     <AiOutlinePoweroff style={{marginRight: '5px'}}/>Cerrar sesión
                    </button>
                </aside>

                <article>
                    <div class="main-content">
                        <div class="main-top">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Buscar Producto a dar de baja</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese el id del producto" />
                                </Form.Group>
                            </Form>
                        </div>

                        <Table striped bordered hover size="sm" className="text-center">
                            <thead>
                                <tr>
                                    <th>DNI</th>
                                    <th>Nombre</th>
                                    <th>Correo electrónico</th>
                                    <th>Fecha de registro</th>
                                    <th>Tipo</th>
                                    <th>Productos</th>
                                    <th>Estado</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> 0801-2000-00231 </td>
                                    <td> Raju </td>
                                    <td> contact.geekshelp@gmail.com </td>
                                    <td> 01-12-2020 </td>
                                    <td> Member </td>
                                    <td><a href="#">Ver productos</a></td>
                                    <td> Active </td>
                                    <td> <Button variant="danger">Eliminar</Button> </td>
                                </tr>
                                <tr>
                                    <td> 0801-2000-00231 </td>
                                    <td> Jassi </td>
                                    <td> jassisheoran@gmail.com </td>
                                    <td> 03-01-2022 </td>
                                    <td> New </td>
                                    <td><a href="#">Ver productos</a></td>
                                    <td> Active </td>
                                    <td> <Button variant="danger">Eliminar</Button> </td>
                                </tr>
                                <tr>
                                    <td> 0801-2000-00231 </td>
                                    <td> John Doe </td>
                                    <td> johndoe@gmail.com </td>
                                    <td> 22-10-2020 </td>
                                    <td> New </td>
                                    <td><a href="#">Ver productos</a></td>
                                    <td> Active </td>
                                    <td> <Button variant="danger">Eliminar</Button> </td>
                                </tr>
                                <tr>
                                    <td> 0801-2000-00231 </td>
                                    <td> Franda </td>
                                    <td> frand.geekshelp@gmail.com </td>
                                    <td> 22-12-2020 </td>
                                    <td> Member </td>
                                    <td><a href="#">Ver productos</a></td>
                                    <td> Active </td>
                                    <td> <Button variant="danger">Eliminar</Button> </td>
                                </tr>
                                <tr>
                                    <td> 0801-2000-00231 </td>
                                    <td> Raj </td>
                                    <td> testmain@gmail.com </td>
                                    <td> 20-12-2019 </td>
                                    <td> New </td>
                                    <td><a href="#">Ver productos</a></td>
                                    <td> Active </td>
                                    <td> <Button variant="danger">Eliminar</Button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </article>

            
      </header>
        </Container>
    );
};