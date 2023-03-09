import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
export const RutaProtegida = ({ children, isAllowed, redirectTo = "/" }) => {
	if (isAllowed === false || isAllowed === "false") {
		return <Navigate to={redirectTo} />;
	}
	if (isAllowed === true || isAllowed === "true")
		return children ? children : <Outlet />;
};
