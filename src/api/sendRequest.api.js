import axios from "axios";

/* ******** GET ********** */
export const obtenerDepartamentos = async () => {
    const res = await axios.get(`http://localhost:4000/departamentos`)
    return res.data;
}

export const obtenerCategorias = async () => {
    const res = await axios.get('http://localhost:4000/categories')
    return res.data
}

export const obtenerProductos = async () => {
   const res =  await axios.get('http://localhost:4000/product')
   return res.data
}
export const obtenerProductoPorCategoria = async (nombreCategoria) => {
    await axios.get(`http://localhost:4000/product/1/find-categories/${nombreCategoria}`)
}

/* ******** POST ********** */
export const crearUsuario = async (userData) => {
    await axios.post("http://localhost:4000/user", userData);
}

export const crearProducto = async (infoProducto) => {
    await axios.post('http://localhost:4000/product', infoProducto)
}

/* **POST: Inicio Sesiones** */
export const iniciarSesion = async (loginData) => {
    await axios.post('http://localhost:4000/login/cliente', loginData)
}

export const iniciarSesionAdmin = async (loginData) => {
    await axios.post('http://localhost:4000/login/admin', loginData)
}


export const crearCategoria = async (categoria)=>{
    console.log("Categoria desde api creada")
}

export const borrarCategorias = async (idCategoria)=>{
    await axios.delete(`http://localhost:4000/categories/${idCategoria}`)
    console.log(`Borraste la categoria ${idCategoria}`);
}

export const editarCategoria = async (categoria)=>{
    console.log(`Se edito la categoria ${categoria.nombre} desde la API`);
}




