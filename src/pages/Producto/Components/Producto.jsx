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
  OverlayTrigger,Tooltip,
} from "react-bootstrap";
import segunda from "../../../assets/4.png";
import primera from "../../../assets/3.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import {
  obtenerDepartamentos,
  obtenerCategorias,
  crearProducto,
} from "../../../api";

import { NavbarsLR } from "../../../Components/NavbarLR";
import { NavbarsLogueado } from "../../../Components/NavbarLogueado";
import { UserContext } from "../../../context";
import { Footers } from "../../../Components/Footer";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import Boton from "../Components/botonLike";

export const Producto = () => {
  const { userAuth } = useContext(UserContext);

  const navigate = useNavigate(); //Para redireccion
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(); //Para react-hook-form

  //Para React Query

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: obtenerCategorias,
  });
  const { data: departamentos } = useQuery({
    queryKey: ["departamentos"],
    queryFn: obtenerDepartamentos,
  });
  const mutationRegistrarProducto = useMutation({
    mutationFn: crearProducto,
    onSuccess: () => {}, //Agregar en el body funcion cuando funcione correctamente
    onError: () => {},
  });

  const [urls, setURLS] = useState([]);
  const [imagenesVacias, setImagenesVacias] = useState(false);

  const recibirURL = (url) => {
    setURLS(url);
  };
  const handleRedirection = () => {
    navigate("/");
  };

  /* Funcion onSubmit */
  const enviarProducto = (productInfo) => {
    productInfo.imagenes = urls;
    mutationRegistrarProducto.mutate({
      ...productInfo,
    });
  };

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
              {/* Carusel */}
              <Carousel variant="dark" className="carruselStyle">
                <Carousel.Item>
                  <Container className="conCarrusel">
                    <Image src={primera} className="imageCarrusel" />
                  </Container>
                </Carousel.Item>
                <Carousel.Item>
                  <Container className="conCarrusel">
                    <Image src={primera} className="imageCarrusel" />
                  </Container>
                </Carousel.Item>
                <Carousel.Item>
                  <Container className="conCarrusel">
                    <Image src={segunda} className="imageCarrusel" />
                  </Container>
                </Carousel.Item>
                <Carousel.Item>
                  <Container className="conCarrusel">
                    <Image src={segunda} className="imageCarrusel" />
                  </Container>
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="spects">
              <div className="spectsMedium">
                <h1>Nombre</h1>
                <h4>
                  Descripcion del producto: asjdoasjaslkdj askdja sdjlka jslja
                  lksjdlkas lka fsakjdhfkljas fljshda jdfashklsdf jkdsj akajh
                  kjshkjf sakjh kjhf kjsahkjahdkfj sakdjfh kjahf kjsdhf kjh{" "}
                </h4>
                <h4>Ctegoria</h4>
                <h4>Departamento</h4>
                <h4>Disponibles</h4>
                <h1>
                  <BsCurrencyDollar style={{marginTop: '-8px'}}/>
                  Precio
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

                  <Boton />

                <Link to="/construyendo" style={{ textDecoration: "none" }}>
                  <button
                    className="buttonChat"
                    style={{ color: "#f7f7f7", fontSize: "medium" }}
                  >
                    <span className="box">Chat</span>
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
