import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import "./style.css";
import { useForm } from "react-hook-form";
import { FaVaadin } from "react-icons/fa";

export const Registro = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const enviarInfo = (data) => {
    console.log(data);
  };

  return (
    <>
      <header className="App-header">
        <Container
          style={{
            background: '#FFF',
            border: "#F2EFED",
            width: "600px",
            height: "850px",
            color: "#3D403A",
          }}
        >
          <Form
            fluid
            style={{
              justifyContent: "space-between",
              background: "#F2E8DF",
              margin: "15px auto",
              padding: "40px",
              boxShadow: "3px 3px 3px 3px rgba(32,32,32,0.3)",
              textAlign: "center",
            }}
            onSubmit={handleSubmit(enviarInfo)}
          >
            <h2 style={{ color: "#59362E", padding: '45px' }}>Crea tu cuenta de : </h2>

            <Row>
              <Col md>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNombre"
                  style={{ color: "#3D403A" }}
                >
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    style={{
                      background:
                        "#FFF" /* Falta cambiar el color al placeholder */, 
                    }}
                    type="text"
                    placeholder="Ingrese su nombre"
                    {...register("nombre")}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicApellido"
                  style={{ color: "#3D403A" }}
                >
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    style={{
                      background:
                        "#888c81" /* Falta cambiar el color al placeholder */,
                    }}
                    type="text"
                    placeholder="Ingrese su apellido"
                    {...register("apellido")}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicApellido"
                  style={{ color: "#3D403A" }}
                >
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    style={{
                      background:
                        "#888c81" /* Falta cambiar el color al placeholder */,
                    }}
                    type="text"
                    placeholder="Ingrese su telefono celular"
                    {...register("apellido")}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicApellido"
                  style={{ color: "#3D403A" }}
                >
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <Form.Control
                    style={{
                      background:
                        "#888c81" /* Falta cambiar el color al placeholder */,
                    }}
                    type="date"
                    placeholder="Ingrese su Fecha de nacimiento"
                    {...register("apellido")}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group
              className="mb-3"
              controlId="formBasicApellido"
              style={{ color: "#3D403A" }}
            >
              <Form.Label>DNI</Form.Label>
              <Form.Control
                style={{
                  background:
                    "#888c81" /* Falta cambiar el color al placeholder */,
                }}
                type="text"
                placeholder="Ingrese su DNI"
                {...register("apellido")}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ color: "#3D403A" }}
            >
              <Form.Label>Correo</Form.Label>
              <Form.Control
                style={{
                  background:
                    "#888c81" /* Falta cambiar el color al placeholder */,
                }}
                type="email"
                placeholder="Ingrese su correo electronico"
              />
              <Form.Text className="text-muted" style={{ color: "#3D403A" }}>
                Nunca compartiremos tu correo electronico.
              </Form.Text>
            </Form.Group>

            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: "#3D403A" }}>
                    Contrasenia
                  </Form.Label>
                  <Form.Control
                    style={{ background: "#888c81" }}
                    type="password"
                    placeholder="Ingrese su contrasenia"
                  />
                </Form.Group>
              </Col>

              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: "#3D403A" }}>
                    Confirmar contrasenia
                  </Form.Label>
                  <Form.Control
                    style={{ background: "#888c81" }}
                    type="password"
                    placeholder="Ingrese su contrasenia"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Select aria-label="Departamentos">
              <option>
                <h3>
                  Seleccione su departamento <FaVaadin />
                </h3>
              </option>
              <option value="1">Atlantida</option>
              <option value="2">Colon</option>
              <option value="3">Comayagua</option>
              <option value="4">Copan</option>
              <option value="5">Cortes</option>
              <option value="6">Choluteca</option>
              <option value="7">El Paraíso</option>
              <option value="8">Francisco Morazán</option>
              <option value="9">Gracias a Dios</option>
              <option value="10">Intibucá</option>
              <option value="11">Islas de la Bahía</option>
              <option value="12">La Paz</option>
              <option value="13">Lempira</option>
              <option value="14">Ocotepeque</option>
              <option value="15">Olancho</option>
              <option value="16">Santa Bárbara</option>
              <option value="17">Valle</option>
              <option value="18">Yoro</option>
            </Form.Select>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                style={{ justifyContent: "space-between", color: "#3D403A" }}
                type="checkbox"
                label="Echa un vistazo a los terminos y condiciones"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{
                background: "#A67356",
                border: "#F2E8DF",
                boxShadow: "5px 5px 1px 1px rgba(32,32,32,0.3)",
              }}
            >
              Enviar
            </Button>
          </Form>
        </Container>
      </header>
    </>
  );
};
