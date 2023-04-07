import "../Style/Landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Image } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../../context";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiSearchAlt, BiUser } from "react-icons/bi";

import "animate.css";
import logo from "../../../assets/logo.png";
import { BsFacebook, BsInstagram, BsDiscord } from "react-icons/bs";

export const LandingPage = () => {
  const { userAuth } = useContext(UserContext);

  return (
    <>
      <Container fluid className="container-grid">
        <header className="headerLanding">
          <p
            className="animate__animated animate__zoomInDown word"
            style={{ fontSize: "50px" }}
          >
            Bienvenido a
          </p>
          <Image src={logo} className="logo" />
          <Link to="/principal">
            <button
              className="regis"
              style={{ width: "250px", margin: "25px" }}
            >
              Comenzar
            </button>
          </Link>
          <div>
          <ul className="ulRedes">
          <Link to='https://www.facebook.com/' style={{textDecoration: 'none'}}>
            <li className="liRedes">
              <span className="redes">
                <BsFacebook className="iLanding" />
              </span>
              <span className="tituloLanding">Facebook</span>
            </li>
            </Link>
            <Link to='https://www.instagram.com/' style={{textDecoration: 'none'}}>
            <li className="liRedes">
              <span className="redes">
                <BsInstagram className="iLanding" />
              </span>
              <span className="tituloLanding">instagram</span>
            </li>
            </Link>
            <Link to='https://discord.com/' style={{textDecoration: 'none'}}>
            <li className="liRedes">
              <span className="redes">
                <BsDiscord className="iLanding" />
              </span>
              <span className="tituloLanding">discord</span>
            </li>
            </Link>
          </ul>
        </div>
        </header>
      </Container>
    </>
  );
};
