import axios from "axios";
const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
}
/* ******** GET ********** */
export const obtenerDepartamentos = async () => {
    const res = await axios.get(`http://localhost:4000/departamentos`)
    return res.data;
}

export const obtenerCategorias = async () => {
    const res = await axios.get('http://localhost:4000/categories')
    return res.data
}

export const obtenerProductos = async (numeroPagina) => {
    const res = await axios.get(`http://localhost:4000/product/pagination/${numeroPagina}`)
    return res.data
}
// export const obtenerProductoPorCategoria = async (nombreCategoria ) => {
//     await axios.get(`http://localhost:4000/product/1/find-categories/${nombreCategoria}`)
// }

/* ******** POST ********** */
export const crearUsuario = async (userData) => {
    await axios.post("http://localhost:4000/user", userData);
}

export const crearProducto = async (infoProducto) => {
    console.log('Esta es la info que recibo');
    await axios.post('http://localhost:4000/product', infoProducto)
}

export const enviarFiltros = async (datosFiltrado, numeroPagina) => {
    console.log(datosFiltrado);
    console.log(numeroPagina);

    const res = await axios.post(`http://localhost:4000/product/${numeroPagina}/filters`, datosFiltrado)
    return res.data;
}

/* **POST: Inicio Sesiones** */
export const iniciarSesion = async (loginData) => {

    const res = await axios.post('http://localhost:4000/login/cliente', loginData)
    const token = res.data.token
    localStorage.setItem("token", token)
    return res;

}

export const iniciarSesionAdmin = async (loginData) => {
    await axios.post('http://localhost:4000/login/admin', loginData)
}


export const crearCategoria = async (categoria) => {
    console.log("Categoria desde api creada")
}

export const borrarCategorias = async (idCategoria) => {
    await axios.delete(`http://localhost:4000/categories/${idCategoria}`)
    console.log(`Borraste la categoria ${idCategoria}`);
}

export const editarCategoria = async (categoria) => {
    console.log(`Se edito la categoria ${categoria.nombre} desde la API`);
}



