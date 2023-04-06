import { useForm } from "react-hook-form";
import "../Style/product.css";
import logo from "../../../assets/logoV2.png";
import { BiLeftArrow, BiCategoryAlt } from "react-icons/bi";
import { MdOutlineInsertComment, MdOutlineDescription } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";
import {
  Col,
  Container,
  Form,
  Row,
  Image,
  Carousel,
  Table,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import segunda from "../../../assets/4.png";
import primera from "../../../assets/3.png";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";

import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { UserContext } from "../../../context";
import { Footers } from "../../../Components/Footer";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import Boton from "../Components/botonLike";
import { FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Producto = ({}) => {
  const { userAuth } = useContext(UserContext);
  let { idProducto } = useParams();
  const navigate = useNavigate(); //Para redireccion
  // const [arregloImagenes, setArregloImagenes] = useState([]);
  const handleRedirection = () => {
    navigate("/");
  };
  const obtenerProductoPorId = async (idProducto) => {
    const res = await axios.get(`http://localhost:4000/product/${idProducto}`);

    return res.data[0];
  };
  const { data: infoProductos } = useQuery({
    queryKey: ["producto"],
    queryFn: () => obtenerProductoPorId(idProducto),
  });

  /* Elementos de los overlays (AL poner cursor sobre el simbolo de corazon dice que inicimos sesion) */
  const renderTooltipButtomShare = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Compartir
    </Tooltip>
  );

  const generarEnlace = () => {
    navigator.clipboard.writeText(
      "http://127.0.0.1:5173/producto/" + idProducto
    );
    console.log(infoProductos);
  };

  const [texto, setTexto] = useState("");

  function handleClick() {
    setTexto("¡Enlace de producto copiado!");
  }

  return (
    <>
      <Container fluid className="container-grid">
        {userAuth ? <NavbarsLogueado /> : <NavbarsLR />}
        <header className="headerProduct" style={{ paddingTop: "122px" }}>
          <button
            className="Button-back"
            type="submit"
            onClick={handleRedirection}
          >
            <BiLeftArrow />
          </button>

          

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              {infoProductos?.imagenes && (
                <div>
                  <Carousel variant="dark" className="carruselStyle">
                    {JSON.parse(infoProductos.imagenes)?.map((imagen) => (
                      <Carousel.Item>
                        <Container className="conCarrusel">
                          <Image src={imagen} className="imageCarrusel" />
                        </Container>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              )}
            </div>

            <div className="spects">
              <div className="spectsMedium">
                <h1>{infoProductos?.nombre}</h1>
                <h4>{infoProductos?.descripcion}</h4>
                <h4>Departamento: {infoProductos?.departamento}</h4>
                <h4>Categoria: {infoProductos?.categoria}</h4>
                <h4>Cantidad en inventario: {infoProductos?.cantidad}</h4>

				<h4 style={{marginBottom: '-10px'}}>Calificacion del vendedor:</h4>
                <div className="conCalificacion">
                  <div className="starWitget">
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate5"
                      value="5"
                    />
                    <label className="laStar" for="rate5">
                      <AiFillStar />
                    </label>
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate4"
                      value="4"
                    />
                    <label className="laStar" for="rate4">
                      <AiFillStar />
                    </label>
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate3"
                      value="3"
                    />
                    <label className="laStar" for="rate3">
                      <AiFillStar />
                    </label>
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate2"
                      value="2"
                    />
                    <label className="laStar" for="rate2">
                      <AiFillStar />
                    </label>
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate1"
                      value="1"
                    />
                    <label className="laStar" for="rate1">
                      <AiFillStar />
                    </label>
                  </div>
				  </div>

                <h1>
                  <BsCurrencyDollar style={{ marginTop: "-8px" }} />
                  {infoProductos?.precio}
                </h1>
              </div>

              <div className="spectsMedium2">
                <h3>Califica el producto:</h3>
                <div className="conCalificacion">
                  <div className="starWitget">
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate5"
                      value="5"
                    />
                    <label className="laStar" for="rate5">
                      <AiFillStar />
                    </label>
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate4"
                      value="4"
                    />
                    <label className="laStar" for="rate4">
                      <AiFillStar />
                    </label>
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate3"
                      value="3"
                    />
                    <label className="laStar" for="rate3">
                      <AiFillStar />
                    </label>
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate2"
                      value="2"
                    />
                    <label className="laStar" for="rate2">
                      <AiFillStar />
                    </label>
                    <input
                      className="inStar"
                      type="checkbox"
                      name="rate"
                      id="rate1"
                      value="1"
                    />
                    <label className="laStar" for="rate1">
                      <AiFillStar />
                    </label>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <Boton />
                  {/* Boton de compartir */}
                  <div className="like">
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipButtomShare}
                    >
                      <button
                        onClick={() => {
                          generarEnlace(), handleClick();
                        }}
                      >
                        <FaShare className="heart" />
                      </button>
                    </OverlayTrigger>
                  </div>
                </div>
            <div>{texto}</div>

                <Link to="/construyendo" style={{ textDecoration: "none" }}>
                  <button
                    className="buttonChat"
                    style={{ color: "#f7f7f7", fontSize: "medium" }}
                  >
                    <span className="box">Chatea sobre este articulo</span>
                  </button>
                </Link>
                <Link to="/construyendo" style={{ textDecoration: "none" }}>
                  <button
                    className="buttonChat"
                    style={{ color: "#f7f7f7", fontSize: "medium" }}
                  >
                    <span className="box">Escribe al vendedor</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="comments">
            <h1>Comentarios</h1>

            <h4>Aniadir un comentario:</h4>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Control className="comment" type="text" />
              <button className="btnComent">
                <MdOutlineInsertComment className="iconBuscar" />
                <span className="textComent">Comentar</span>
              </button>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </header>

        <Footers />
      </Container>
    </>
  );
};
