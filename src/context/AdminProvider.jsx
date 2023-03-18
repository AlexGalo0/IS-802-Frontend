import { useEffect, useState } from "react";
import { AdminContext } from "./AdminContext";

export const AdminProvider = ({ children }) => {
	const [adminAuth, setAdminAuth] = useState(false);
	useEffect(() => {
		const guardarLogin = sessionStorage.getItem("adminAuth");
		if (guardarLogin === null) {
			setAdminAuth(false);
		} else {
			setAdminAuth(guardarLogin);
		}
	}, []);

	useEffect(() => {
		sessionStorage.setItem("adminAuth", adminAuth);
	}, [adminAuth]);
	return (
		<AdminContext.Provider value={{ adminAuth, setAdminAuth }}>
			{children}
		</AdminContext.Provider>
	);
};
