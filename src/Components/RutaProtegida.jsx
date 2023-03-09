import {Navigate,Outlet} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
export const RutaProtegida = ({children,isAllowed,redirectTo='/'}) => {
    const {userAuth}  = useContext(UserContext)
    if(!userAuth){
        return <Navigate to={redirectTo}/>
      }
      return children? children: <Outlet/>
}
