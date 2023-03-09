import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
	const [userAuth, setUserAuth] = useState(false);

	useEffect(()=>{
		const guardarLogin = sessionStorage.getItem("userAuth")
		// setUserAuth(guardarLogin)
	})

	useEffect(()=>{
		sessionStorage.setItem("userAuth",userAuth)
	},[userAuth])
	return (
		<UserContext.Provider value={{ userAuth, setUserAuth }}>
			{children}
		</UserContext.Provider>
	);
};
