import { UserContext, AdminContext } from "../context";
import {
	DashboardAdministrador,
	LoginAdministrador,
	RegistroProducto,
	RegistroUsuario,
	UserLogin,
	PaginaPrincipal,
	Construyendo,
} from "../pages";
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

				<Route
					path='/registrarProducto'
					element={
						<RutaProtegida isAllowed={userAuth}>
							<RegistroProducto />
						</RutaProtegida>
					}
				/>
				<Route path='/construyendo' element={<Construyendo />} />

				<Route
					path='/registrarUsuario'
					element={
						
							<RegistroUsuario />
					
					}
				/>

				<Route path='/dashboard-admin' element={<DashboardAdministrador />} />
			</Routes>
		</>
	);
};
