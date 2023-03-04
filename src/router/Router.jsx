import { BrowserRouter, Routes,Route,Link } from "react-router-dom";
import { Login } from "../pages/Login/Components";
import {Construyendo,Registro} from "../pages/Registro/Components";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route index  element={<Registro/>}/>
        <Route path="/construyendo" element={<Construyendo/>}/>
        <Route path="/admin" element={<Construyendo/>}/> 
        <Route path="/productos" element={<Construyendo/>}/>
        <Route path="/login" element={<Login/>}/>

       
      </Routes>
    </BrowserRouter>
  )
}

