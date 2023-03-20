import { useState, useEffect } from "react";

export const FiltroFecha = (props) => {
    function handleClick(event) {
        const nuevaPeticion = event.target.name;
        const nuevaCantidadDeDias = {
          semana: false,
          mes: false,
          tres_meses: false,
          seis_meses: false,
          anio: false,
          [nuevaPeticion]: true,
        };
        props.actualizarCantidadDeDias(nuevaCantidadDeDias);
       
      }

      return (
        <div>
          <button name="semana" onClick={handleClick}>
            Hace 7 días
          </button>
          <button name="mes" onClick={handleClick}>
            Hace 30 días
          </button>
          <button name="tres_meses" onClick={handleClick}>
            Hace 3 meses
          </button>
          <button name="seis_meses" onClick={handleClick}>
            Últimos 6 meses
          </button>
          <button name="anio" onClick={handleClick}>
            Último año
          </button>
        </div>
      );
};