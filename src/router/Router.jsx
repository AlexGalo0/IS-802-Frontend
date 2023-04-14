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
	ChatGeneral,
} from "../pages";
import { PaginaFavoritos } from "../pages/Favoritos/Components/PaginaFavoritos";
import { MisProductos } from "../pages/Mis Productos/Components/MisProductos";
import { LandingPage } from "../pages/Landing/Components/LandingPage";
import { FormCategorias } from "../pages/Categorias/Components/formCategorias";

import { useContext } from "react";
import { RutaProtegida, NavbarsLR } from "../Components";
import { Route, Routes } from "react-router-dom";
export const Router = () => {
	const { userAuth } = useContext(UserContext);
	const { adminAuth } = useContext(AdminContext);
	return (
		<>
			<Routes>
				{/* RUTAS PROTEGIDAS DEL ADMINISTRADOR */}
				<Route
					path='/admin/crudCategorias'
					element={
						<RutaProtegida isAllowed={adminAuth}>
							<EdicionCategorias />
						</RutaProtegida>
					}
				/>
				{/* <Route
					path='/dashboard-admin'
					element={
						<RutaProtegida isAllowed={adminAuth}>
							<DashboardAdministrador />
						</RutaProtegida>
					}
				/> */}

				{/* RUTAS PROTEGIDAS DE USUARIO */}
				<Route
					path='/misProductos'
					element={
						<RutaProtegida isAllowed={userAuth}>
							<MisProductos />
						</RutaProtegida>
					}
				/>
				<Route
					path='/favoritos'
					element={
						<RutaProtegida isAllowed={userAuth}>
							<PaginaFavoritos />
						</RutaProtegida>
					}
				/>
				<Route
					path='/registrarProducto'
					element={
						<RutaProtegida isAllowed={userAuth}>
							<RegistroProducto />
						</RutaProtegida>
					}
				/>

				<Route
					path='/categorias'
					element={
						<RutaProtegida isAllowed={userAuth}>
							<FormCategorias />
						</RutaProtegida>
					}
				/>
				<Route path='/chatGeneral/:idVendedor' element={<ChatGeneral />} />


				{/* Rutas para cualquier usuario */}

				<Route path='/login' element={<UserLogin />} />

				<Route path='/login-admin' element={<LoginAdministrador />} />
				<Route path='/' element={<PaginaPrincipal />} />

				<Route path='/construyendo' element={<Construyendo />} />

				<Route path='/registrarUsuario' element={<RegistroUsuario />} />

				<Route path='/producto/:idProducto' element={<Producto />} />
				<Route path='*' element={<Construyendo />}></Route>
			</Routes>
		</>
	);
};
