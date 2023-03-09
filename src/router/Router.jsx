import { BrowserRouter, Routes,Route,Link } from "react-router-dom";
import { RegistroProducto } from "../pages/Productos";
import {Construyendo,Registro} from "../pages/Registro/Components";
import { Login } from "../pages/Login/Components";
// import { PaginaPrincipal } from "../pages/Principal";
// import { CartaProducto } from "../pages/Principal/Components/CartaProducto";
import { MostrarProducto } from "../pages/Principal/Components/MostrarProducto";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index  element={<Login/>}/>
        <Route path="/registrarProducto" element={<RegistroProducto/>}/>
        <Route path="/registrarUsuario" element={<Registro/>}/>
        {/* <Route path="/principal" element={<PaginaPrincipal/>}/> */}
        {/* <Route path="/card" element={<CartaProducto/>}/> */}
        <Route path="/productos" element={<MostrarProducto/>}/>


      </Routes>
    </BrowserRouter>
  )
}
