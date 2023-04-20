import "bootstrap/dist/css/bootstrap.min.css";
import {  useNavigate } from "react-router";
import '../styles/style.css'
import whmcs from '../styles/whmcs.svg'

export const Construyendo = () => {
  const navigate= useNavigate()
  const handleRedirection=()=>{
    navigate(-1)
  }
  return (
    <>
    <header className="App-header">
    <h1 style={{ color: "#02050A"}}>Construyendo... </h1>
    <img src={whmcs} className="App-logo" alt="logo" />
    <button
        type="submit"
        className="Button"
        onClick={handleRedirection}
      >
        Regresar
      </button>
    </header>
    </>
  )
}
