import axios from "axios";
// const config = {
//     headers: {
//         "Content-Type": "application/json"
//     },
//     withCredentials: true
// }
/* ******** GET ********** */
export const obtenerDepartamentos = async () => {
    const res = await axios.get(`http://localhost:4000/departamentos`)
    return res.data;
}

export const obtenerCategorias = async () => {
    const res = await axios.get('http://localhost:4000/categories')
    return res.data
}

export const obtenerProductos = async (pageParam, options = {}) => {
    console.log('I get executed');
    const res = await axios.get(`http://localhost:4000/product/pagination/${pageParam}`, options)
    return res.data
}
export const enviarFiltros = async (datosFiltrado, pageParam) => {

    const res = await axios.post(`http://localhost:4000/product/${pageParam}/filters`, datosFiltrado)
    return res.data
}


export const obtenerProductoPorId = async (idProducto) => {
    const res = await axios.get(`http://localhost:4000/product/${idProducto}`)
    return res.data
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

    const res = await axios.post('http://localhost:4000/login/cliente', loginData)
    const token = res.data.token
    localStorage.setItem("token", token)
    return res;

}

export const iniciarSesionAdmin = async (loginData) => {
    const res = await axios.post('http://localhost:4000/login/admin', loginData)
    const tokenAdministrador = res.data.token
    localStorage.setItem("token-admin",tokenAdministrador)
}

export const crearCategoria = async (categoria) => {
    await axios.post('http://localhost:4000/categories', categoria)
}

export const borrarCategorias = async (categoriaABorrar) => {
    await axios.delete(`http://localhost:4000/categories/${categoriaABorrar}`)
    // console.log(`Borraste la categoria ${idCategoria}`);
}

export const editarCategoria = async (nuevaCategoria) => {
    const nombreCategoriaAnterior = nuevaCategoria.categoriaAEditar.nombre
    delete nuevaCategoria.categoriaAEditar
    await axios.put(`http://localhost:4000/categories/${nombreCategoriaAnterior}`, nuevaCategoria)
}


export const agregarProductoWishlist = async (token, idProducto) => {

    const res = await axios.post(`http://localhost:4000/wishlist/${token}/${idProducto}`)
    return res.data
}

export const obtenerListaDeseosUsuario = async (pageParam, tokenUser) => {

    const res = await axios.get(`http://localhost:4000/wishlist/${pageParam}/${tokenUser}/`)
    return res.data
}

export const borrarProductoListaDeseos = async (idProducto, tokenUser) => {

    const res = await axios.delete(`http://localhost:4000/wishlist/${tokenUser}/${idProducto}`)
    return res.data
}
export const suscripcionACategoria = async (categorias,tokenUser)=>{
    const res = await axios.post(`http://localhost:4000/categorySubscription/${tokenUser}`,categorias)
    return res.data ; 
}
export const verCategorias=async (token)=>{
    console.log(token);
    const res = await axios.get(`http://localhost:4000/categorySubscription/${token}`)
    console.log(res.data);
    return res.data
}