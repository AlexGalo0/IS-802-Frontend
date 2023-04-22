import { useEffect, useState } from "react";
import { obtenerCategorias  } from "../../../api";
export const SidebarFiltros = () => {

    const [filtros,setFiltros]=useState([])

    useEffect(()=>{
        setFiltros(obtenerCategorias)
    },[])

    const obtenerFiltros = async () => {
        const categorias = await obtenerCategorias()
        return categorias
    }

  return (
    <>
    {/* Categorias */}
    </>
  )
}
