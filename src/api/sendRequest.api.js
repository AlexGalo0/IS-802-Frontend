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
    const categoriasSuscritas = await axios.get(`http://localhost:4000/categorySubscription/${res.data.token}`);
    const idsListaDeDeseos = await axios.get(`http://localhost:4000/wishlist-productid/${res.data.token}`);



    const token = res.data.token
    const nombre = res.data.nombre
    const correo = res.data.correo
    const apellido = res.data.apellido
    if (categoriasSuscritas.data.categorias === undefined) {
        localStorage.setItem("categoriasSuscritas", "[]")
    } else {

        localStorage.setItem("categoriasSuscritas", categoriasSuscritas.data.categorias)
    }

    localStorage.setItem("idsListaDeDeseos", JSON.stringify(idsListaDeDeseos.data))
    localStorage.setItem("token", token)
    localStorage.setItem("nombre", nombre)
    localStorage.setItem("apellido", apellido)
    localStorage.setItem("correo", correo)
    return res;
}

export const iniciarSesionAdmin = async (loginData) => {
    const res = await axios.post('http://localhost:4000/login/admin', loginData)
    const tokenAdministrador = res.data.token
    localStorage.setItem("token-admin", tokenAdministrador)
}

export const crearCategoria = async (categoria) => {
    await axios.post('http://localhost:4000/categories', categoria)
}

export const borrarCategorias = async (categoriaABorrar) => {
    await axios.delete(`http://localhost:4000/categories/${categoriaABorrar}`)
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
export const suscripcionACategoria = async (categorias, tokenUser) => {

    const res = await axios.post(`http://localhost:4000/categorySubscription/${tokenUser}`, categorias)
    return res.data;
}
export const verCategorias = async (token) => {
    const res = await axios.get(`http://localhost:4000/categorySubscription/${token}`)
    return res.data
}

export const obtenerProductosUsuario = async (numeroPagina, token) => {

    const res = await axios.get(`http://localhost:4000/productos/${numeroPagina}/${token}`)
    return res.data
}

export const crearComentario = async (tokenUser, idProduct, comentario) => {

    await axios.post(`http://localhost:4000/comentarios/${tokenUser}/${idProduct}`, comentario)

}

export const obtenerComentarios = async (idProducto) => {
    const res = await axios.get(`http://localhost:4000/comentarios/${idProducto}`)
    return res.data
}

// export const borrarComentarios = async = (id)

export const obtenerUsuariosChat = async () => {
    const res = await axios.get("http://localhost:4000/user")
    return res.data

}

export const obtenerTodosUsuarios = async () => {
    const res = await axios.get("http://localhost:4000/user")
    return res.data
}

export const enviarPDFs = async () => {
    const res = await axios.get('http://localhost:4000/envio-publicidad-pdf')
    console.log(res.data);
    return res.data;
}
export const obtenerProductosUsuarioDNI = async (dniUsuario) => {
    const res = await axios.get(`http://localhost:4000/productos/productosAdmin/1/${dniUsuario}`)
    return res.data
}
export const darBajaUsuario = async (dni) => {
    console.log('Dni recibido : ', dni);
    const res = await axios.delete(`http://localhost:4000/darbajaUsuario/${dni}`)
    return res.data;
}

export const darBajaProductosAdmin = async (dni, tokenProduct) => {
    
    const res = await axios.get(`http://localhost:4000/productoBorrar/${dni}/${tokenProduct}`)

    return res.data;
}
export const darBajaMiProducto = async (tokenUsuario, tokenProduct) => {

    const res = await axios.delete(`http://localhost:4000/productos/${tokenUsuario}/${tokenProduct}`)
    return res.data;
}