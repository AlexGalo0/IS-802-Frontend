import { BrowserRouter, Routes,Route,Link } from "react-router-dom";
import { RegistroProducto } from "../pages/Productos/Components/RegistroProducto";
import {Construyendo,Registro} from "../pages/Registro/Components";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route index  element={<Registro/>}/>
        <Route path="/construyendo" element={<Construyendo/>}/>
        <Route path="/admin" element={<Construyendo/>}/> 
        <Route path="/productos" element={<Construyendo/>}/>
        <Route path="/registrarProducto" element={<RegistroProducto/>}/>

       
      </Routes>
    </BrowserRouter>
  )
}

