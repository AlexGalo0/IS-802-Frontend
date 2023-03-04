import axios from "axios";

export const createUser = async (userData) => {
    await axios.post("http://localhost:4000/user", userData);
}

export const iniciarSesion =async (loginData) =>{
    await axios.post('http://localhost:4000/login',loginData) /* Verificar ruta en Backend */
}