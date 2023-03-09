import {Navigate,Outlet} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
export const RutaProtegida = ({children,isAllowed,redirectTo='/'}) => {
    
    if(!isAllowed){
        return <Navigate to={redirectTo}/>
      }
      return children? children: <Outlet/>
}
