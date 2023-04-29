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
	AdminEstadisticas
} from "../pages";
import { PaginaFavoritos } from "../pages/Favoritos/Components/PaginaFavoritos";
import { MisProductos } from "../pages/Mis Productos/Components/MisProductos";
import { FormCategorias } from "../pages/Categorias/Components/formCategorias";
import { AdminUsuarios } from "../pages/AdminUsuarios/Components/AdminUsuarios";

import { useContext } from "react";
import { RutaProtegida } from "../Components";
import { Route, Routes } from "react-router-dom";
import { ProductosAdminUsuarios } from "../pages/ProductosAdminUsuarios";
import { ModalChatGeneral } from "../Components/ModalChatGeneral";
import { AdminDenuncias } from "../pages/AdminDenuncias";
import { Messenger } from "../pages/Chat/Messenger/Messenger";


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
				<Route
					path='admin/usuarios'
					element={
						<RutaProtegida isAllowed={adminAuth}>
							<AdminUsuarios />
						</RutaProtegida>
					}
				/>
				<Route
					path='/dashboard-admin'
					element={
						<RutaProtegida isAllowed={adminAuth}>
							<DashboardAdministrador />
						</RutaProtegida>
					}
				/>
				<Route
					path='admin/usuarios/productos-usuarios/:usuariodni'
					element={
						<RutaProtegida isAllowed={adminAuth}>
							<ProductosAdminUsuarios />
						</RutaProtegida>
					}
				/>
				<Route
					path='/admin/denuncias'
					element={
						<RutaProtegida isAllowed={adminAuth}>
							<AdminDenuncias/>
						</RutaProtegida>
					}
				/>
				<Route
					path='/admin/estadisticas'
					element={
						<RutaProtegida isAllowed={adminAuth}>
							<AdminEstadisticas/>
						</RutaProtegida>
					}
				/>

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
				<Route
					path='/chatGeneral'
					element={
						<RutaProtegida isAllowed={userAuth}>
							{/* <ModalChatGeneral /> */}
							<Messenger/>
						</RutaProtegida>
					}
				/>
				{/* Rutas para cualquier usuario */}
				<Route path='/sus-cat' element={<FormCategorias />} />

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
