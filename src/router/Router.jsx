import { UserContext, AdminContext } from "../context";
import {
	DashboardAdministrador,
	LoginAdministrador,
	RegistroProducto,
	RegistroUsuario,
	UserLogin,
	PaginaPrincipal,
	Construyendo,
	EdicionCategorias,
	Producto,
} from "../pages";
import { PaginaFavoritos } from "../pages/Favoritos/Components/PaginFavoritos";
import { PaginaMisProductos } from "../pages/Mis Productos/Components/MisProductos";
import { LandingPage } from "../pages/Landing/Components/LandingPage";

import { useContext } from "react";
import { RutaProtegida, NavbarsLR } from "../Components";
import { Route, Routes } from "react-router-dom";
export const Router = () => {
	const { userAuth } = useContext(UserContext);
	const { adminAuth } = useContext(AdminContext);
	return (
		<>
			{/* <NavbarsLR /> */}
			<Routes>
				<Route index element={<PaginaPrincipal />} />
				<Route path='/login' element={<UserLogin />} />
				<Route path='/login-admin' element={<LoginAdministrador />} />
				{/* <RutaProtegida isAllowed={userAuth}>  	</RutaProtegida>*/}
				<Route path='/crudCategorias' element={<EdicionCategorias />} />
				<Route
					path='/registrarProducto'
					element={
						<RutaProtegida isAllowed={userAuth}>
							<RegistroProducto />
						</RutaProtegida>
					}
				/>
				<Route path='/construyendo' element={<Construyendo />} />
				<Route path='/landing' element={<LandingPage />} />
				<Route path='/principal' element={<PaginaPrincipal />} />
				<Route path='/favoritos' element={<PaginaFavoritos />} />
				<Route path='/misProductos' element={<PaginaMisProductos />} />

				<Route path='/registrarUsuario' element={<RegistroUsuario />} />

				<Route path='/dashboard-admin' element={<DashboardAdministrador />} />
				<Route path='/producto/:idProducto' element={<Producto />} />
			</Routes>
		</>
	);
};
