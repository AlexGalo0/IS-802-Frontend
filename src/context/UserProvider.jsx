import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
	const [userAuth, setUserAuth] = useState(null);
	return (
		<UserContext.Provider value={{ userAuth, setUserAuth }}>
			{children}
		</UserContext.Provider>
	);
};
