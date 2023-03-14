import "bootstrap/dist/css/bootstrap.min.css";
import {
    Nav,
    Image,
    Container,
    InputGroup,
    Button
} from "react-bootstrap";


export const NavbarPrincipal = () => {
    return (
        <Nav className="navbar">
            <Container fluid>

                <button className="btn" id="menu-btn"><span className="navbar-toggler-icon"></span></button>
                <img className="mx-3 img-fluid" src="img/post-photo.jpg" alt="" width="40px"/>

                <div className="col-5 mx-auto">
                    <InputGroup>
                        <span className="input-group-text" id="basic-addon1">
                            <i className="fa-sharp fa-solid fa-magnifying-glass" style={{color:"#f26c4f"}}></i>
                        </span>
                        {/* <input type="text" className="form-control" style="background-color: #9cc4e4;"
                            placeholder="Ingresa el nombre del producto que deseas buscar" aria-label="Username"
                            aria-describedby="basic-addon1"/> */}
                    </InputGroup>
                </div>

                {/* <div>
                    <Button type="button" className="btn mx-3">Iniciar sesion <i className="fa-solid fa-right-to-bracket mx-1"
                            style="color: #f26c4f;"></i></Button>
                    <Button type="button" className="btn mx-3">Registarse <i className="fa-sharp fa-solid fa-id-card mx-1"
                            style="color: #f26c4f;"></i></Button>
                    <Button href="#" className="btn mx-3"><i className="fa-solid fa-user mx-1" style="color: #f26c4f;"></i></Button>
                </div> */}
            </Container>
        </Nav>
    )
}
