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

export const obtenerProductos = async (pageParam,options={}) => {
    const res = await axios.get(`http://localhost:4000/product/pagination/${pageParam}`,options)
    return res.data
}
// export const obtenerProductoPorCategoria = async (nombreCategoria ) => {
//     await axios.get(`http://localhost:4000/product/1/find-categories/${nombreCategoria}`)
// }

export const obtenerProductoPorId = async (idProducto)=>{
    console.log(idProducto);
    // const res = await axios.get(`http://localhost:4000/product/${idProducto}`)
    // return res.data
}

/* ******** POST ********** */
export const crearUsuario = async (userData) => {
    await axios.post("http://localhost:4000/user", userData);
}

export const crearProducto = async (infoProducto) => {
    console.log('Esta es la info que recibo');
    await axios.post('http://localhost:4000/product', infoProducto)
}

export const enviarFiltros = async (datosFiltrado, pageParam) => {
 
    console.log(datosFiltrado);
    // const res = await axios.post(`http://localhost:4000/product/${pageParam}/filters`, datosFiltrado)
    // return res.data;
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
    await axios.post('http://localhost:4000/categories',categoria)
}

export const borrarCategorias = async (categoriaABorrar) => {
    console.log(categoriaABorrar);
    await axios.delete(`http://localhost:4000/categories/${categoriaABorrar}`)
    // console.log(`Borraste la categoria ${idCategoria}`);
}

export const editarCategoria = async (nuevaCategoria) => {
    const nombreCategoriaAnterior = nuevaCategoria.categoriaAEditar.nombre 
    console.log(nombreCategoriaAnterior);
    delete nuevaCategoria.categoriaAEditar
    await axios.put(`http://localhost:4000/categories/${nombreCategoriaAnterior}`,nuevaCategoria)
}



