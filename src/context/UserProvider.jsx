import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
	const [userAuth, setUserAuth] = useState(null);//false
	useEffect(() => {
		// const guardarLogin = sessionStorage.getItem("userAuth")
		// setUserAuth(guardarLogin)
		const guardarLogin = sessionStorage.getItem("userAuth");
		if (guardarLogin === null) {
			setUserAuth(null);//false
		} else {
			setUserAuth(guardarLogin === "true"	? true : false)
		}
	}, []);

	useEffect(() => {
		if (userAuth === null) {
			sessionStorage.removeItem("userAuth");
		} else {
			sessionStorage.setItem("userAuth", userAuth);
		}
	}, [userAuth]);
	
	return (
		<UserContext.Provider value={{ userAuth, setUserAuth }}>
			{children}
		</UserContext.Provider>
	);
};