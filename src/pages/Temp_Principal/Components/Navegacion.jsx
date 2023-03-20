import React, { useState , useEffect } from 'react'

export const Navegacion = ({handlePaginacion}) => {
    const [numeroPagina, setNumeroPagina] = useState(1)

    const handleSiguientePagina=()=>{
        setNumeroPagina((numero)=>numero+1)
    }
    const handlePaginaAnterior=()=>{
        setNumeroPagina((numero) => Math.max(1, numero - 1));
    }

    useEffect(() => {
    
        handlePaginacion(numeroPagina)
      
    }, [numeroPagina])
    
  return (
    <>
    <button onClick={handlePaginaAnterior}>Ver anterior</button>
    <button onClick={handleSiguientePagina}>Ver siguiente</button>

    </>
  )
}
