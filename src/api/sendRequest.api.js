import axios from "axios";

export const createUser = async (userData) => {
    await axios.post("http://localhost:4000/user", userData);
}

export const iniciarSesion =async (loginData) =>{
    await axios.post('http://localhost:4000/login/cliente',loginData) 
}
export const enviarProductos = async (infoProducto) =>{
    await axios.post('http://localhost:4000/product',infoProducto)
}
export const obtenerProductos = async () =>{
    await axios.get('http://localhost:4000/product')
}
export const iniciarSesionAdmin =async (loginData) =>{
    await axios.post('http://localhost:4000/login/admin',loginData) 
}

export const obtenerProductoPorCategoria =async (nombreCategoria) =>{
    await axios.get(`http://localhost:4000/product/1/find-categories/${nombreCategoria}`) 
}

export const obtenerDepartamentos =async () =>{
    await axios.get(`http://localhost:4000/departamentos`) 
}

export const obtenerCategorias =async () =>{
    await axios.get('http://localhost:4000/categories') 
}

