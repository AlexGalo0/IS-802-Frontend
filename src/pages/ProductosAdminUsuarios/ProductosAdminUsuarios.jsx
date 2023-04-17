import { useQuery } from '@tanstack/react-query'
import React from 'react'


export const ProductosAdminUsuarios = () => {
    const {data:productosUsuario} = useQuery({
        queryKey:["productosUsuario"],
        // queryFn:obtenerProductosUsuario()
    })
  return (
    <>
        <h1>Productos de : </h1>
    </>
  )
}
