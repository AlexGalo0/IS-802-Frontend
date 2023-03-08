import { BrowserRouter, Routes,Route,Link } from "react-router-dom";
import { RegistroProducto } from "../pages/Productos";
import {Construyendo,Registro} from "../pages/Registro/Components";
import { Login } from "../pages/Login/Components";
import { PaginaPrincipal } from "../pages/Principal";
import { CartaProducto } from "../pages/Principal/Components/CartaProducto";
import { PrototipoMap } from "../pages/Principal/Components/PrototipoMap";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index  element={<Registro/>}/>
        <Route path="/construyendo" element={<Construyendo/>}/>
        <Route path="/admin" element={<Construyendo/>}/> 
        <Route path="/productos" element={<Construyendo/>}/>
        <Route path="/registrarProducto" element={<RegistroProducto/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/principal" element={<PaginaPrincipal/>}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/card" element={<CartaProducto/>}/>
        <Route path="/pruebaDeDatos" element={<PrototipoMap/>}/>


      </Routes>
    </BrowserRouter>
  )
}
