import { useEffect, useState } from "react";
import { UserMongoContext } from "./UserMongoContext";
import axios from 'axios'
import {
	useQuery,

} from "@tanstack/react-query";
export const UserMongoProvider = ({ children }) => {
	const correoUsuarioActual= localStorage.getItem("correo")
	const [UserMongo, setUserMongo] = useState(null);

	useEffect(() => {
        const obtenerUsuarioActual=async(correoUsuarioActual)=>{
            
            const res = await axios.get(`http://localhost:4000/user_mongo/${correoUsuarioActual}`);
            setUserMongo(res.data)
            return res.data;
          }
          obtenerUsuarioActual(correoUsuarioActual)
	}, []);

	
	
	return (
		<UserMongoContext.Provider value={{ UserMongo, setUserMongo }}>
			{children}
		</UserMongoContext.Provider>
	);
};