import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RegistroProducto } from "../pages/Productos";
import { Construyendo, Registro } from "../pages/Registro/Components";
import { Login } from "../pages/Login/Components";
// import { PaginaPrincipal } from "../pages/Principal";
// import { CartaProducto } from "../pages/Principal/Components/CartaProducto";
import { MostrarProducto } from "../pages/Principal/Components/MostrarProducto";
import { InicialPrueba } from "../pages/InicialPrueba/InicialPrueba";
import { RutaProtegida } from "../Components/RutaProtegida";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
export const Router = () => {
  const {userAuth}  = useContext(UserContext)
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<InicialPrueba />} />

				<Route path='/productos' element={<MostrarProducto />} />
				<Route path='/login' element={<Login />} />

        
				{/* 
          Unica Protegida , deberia decirle que no esta logeado , y redirijirlo a Crear Una Cuenta, de ahi deberia mandarlo a Registrar Producto , de Registrar Producto deberia volver? a la principal para que pueda acceder a verProductos o directamente enviarlo
        */}
				<Route path='/registrarProducto' element={<RutaProtegida isAllowed={userAuth}> <RegistroProducto/> </RutaProtegida>} />
				<Route path='/registrarUsuario' element={<RutaProtegida isAllowed={!userAuth}> <Registro/> </RutaProtegida>} />
				


			</Routes>
		</BrowserRouter>
	);
};
