import axios from "axios";

export const createUser = async (userData) => {
    await axios.post("http://localhost:4000/user", userData);
}

export const iniciarSesion =async (loginData) =>{
    await axios.post('http://localhost:4000/login',loginData) 
}
export const enviarProductos = async (infoProducto) =>{
    await axios.post('http://localhost:4000/product',infoProducto)
}

// export const recibirProductos = async (infoProducto) =>{
//     await axios.post('http://localhost:4000/product',infoProducto)
// }