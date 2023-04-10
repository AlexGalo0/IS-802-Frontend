import { useEffect, useState } from "react";
import { AdminContext } from "./AdminContext";

export const AdminProvider = ({ children }) => {
	const [adminAuth, setAdminAuth] = useState(null);
	useEffect(() => {
		const guardarLogin = sessionStorage.getItem("adminAuth");
		if (guardarLogin === null) {
			setAdminAuth(null);
		} else {
			setAdminAuth(guardarLogin ==="true" ? true:false);
		}
	}, []);

	useEffect(() => {
		if (adminAuth === null) {
			sessionStorage.removeItem("adminAuth");
		} else {
			sessionStorage.setItem("adminAuth", adminAuth);
		}
	}, [adminAuth]);

	
	
	return (
		<AdminContext.Provider value={{ adminAuth, setAdminAuth }}>
			{children}
		</AdminContext.Provider>
	);
};
