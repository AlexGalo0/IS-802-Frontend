import { BrowserRouter, Routes,Route,Link } from "react-router-dom";
import { RegistroProducto } from "../pages/Productos/Components/RegistroProducto";
import { SubidaImagenes } from "../pages/Productos/Components/SubidaImagenes";
import {Construyendo,Registro} from "../pages/Registro/Components";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route index  element={<Registro/>}/>
        <Route path="/construyendo" element={<Construyendo/>}/>
        <Route path="/admin" element={<Construyendo/>}/> 
        <Route path="/productos" element={<Construyendo/>}/>
        <Route path="/subidaImagenes" element={<SubidaImagenes/>}/>

       
      </Routes>
    </BrowserRouter>
  )
}

