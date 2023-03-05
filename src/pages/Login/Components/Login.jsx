import { useForm } from "react-hook-form";
import { login } from "../../../api";
import "../../Registro/styles/styleRegistroProductos.css";
import logo from "../../Registro/styles/logoV2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row, Image } from "react-bootstrap";
import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const enviarDatosLogin = async (userData) => {
    console.log(userData);
    try {
      const response = await login(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="App-header">
        <Container className="ContainerProduct">
          <form
            onSubmit={handleSubmit(enviarDatosLogin)}
            fluid="true"
            className="Form-Product"
          >
            <Row>
              <Col
                md
                style={{
                  display: "flex",
                  height: "50px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "40px",
                  paddingBottom: "10px",
                }}
              >
                <button
                  className="Button-backProduct"
                  type="submit"
                  style={{
                    marginTop: "-45px",
                    paddingTop: "1px",
                    marginLeft: "10px",
                  }}
                >
                  <BiLeftArrow />
                </button>
                <Image
                  src={logo}
                  style={{
                    width: "110px",
                    paddingRight: "10px",
                    paddingTop: "20px",
                  }}
                />
              </Col>
            </Row>
            <h1
              style={{
                color: "#0d0d0d",
                textAlign: "left",
                marginLeft: "10px",
              }}
            >
              Inicia sesion
            </h1>

            <Form.Group
              style={{ position: "relative" }}
              controlId="formBasicNombre"
            >
              <input
                type="text"
                name="text"
                className="inNombre"
                {...register("correo", {
                  pattern: /^[a-zA-Z\sáéíóúñÁÉÍÓÚÑ]+$/g,
                  required: true,
                  max: 100,
                })}
              />
              <Form.Label htmlFor="" className="user-label">
                <MdOutlineAlternateEmail />
                Correo
              </Form.Label>
            </Form.Group>

            <Form.Group
              style={{ position: "relative" }}
              controlId="formBasicNombre"
            >
              <input
                type="password"
                name="password"
                className="inNombre"
                {...register("password")}
              />
              <Form.Label htmlFor="" className="user-label">
                <RiLockPasswordLine />
                Contraseña
              </Form.Label>
            </Form.Group>

            <div>
              <button className="Button-Login" type="submit">
                Iniciar Sesion
              </button>
            </div>
          </form>
        </Container>
      </header>
    </>
  );
};
