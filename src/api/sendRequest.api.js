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
    const res = await axios.get('http://localhost:4000/product/pagination/1')
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

export const enviarFiltros = async (datosFiltrado) => {
    const res = await axios.post('http://localhost:4000/product/1/filters', datosFiltrado)
    return res.data ;
}

/* **POST: Inicio Sesiones** */
export const iniciarSesion = async (loginData) => {
    await axios.post('http://localhost:4000/login/cliente', loginData)
}

export const iniciarSesionAdmin = async (loginData) => {
    await axios.post('http://localhost:4000/login/admin', loginData)
}







