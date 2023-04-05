import { Container, Image, Table, Form, Button } from "react-bootstrap";
import "../Style/DashboardAdmin.css";
import logo from "../../../assets/logoV2.png";
import { FaHouseDamage, FaBoxes } from "react-icons/fa";
import {
    AiOutlineAreaChart,
    AiFillWarning,
    AiOutlinePoweroff,
} from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";

export const DashboardAdministrador = () => {
    return (
        <Container fluid className="container-grid">
            <main className="dash">
                <aside  >
                    <div className="text-center py-3">
                        <Image src={logo} width="100px" />
                    </div>
                    <ul className="center-nav pt-4">
                        <li><a href="#" style={{color: 'black'}}><FaHouseDamage /> Panel principal</a></li>
                        <li><a href="#" style={{color: 'black'}}><FaBoxes /> Productos</a></li>
                        <li><a href="#" style={{color: 'black'}}><AiOutlineAreaChart /> Estadisticas</a></li>
                        <li><a href="#" style={{color: 'black'}}><AiFillWarning /> Denuncias</a></li>
                    </ul>
                    <ul className="bottom-nav">
                        <hr />
                        <li><a href="#" style={{color: 'black'}}><BsFillGearFill /> Configuraciones</a></li>
                        <li><a href="#" style={{color: 'black'}}> <AiOutlinePoweroff /> Cerrar sesión</a></li>
                    </ul>
                </aside>

                <article>
                    <div class="main-content">
                        <div class="main-top">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Buscar usuario por DNI</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese el dni del usuario" />
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

            </main>
        </Container>
    );
};